chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({
    },function(){
        console.log("install complete.");
    });
});
chrome.downloads.onChanged.addListener((d)=>{
	if('state' in d && d.state.current==='complete') {
        chrome.tabs.query({
            active:true,
            currentWindow:true
        },(tabs)=>{
            chrome.tabs.executeScript({file:"js/content2.js"});
        });
	}
});