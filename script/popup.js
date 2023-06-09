console.log("Activator Plugin -> popup.js injected");

function toggleExtension(extensionId) {
  chrome.management.get(extensionId, function (extensionInfo) {
    var isEnabled = extensionInfo.enabled;

    // Disable the extension if it's currently enabled
    if (isEnabled) {
      chrome.management.setEnabled(extensionId, false, function () {
        console.log("Extension " + extensionId + " disabled");

        // Re-enable the extension after a short delay
        setTimeout(function () {
          chrome.management.setEnabled(extensionId, true, function () {
            console.log("Extension " + extensionId + " re-enabled");
            alert("Ticket Relay Extension Activated");
          });
        }, 1000); // Wait for 1 second before re-enabling the extension
      });
    } else {
      // Enable the extension if it's currently disabled
      chrome.management.setEnabled(extensionId, true, function () {
        console.log("Extension " + extensionId + " enabled");
      });
    }
  });
}

// Extension ID
let extensionId = "";
chrome.management.getAll(function (extensions) {
  // Iterate through the list of installed extensions
  for (let i = 0; i < extensions.length; i++) {
    let extension = extensions[i];

    // Check if the extension matches the desired name or any other criteria
    if (extension.name === "Ticket Avail") {
      extensionId = extension.id;
      // Perform any desired actions with the extension ID
      console.log("Extension ID:", extensionId);
      break; // Exit the loop since we found the desired extension
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var toggleButton = document.getElementById("toggle-button");
  toggleButton.addEventListener("click", function () {
    toggleExtension(extensionId);
  });
});
