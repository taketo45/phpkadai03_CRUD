

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
        responseCardDisplay(responseData);
      })
      .catch((jqXHR, textStatus, error) => {
        console.error('Ajax error:', {
            status: jqXHR.status,
            statusText: textStatus,
            responseText: jqXHR.responseText,
            error: error
        });
    });
    
      xhr = new XMLHttpRequest();
      // select(0, 10);



    // CEL.$insertbutton.on('click', function(){
    //   console.log('insert clicked!');
    //   let no = IEL.$inputno.show().val();
    //   console.log('no: ' + no);
    //   let eword = IEL.$englishword.val();
    //   let wordclass = IEL.$wordclass.val();
    //   let jword = IEL.$japaneseword.val();
    //   let wexample = IEL.$wordexample.val();
    //   let iknow = IEL.$iknow.prop('checked');

    //   joinedwc = wordclass.join('・');

    //   insert(no ,eword, joinedwc, jword, wexample, iknow);
    // });

    CEL.$serchbutton.on('click',function(){
      console.log('serch clicked!');
      let eword = IEL.$s_englishword.val();
      let wordclass = IEL.$s_wordclass.val();
      let jword = IEL.$s_japaneseword.val();
      let iknow = IEL.$s_iknow.prop('checked');
      // console.log(no, eword, wordclass, jword, wexample, iknow);
      // joinedwc = wordclass.join('・');

      serch(eword, wordclass, jword, iknow);
    });

    //UPDATE 処理
    //※動的生成した項目はidのイベントを拾えないので、
    //親要素に対してイベントデリゲーションを利用する必要がある。→ メモアプリ実装参照
    // CEL.$document.on('click', '.updatebutton', function() {
    //   console.log('update clicked!');
    //   updatePrepare($(this));
    // });

    CEL.$document.on('change', '.t-iknow', function() {
      updatePrepare($(this));
    });

    function updatePrepare($this) {
      console.log('iknow checked!');
      let key = $this.attr('key');
      let no = $('#t-no' + key).text();
      let englishword = $('#t-eword' + key).text();
      let wordclass = $('#t-wclass' + key).text();
      let jword = $('#t-japanesew' + key).text();
      let wexample = $('#t-wexample' + key).text();
      let iknow = $('#t-iknow' + key).prop('checked');
      console.log(key, no, englishword, wordclass, jword, wexample, iknow);
      update(key, no,  englishword, wordclass, jword, wexample, iknow);
    }

    // xhr = new XMLHttpRequest();

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
    //ドロップダウンの初期化
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

  function serch(eword, wordclass, jword, iknow) {
    xhr.open('POST', 'insert.php', true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
    // フォームに入力した値をリクエストとして設定
    let request = "eword=" + eword + "&wordclass=" + wordclass + "&jword=" + jword + "&iknow=" + iknow;
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

  CEL.$document.on('click', '.geminibtn', function() {
    console.log('geminibtn clicked!');
    geminiPrepare($(this));
  });

  async function geminiPrepare($this) {
    console.log('gemini checked!');
    let key = $this.attr('key');
    let englishword = $('#t-eword' + key).text();
    console.log(englishword);
    // const response = await geminiquery(englishword);
    // console.log('Gemini response:', response);
    // OEL.$gemniresult.html(response.text.replace(/\n/g, '<br>'));

    geminiquery(englishword).then((response)=>{
      console.log('Gemini response:', response);
      OEL.$geminiresult.html(response.text.replace(/\n/g, '<br>'));
    });

  }

  async function   geminiquery(englishword) {
    try {
        const response = await fetch('aifront.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: `eword=${encodeURIComponent(englishword)}`
        });

        if (!response.ok) {
            throw new Error(`HTTPエラー: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('エラー:', error);
        throw error;
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
      <li class="wordcard">
        <div class="collapsible-header">
          <i class="material-icons">expand_more</i>
          <div class="c-no" id="t-no${row}">${data.id}</div>
          <div class="c-eword" id="t-eword${row}">${data.word}</div>
        </div>
        <div class="collapsible-body">
          <div class="c-wc-jw">
          <div class="c-wc">
            <div class="input-field col" type="text" id="t-wclass${row}">${data.part_of_speech}</div>
          </div>
          <div class="c-jw">
            <div class="input-field col t-jw" type="text" id="t-japanesew${row}">${data.meaning}</div>
          </div>
          </div>
          <div class="c-we">
            <div class="materialize-textarea t-we" type="text" id="t-wexample${row}">${data.example_sentence}</div>
          </div>
          <div class="c-iknow">
            <label>
              <input class="c-iknow" id="t-iknow${row}" key="${row}" type="checkbox" ${data.level == 1?'checked="checked"':''}/>
              <span></span>
            </label>
          </div>
          <div class="ai">
            <a class="geminibtn waves-effect waves-light btn modal-trigger blue accent-2" key="${row}" href="#gemini"><i class="material-icons left">search</i>単語の語源</a>
          </div>
        </div>
      </li>
      `;
      // if(index == Math.floor(arrData.length/2)){
      //   OEL.$leftcollapsible.append(listitem);
      //   listitem = "";
      // }
      lastnum = data.id;
    });
    // OEL.$rightcollapsible.append(listitem);
    OEL.$maincollapsible.append(listitem);

    IEL.$inputno.val(lastnum + 1);
  }
