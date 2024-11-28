

  async function postByJQuery(url, data){
    return $.ajax({
      url: url,
      method: 'POST',
      // data: JSON.stringify(data),
      data: data,
      // contentType: 'application/json',
      contentType: 'application/x-www-form-urlencoded',
      dataType: 'json'
    });
  }

  window.onload = function() {
    console.log("serchlevel:"+serchlevel);
    console.log("maxitems:"+maxitems);
    const postData = {
      level: serchlevel,
      limit: maxitems
      };

    postByJQuery(selectAllUrl, postData)
    // postByJQuery(selectUrl, postData)
      .then((responseData)=>{
        responseDisplay(responseData);
      })
      .catch((jqXHR, textStatus, error) => {
        console.error('Ajax error:', {
            status: jqXHR.status,
            statusText: textStatus,
            responseText: jqXHR.responseText,
            error: error
        });
    });


    CEL.$insertbutton.on('click', function(){
      console.log('insert clicked!');
      let no = IEL.$inputno.show().val();
      console.log('no: ' + no);
      let eword = IEL.$englishword.val();
      let wordclass = IEL.$wordclass.val();
      let jword = IEL.$japaneseword.val();
      let wexample = IEL.$wordexample.val();
      let iknow = IEL.$iknow.prop('checked');
      // console.log(no, eword, wordclass, jword, wexample, iknow);
      joinedwc = wordclass.join('・');

      insert(no ,eword, joinedwc, jword, wexample, iknow);
    });

    //UPDATE 処理
    //※動的生成した項目はidのイベントを拾えないので、
    //親要素に対してイベントデリゲーションを利用する必要がある。→ メモアプリ実装参照
    CEL.$document.on('click', '.updatebutton', function() {
      console.log('update clicked!');
      updatePrepare($(this));
    });

    CEL.$document.on('change', '.t-iknow', function() {
      updatePrepare($(this));
    });

    function updatePrepare($this) {
      console.log('iknow checked!');
      let key = $this.attr('key');
      let no = $('#t-no' + key).text();
      let englishword = $('#t-eword' + key).text();
      let wordclass = $('#t-wclass' + key).val();
      let jword = $('#t-japanesew' + key).val();
      let wexample = $('#t-wexample' + key).val();
      let iknow = $('#t-iknow' + key).prop('checked');
      console.log(key, no, englishword, wordclass, jword, wexample, iknow);
      update(key, no,  englishword, wordclass, jword, wexample, iknow);
    }

    xhr = new XMLHttpRequest();

    // サーバからのデータ受信を行った際の動作
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          OEL.$result.text(xhr.responseText);
          //:TODO: ここで画面を再読み込み
          window.location.reload(true);
        } else {
          console.error(xhr.statusText);
          OEL.$result.text(xhr.statusText);
        }
      }
    };
  };

  //	Materializeの初期化
  $(document).ready(function(){
    //  セレクトボックスの初期化
    $('select').formSelect();
    //  パララックスの初期化
    $('.parallax').parallax();
    //  モーダルの初期化
    $('.modal').modal();
    //  タブの初期化
    $('.tabs').tabs();
    //  サイドナビの初期化
    $('.sidenav').sidenav();
    //  フローティングアクションボタンの初期化
    $('.fixed-action-btn').floatingActionButton();
    //  アコーディオン表示の初期化
    $('.collapsible').collapsible();
    // //  FeatureDiscoveryの初期化
    // $('.tap-target').tapTarget();
    //ナビバーの初期化
    $('.sidenav').sidenav();
  });

  $('.dropdown-trigger').dropdown();

  function insert(no, eword, wordclass, jword, wexample, iknow) {
    xhr.open('POST', 'insert.php', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    // フォームに入力した値をリクエストとして設定
    let request = "no" + no + "&eword=" + eword + "&wordclass=" + wordclass + "&jword=" + jword + "&wexample=" + wexample + "&iknow=" + iknow;
    // console.log(request);
    try {
      xhr.send(request);

    } catch (error) {
      console.log(error);
    }
  }

  function update(key, no,  englishword,wordclass, jword, wexample, iknow) {
    xhr.open('POST', 'update.php', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    // フォームに入力した値をリクエストとして設定
    let request = "key=" + key + "&no=" + no + "&eword=" + englishword + "&wordclass=" + wordclass + "&jword=" + jword + "&wexample=" + wexample + "&iknow=" + iknow;
    console.log('update() request:  ' + request);
    try {
      xhr.send(request);

    } catch (error) {
      console.log(error);
    }
  }

  function deleteRecord(key) {
    xhr.open('POST', 'delete.php', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    // フォームに入力した値をリクエストとして設定
    let no = $('#t-no' + key).text();
    let request = "key=" + key + "&no=" + no;
    console.log(request);
    try {
      xhr.send(request);

    } catch (error) {
      console.log(error);
    }
  }

  function responseDisplay(responseData){

    // console.log(responseData);

    // const arrData = JSON.parse(responseData);
    const arrData = responseData;
    let lastnum = 0;


    for(let row in arrData){
      // console.log("row: " + row);
      let tr = $('<tr>');
        for(let col in arrData[row]){
        // console.log("col: " + col);
        let td = $('<td>');
        if(col == "id"){
          td.attr('class', 't-no');
          td.html(`<div id="t-no${row}">${arrData[row][col]}</div>`);
          tr.append(td);
          lastnum = Number(arrData[row][col]);
        }
        if(col == "word" ){
          td.attr('class', 't-eword');
          td.html(`<div id="t-eword${row}">${arrData[row][col]}</div>`);
          tr.append(td);
        }
        if(col == "part_of_speech"){
          td.attr('class', 't-wc');
          td.html(`<input class="input-field col s6" type="text" id="t-wclass${row}" value="${arrData[row][col]}">`);
          tr.append(td);
        }
        if(col == "meaning"){
          td.html(`<input class="input-field col s6 t-jw" type="text" id="t-japanesew${row}" value="${arrData[row][col]}">`);
          tr.append(td);
        }
        if(col == "example_sentence"){
          td.html(`<textarea class="materialize-textarea t-we" type="text" id="t-wexample${row}">${arrData[row][col]}</textarea>
          `);
          tr.append(td);

          //既知のチェックボックス表示制御
          let tdcheck = $('<td>');
          if(Number(arrData[row]["level"]) == 1){
            tdcheck.html(`
              <p class="td-func">
                <label>
                  <input class="t-iknow" id="t-iknow${row}" key="${row}" type="checkbox"  checked="checked"/>
                  <span></span>
                </label>
              </p>
            `);
          } else {
            tdcheck.html(`
              <p class="td-func">
                <label>
                  <input class="t-iknow" id="t-iknow${row}" key="${row}" type="checkbox" />
                  <span></span>
                </label>
              </p>
            `);
          }
          tr.append(tdcheck);

          //更新・削除ボタンの表示制御
          let tdfunc = $('<td>');
          tdfunc.html(`
            <ul class="ul-func">
              <li><a class="updatebutton btn-floating btn-small blue accent-2" key="${row}"><i class="material-icons" >mode_edit</i></a></li>
              <li><a class="btn-floating btn-small blue accent-2"><i class="material-icons" onClick="deleteRecord(${row})">delete</i></a></li>
            </ul>
          `);
          tr.append(tdfunc);
        }

        OEL.$serchresult.append(tr);
      }
      IEL.$inputno.val(lastnum + 1);
    }
  }

  function responseCardDisplay(responseData){

    // console.log(responseData);

    // const arrData = JSON.parse(responseData);
    const arrData = responseData;
    let lastnum = 0;
    let count = 0;
    let listitem = "";

    arrData.forEach((data, index)=>{
      const row = index;
      listitem += `
      <li>
        <div class="collapsible-header">
          <i class="material-icons">expand_more</i>
          <div class="t-no" id="t-no${row}">${data.id}</div>
          <div class="t-eword" id="t-eword${row}">${data.word}</div>
        </div>
        <div class="collapsible-body">
          <div class="t-wc">
            <input class="input-field col s6" type="text" id="t-wclass${row}" value="${data.part_of_speech}">
          </div>
          <div class="c-jw">
            <input class="input-field col s6 t-jw" type="text" id="t-japanesew${row}" value="${data.meaning}">
          </div>
          <div class="c-we">
            <textarea class="materialize-textarea t-we" type="text" id="t-wexample${row}">${data.example_sentence}</textarea>
          </div>
          <div class="c-iknow">
            <label>
              <input class="t-iknow" id="t-iknow${row}" key="${row}" type="checkbox" ${data.level == 1?'checked="checked"':''}/>
              <span></span>
            </label>
          </div>
          <div class="c-func">
            <ul class="ul-func">
              <li><a class="updatebutton btn-floating btn-small blue accent-2" key="${row}"><i class="material-icons">mode_edit</i></a></li>
              <li><a class="btn-floating btn-small blue accent-2"><i class="material-icons" onClick="deleteRecord(${row})">delete</i></a></li>
            </ul>
          </div>
        </div>
      </li>
      `;
      if(index == Math.round(arrData.length/2)){
        OEL.$leftcollapsible.append(listitem);
        listitem = "";
      }
      lastnum = data.id;
    });
    OEL.$rightcollapsible.append(listitem);

    IEL.$inputno.val(lastnum + 1);
  }
