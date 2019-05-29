chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
   chrome.declarativeContent.onPageChanged.addRules([{
     conditions: [new chrome.declarativeContent.PageStateMatcher({
       pageUrl: {schemes: ['https', 'http', 'localhost', 'chrome', 'file']},
     })
     ],
         actions: [new chrome.declarativeContent.ShowPageAction()]
   }]);
 });
// let userToken = 'token';

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.token) {
      console.log(request.token);
      // userToken = request.token;
      chrome.extension.onConnect.addListener(function(port) {
        console.log("Connected .....");
        port.onMessage.addListener(function(msg) {
             console.log("message recieved" + msg);
             port.postMessage(request.token);
        });
      })
    }
});

  