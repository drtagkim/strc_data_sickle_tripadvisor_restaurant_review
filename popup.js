const run=document.querySelector("#run");
const msg=document.querySelector("#msg");
//const msg=document.querySelector("#msg");
/*
기본적으로 실행되어야 할 백그라운드 함수
*/
chrome.tabs.query({
    active:true,
    currentWindow:true
},(tabs)=>{
    chrome.tabs.executeScript({
        file:'js/my_function.js'
    });
});

run.addEventListener('click',()=>{
    chrome.tabs.query({
        active:true,
        currentWindow:true
    },(tabs)=>{
        chrome.tabs.executeScript({
            file:'js/content1.js'
        });
    });
});

const msgcode=setInterval(()=>{
    chrome.tabs.query({
        active:true,
        currentWindow:true
    },(tabs)=>{
        chrome.tabs.executeScript({
            file:'js/test.js'
        },function(result){
            msg.innerText=result;
        });
    });
},500);
