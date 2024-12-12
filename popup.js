document.getElementById('setProxy').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'setProxy' });
});

document.getElementById('clearProxy').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'clearProxy' });
}); 