chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
   chrome.declarativeContent.onPageChanged.addRules([{
     conditions: [new chrome.declarativeContent.PageStateMatcher({
       pageUrl: {schemes: ['https', 'http', 'localhost', 'chrome', 'file']},
     })
     ],
         actions: [new chrome.declarativeContent.ShowPageAction()]
   }]);
 });

 chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    console.log('hello')
    if (sender.url == 'xx')
      return;  // don't allow this web page access
    if (request.openUrlInEditor)
      console.log(request.openUrlInEditor);
  });
