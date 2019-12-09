const TA_QUERY={
    more:`[onclick="widgetEvCall('handlers.clickExpand',event,this);"]`,
    next:'a[class*="nav next"]',
    next_no_more:'a[class="nav next ui_button primary disabled"]',
    current_page_num:'.pageNumbers [class*="current"]',
    last_page_num:'.pageNumbers [class*="last"]'
};

function clearMemory(objURL) {
    if (window.__Xr_objURL_forCreatingFile__) {
        window.URL.revokeObjectURL(window.__Xr_objURL_forCreatingFile__);
    }
    window.__Xr_objURL_forCreatingFile__ = objURL;
}
function write_page_source(data,callback) {
    var blob=new Blob([data],{type:'text/plain'}); //텍스트 파일로 설정
    var objURL=window.URL.createObjectURL(blob); //URL을 비운다.
    clearMemory(objURL); //메모리 클리어
    var link = document.createElement('a');
    link.href = objURL;
    let file_date=new Date();
    file_date=file_date.toGMTString();
    link.download="tripadvisor_hotel_reivew_("+file_date+").html";
    link.click();
}
function run() {
    let element_more=document.querySelector(TA_QUERY.more);
    let WAIT_MORE=1000;
    if(element_more!=null)
        element_more.click();
    write_page_source(document.body.innerHTML);
}
function run_continue() {
    let element_more=document.querySelector(TA_QUERY.more);
    let element_next=document.querySelector(TA_QUERY.next);
    let element_next_no_more=document.querySelector(TA_QUERY.next_no_more);
    let WAIT=1000;
    if(element_next != null && element_next_no_more==null) {
        element_next.click();
        if(element_more!=null) {
            element_more.click();
        }
        write_page_source(document.body.innerHTML);
    }
}
function get_page_num() {
    let current_page=document.querySelector(TA_QUERY.current_page_num) //현재 페이지
    let last_page=document.querySelector(TA_QUERY.last_page_num);
    let end_page;
    let current_page_no;
    let return_msg;
    if(current_page != null) { //존재하면
        current_page_no=parseInt(current_page.innerText);
        end_page=parseInt(last_page.innerText);
    } else {
        return "Tripadvisor hotel reviews required";
    }
    if(current_page_no>=end_page) {
        return_msg="Complete";
    } else {
        return_msg="In progress... "+current_page_no+"/"+end_page;
    }
    return return_msg;
}