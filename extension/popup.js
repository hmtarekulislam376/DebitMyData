const urlInput = document.getElementById('urlInput');
const openPanelButton = document.getElementById('openPanel');
const useCurrentButton = document.getElementById('useCurrent');

async function openSidePanel(url) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.storage.local.set({ sideUrl: url });
  await chrome.sidePanel.open({ tabId: tab.id });
}

openPanelButton.addEventListener('click', async () => {
  const url = urlInput.value.trim() || 'https://debitmydata.com/marketplace';
  await openSidePanel(url);
});

useCurrentButton.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url || 'https://debitmydata.com/marketplace';
  await openSidePanel(url);
});
