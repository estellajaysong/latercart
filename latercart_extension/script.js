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
    if (request.token) {
      console.log(request.token);
      let userToken = request.token;
      // const port = chrome.runtime.connect({name: "knockknock"});
      // port.postMessage({userToken: request.token});
      // port.onMessage.addListener(function(msg) {
      //   if (msg.question == "Who's there?")
      //     port.postMessage({answer: "Madame"});
      //   else if (msg.question == "Madame who?")
      //     port.postMessage({answer: "Madame... Bovary"});
      // });
    }
  });

