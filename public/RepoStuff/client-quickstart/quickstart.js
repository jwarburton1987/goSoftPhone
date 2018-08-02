$(document).ready(function(){
  var speakerDevices = $("#speaker-devices");
  var ringtoneDevices = $("#ringtone-devices");
  var outputVolumeBar = $("#output-volume");
  var inputVolumeBar = $("#input-volume");
  var volumeIndicators = $("#volume-indicators");

  console.log("Requesting Capability Token...");
  $.getJSON("https://desert-budgerigar-3588.twil.io/capability-token")
    .done(function (data) {
      console.log("Got a token.");
      console.log("Token: " + data.token);

      // Setup Twilio.Device
      Twilio.Device.setup(data.token);

      Twilio.Device.ready(function (device) {
        console.log("Twilio.Device Ready!");
        document.getElementById("call-controls").style.display = "block";
      });

      Twilio.Device.error(function (error) {
        console.log("Twilio.Device Error: " + error.message);
      });

      Twilio.Device.connect(function (conn) {
        console.log("Successfully established call!");
        // document.getElementById("button-call").style.display = "none";
        // document.getElementById("button-hangup").style.display = "inline";
        volumeIndicators.style.display = "block";
        bindVolumeIndicators(conn);
      });

      Twilio.Device.disconnect(function (conn) {
        console.log("Call ended.");
        // $("#button-call").style.display = "inline";
        // $("#button-hangup").style.display = "none";
        volumeIndicators.style.display = "none";
      });

      Twilio.Device.incoming(function (conn) {
        console.log("Incoming connection from " + conn.parameters.From);
        var archEnemyPhoneNumber = "+12093373517";

        if (conn.parameters.From === archEnemyPhoneNumber) {
          conn.reject();
          console.log("It\'s your nemesis. Rejected call.");
        } else {
          // accept the incoming connection and start two-way audio
          conn.accept();
        }
      });

      setClientNameUI(data.identity);

      Twilio.Device.audio.on("deviceChange", updateAllDevices);

      // Show audio selection UI if it is supported by the browser.
      if (Twilio.Device.audio.isSelectionSupported) {
        document.getElementById("output-selection").style.display = "block";
      }
    })
    .fail(function () {
      console.log("Could not get a token from server!");
    });

  // Bind button to make call
  $("#button-call").click(function () {
    // get the phone number to connect the call to
    var params = {
      To: document.getElementById("phoneNumField").value
    };

    console.log("Calling " + params.To + "...");
    Twilio.Device.connect(params);
  });

  // Bind button to hangup call
  $("#button-hangup").click(function () {
    console.log("Hanging up...");
    Twilio.Device.disconnectAll();
  });

  $("#get-devices").click(function () {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(updateAllDevices);
  });

  speakerDevices.addEventListener("change", function() {
    var selectedDevices = [].slice.call(speakerDevices.children)
      .filter(function(node) { return node.selected; })
      .map(function(node) { return node.getAttribute("data-id"); });
    
    Twilio.Device.audio.speakerDevices.set(selectedDevices);
  });

  ringtoneDevices.addEventListener("change", function() {
    var selectedDevices = [].slice.call(ringtoneDevices.children)
      .filter(function(node) { return node.selected; })
      .map(function(node) { return node.getAttribute("data-id"); });
    
    Twilio.Device.audio.ringtoneDevices.set(selectedDevices);
  });

  function bindVolumeIndicators(connection) {
    connection.volume(function(inputVolume, outputVolume) {
      var inputColor = "red";
      if (inputVolume < 0.50) {
        inputColor = "green";
      } else if (inputVolume < 0.75) {
        inputColor = "yellow";
      }

      inputVolumeBar.style.width = Math.floor(inputVolume * 300) + "px";
      inputVolumeBar.style.background = inputColor;

      var outputColor = "red";
      if (outputVolume < 0.50) {
        outputColor = "green";
      } else if (outputVolume < 0.75) {
        outputColor = "yellow";
      }

      outputVolumeBar.style.width = Math.floor(outputVolume * 300) + "px";
      outputVolumeBar.style.background = outputColor;
    });
  }

  function updateAllDevices() {
    updateDevices(speakerDevices, Twilio.Device.audio.speakerDevices.get());
    updateDevices(ringtoneDevices, Twilio.Device.audio.ringtoneDevices.get());
  }
});

// Update the available ringtone and speaker devices
function updateDevices(selectEl, selectedDevices) {
  selectEl.innerHTML = "";
  Twilio.Device.audio.availableOutputDevices.forEach(function(device, id) {
    var isActive = (selectedDevices.size === 0 && id === "default");
    selectedDevices.forEach(function(device) {
      if (device.deviceId === id) { isActive = true; }
    });

    var option = document.createElement("option");
    option.label = device.label;
    option.setAttribute("data-id", id);
    if (isActive) {
      option.setAttribute("selected", "selected");
    }
    // selectEl.appendChild(option);
  });
}

// Activity log
function log(message) {
  var logDiv = $("#log");
  logDiv.innerHTML += "<p>&gt;&nbsp;" + message + "</p>";
  logDiv.scrollTop = logDiv.scrollHeight;
  console.log(message);
  logDiv.empty();
}

// Set the client name in the UI
function setClientNameUI(clientName) {
  var clientDiv = $("#client-name");
  clientDiv.innerHTML = "Your client name: <strong>" + clientName +
    "</strong>";
    clientDiv.empty();
    console.log(clientName);
}
