const targetClass = "feed-item-base_feedItemBox__5WVY1 agency_scaleUpOnHover__Ho_Hg";
let isEnabled = true;

function toggleElements(show) {
    const elements = document.querySelectorAll("div");
    elements.forEach((element) => {
        if (element.className === targetClass) {
            element.style.display = show ? "none" : ""; // "" restores the default display
        }
    });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    isEnabled = request.isEnabled;
    toggleElements(isEnabled);
});

// Load saved state when content script starts
chrome.storage.local.get(['isEnabled'], (result) => {
    isEnabled = result.isEnabled !== false; // Default to true if not set
    toggleElements(isEnabled);
});

// Observe the page for dynamically added elements
const observer = new MutationObserver(() => {
    if (isEnabled) {
        toggleElements(true);
    }
});
observer.observe(document.body, { childList: true, subtree: true });