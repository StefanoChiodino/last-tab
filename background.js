let lastTabId = null;
let currentTabId = null;

chrome.tabs.onActivated.addListener(({ tabId }) => {
  lastTabId = currentTabId;
  currentTabId = tabId;
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === lastTabId) {
    lastTabId = null;
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "switch-to-last-tab" && lastTabId !== null) {
    chrome.tabs.update(lastTabId, { active: true }, (tab) => {
      if (tab) {
        chrome.windows.update(tab.windowId, { focused: true });
      }
    });
  }
});
