<?php
require_once('../../appconfig/config.php');

require_once('lib/DatabaseInfo.php');
require_once('lib/DatabaseController.php');

//エラー表示
ini_set("display_errors", 1);
$isDebug = true;

$db = null;
$dbinfo = new DatabaseInfo(); 

$key = $_POST['key'];  //配列の要素番号なので、noより1少ない数が入る
$no = $_POST['no']; //画面表示されている番号
$eword = $_POST['eword'];
$wordclass = $_POST['wordclass'];
$jword = $_POST['jword'];
$wexample = $_POST['wexample'];
$iknow = $_POST['iknow'];
// error_log('iknowの中身:'. $iknow);
$level = 0;
if ($iknow == "true"){
  $level = 1;
} else {
  $level = 0;
}

//データ取得
try {
  $db = new DatabaseController($dbinfo->dbName, $isDebug, $dbinfo->host, $dbinfo->user, $dbinfo->pass);
// $db = new DatabaseController('english_study', $isDebug);

} catch (Exception $e) {

    error_log( $e->getMessage() );

}

$updateCount = $db->modify(
  "UPDATE `vocabulary` SET 
  word = :word, 
  part_of_speech = :part_of_speech,
  meaning = :meaning, 
  example_sentence = :example_sentence, 
  level = :level
   WHERE id = :id",
  [
      ":id" => $no,
      ":word" => $eword,
      ":part_of_speech" => $wordclass,
      ":meaning" => $jword,
      ":example_sentence" => $wexample,
      ":level" => $level,
  ]
);
echo "更新件数: {$updateCount}件\n";

?>