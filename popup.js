// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  
  // Load saved state
  chrome.storage.local.get(['isEnabled'], (result) => {
      toggleButton.checked = result.isEnabled !== false; // Default to true if not set
  });

  // Save state when changed and reload the page
  toggleButton.addEventListener('change', () => {
      const isEnabled = toggleButton.checked;
      chrome.storage.local.set({ isEnabled }, () => {
          // After saving the state, reload the active tab
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
              if (tabs[0]) {
                  chrome.tabs.reload(tabs[0].id);
              }
          });
      });
  });
});