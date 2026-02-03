const frame = document.getElementById('panelFrame');
const panelUrlInput = document.getElementById('panelUrl');
const goButton = document.getElementById('goButton');

const fallbackUrl = 'https://debitmydata.com/marketplace';

async function loadStoredUrl() {
  const { sideUrl } = await chrome.storage.local.get('sideUrl');
  const url = sideUrl || fallbackUrl;
  panelUrlInput.value = url;
  frame.src = url;
}

function normalizeUrl(value) {
  if (!value) return fallbackUrl;
  if (!/^https?:\/\//i.test(value)) {
    return `https://${value}`;
  }
  return value;
}

async function updateUrl() {
  const url = normalizeUrl(panelUrlInput.value.trim());
  panelUrlInput.value = url;
  frame.src = url;
  await chrome.storage.local.set({ sideUrl: url });
}

goButton.addEventListener('click', updateUrl);
panelUrlInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    updateUrl();
  }
});

loadStoredUrl();
