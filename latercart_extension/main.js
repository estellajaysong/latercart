chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.executeScript(
    tabs[0].id,
    {
      file: 'jQuery.js'
    });
  chrome.tabs.executeScript(
    tabs[0].id,
    {
      file: 'axios.js'
    });
  chrome.tabs.executeScript(
    tabs[0].id,
    {
      file: 'getInfo.js'
    });
});