// script.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request == "Action") {
    console.log("script!!");
    qiita_getter();
  }
});

function qiita_getter() {

  var arrUrl = ["URL"];     // 記事URL
  var arrSub = ["Subject"]; // 記事題名
  var arrLgtm = ["LGTM"];   // 記事LGTM

  // 記事URLと記事題名収集
  const docList10 = window.document.querySelectorAll("a.css-1j37wyh");
//console.log(docList10);
  for( const item of docList10) {
    arrUrl.push(item.href);
    arrSub.push(item.innerText);
  }

  // ピックアップ記事を排除
  arrUrl.splice(1, 3);
  arrSub.splice(1, 3);

  // 記事LGTM収集
  const docList20 = window.document.querySelectorAll("div.css-1laxd2k");
//console.log(docList20);
  for( const item of docList20) {
    arrLgtm.push(item.innerText);
  }

  // ピックアップ記事を排除
  arrLgtm.splice(1, 3);

  // 新規作成ページ生成
  newPage = window.open("", "");

  // タイトル生成
  var titleJs = newPage.document.createElement('title');
  titleJs.innerText = "Qiitaデータ収集";

  // タイトル追加
  var headJs = newPage.document.head;
  headJs.appendChild(titleJs);

  // TABLE構成
  var r_end = arrUrl.length;  // 行数
  var c_end = 3;              // 列数

  // table要素を生成
  var tableJs = newPage.document.createElement('table');
  for (var r = 0; r < r_end; r++) {
      var trJs = newPage.document.createElement('tr');
      for (var c = 0; c < c_end; c++) {
          if (r == 0) {
            var tdJs = newPage.document.createElement('th');
          } else {
            var tdJs = newPage.document.createElement('td');
          }
          switch (c){
            case 0:
              str = arrUrl[r];
              break;
            case 1:
              str = arrSub[r];
              break;
            case 2:
              str = arrLgtm[r];
              break;
          }    
          tdJs.innerHTML = str;
          trJs.appendChild(tdJs);
      }
      tableJs.appendChild(trJs);
  }

  // table要素を追加
  var bodyJs = newPage.document.body;
  bodyJs.appendChild(tableJs);

  // style要素を生成
  const styleJs = newPage.document.createElement('style');
  styleJs.innerHTML = `
  table{
    width: 100%;
    border-collapse:separate;
    border-spacing: 0;
  }
  
  table th:first-child{
    border-radius: 5px 0 0 0;
  }
  
  table th:last-child{
    border-radius: 0 5px 0 0;
    border-right: 1px solid #3c6690;
  }
  
  table th{
    text-align: center;
    color:white;
    background: linear-gradient(#829ebc,#225588);
    border-left: 1px solid #3c6690;
    border-top: 1px solid #3c6690;
    border-bottom: 1px solid #3c6690;
    box-shadow: 0px 1px 1px rgba(255,255,255,0.3) inset;
    padding: 10px 0;
  }
  
  table td{
    border-left: 1px solid #a8b7c5;
    border-bottom: 1px solid #a8b7c5;
    border-top:none;
    box-shadow: 0px -3px 5px 1px #eee inset;
    padding: 10px 0;
  }
  
  table td:last-child{
    border-right: 1px solid #a8b7c5;
  }
  
  table tr:last-child td:first-child {
    border-radius: 0 0 0 5px;
  }
  
  table tr:last-child td:last-child {
    border-radius: 0 0 5px 0;
  }
`
  // style要素を追加
  headJs.appendChild(styleJs);

}
