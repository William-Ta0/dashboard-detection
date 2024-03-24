console.log("this is background.js")

// chrome.runtime.onMessage.addEventListener(
//   "message", () => {console.log("message recievd")}
// );

// chrome.runtime.onInstalled.addListener(() => {
//     chrome.action.setBadgeText({
//       text: "ON",
//     })
// })

// chrome.runtime.addEventListener(
//   "message", () => {console.log("message recievd")}
// );
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "problem") {
    chrome.runtime.sendMessage({problem: "There is a problem"});
  }
});

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
//   sendResponse({farewell: "goodbye"});
// });

chrome.action.onClicked.addListener(async (tab) => {
  await chrome.scripting.executeScript({
    target:{
      tabId: tab.id
    },
    files : ['content.js']
  })
})


console.log("end of background")