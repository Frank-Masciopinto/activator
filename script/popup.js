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
            alert("Ticket Relay Extension Activated")
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

extensionId = "njimcjbadcdelhnedjeamnbgpnnkhokc";

document.addEventListener("DOMContentLoaded", function () {
  var toggleButton = document.getElementById("toggle-button");
  toggleButton.addEventListener("click", function () {
    toggleExtension(extensionId);
  });
});
