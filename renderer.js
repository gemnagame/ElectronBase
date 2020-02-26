// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const {ipcRenderer} = require('electron')

var BANK_TYPE = {
    KAKAO_BANK : 1,
    WOORI_BANK : 2,
    SHINHAN_BANK : 3,
    KB_BANK : 4
    //NONGHYUP_BANK : 5
}

var PAGE_TYPE = {
    EVENT_PAGE : 1,
    PRODUCT_PAGE : 2
};

var g_bank_type = BANK_TYPE.KAKAO_BANK;
var g_page_type = PAGE_TYPE.EVENT_PAGE;//전역변수인데 클래스로 변경?? 구조 고민 ㄱㄱ

function OnChangeBankType() {
    var element = document.querySelector('#bank_type');
    var bankType = element.value.toUpperCase();
  
    ChangeBankType(BANK_TYPE[bankType]);
}

function ChangeBankType(bank_type) {
    g_bank_type = bank_type;
    alert(g_bank_type);
}

function OnClickPageType(page_type) {
    g_page_type = page_type;
    alert(g_page_type);
}

function createDivElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes
    return div;//.firstChild; 
  }

function Send_msg(){
    ipcRenderer.send('asynchronous-message', 'http://www.okcashbag.com/life/exchange/exchangeMain.do')
    //ipcRenderer.send('asynchronous-message', 'https://gemnagame.github.io/PointConversionService/')    
}

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    
    //alert(arg.title);
    // var create = document.createRange().createContextualFragment('<h1>ddddd</h1>');
    // let frag = document.createRange().createContextualFragment('<div>One</div><div>Two</div>');    
    //let doc = new DOMParser().parseFromString("<div id='foo'><a href='#'>Link</a><span></span></div>");  
    //var e = htmlToElement('123123');

    //var s = '<div id="example" style="width: 500px;">    안녕하세요 이미지 캡쳐 예제입니다.<br />    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nsgRjLZntKqK6j0kKjHsYJtQQGsLo27TeDJhy3p85qp9m9WB">        </div>'
    //var e = createDivElementFromHTML(s);   

    var e = createDivElementFromHTML(arg);   
    document.getElementById('test1').appendChild(e);
    ShowScreenshot(e);
});

function ShowScreenshot(html_element) {    
      html2canvas(html_element,{      
    //html2canvas(document.getElementById('example'), {
        useCORS: true, // 다른사이트의리소스가있을때활성화(그러나...Access-Control-Allow-Origin 필요)
        onrendered: function(canvas) {			                
            // $("#test").html('<img src=' + canvas.toDataURL("image/png") + '>');

            var img = document.createElement('img');
            img.src = canvas.toDataURL("image/png");
            document.getElementById('test2').appendChild(img);
        }
    });
}
