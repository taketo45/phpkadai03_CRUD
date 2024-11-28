<?php
require_once('../../appconfig/config.php');

require_once('lib/DatabaseInfo.php');
require_once('lib/DatabaseController.php');

//エラー表示
ini_set("display_errors", 1);
$isDebug = true;

$db = null;
$dbinfo = new DatabaseInfo(); 


$key = $_POST['key'];
$no = $_POST['no'];


//データ取得
try {
  $db = new DatabaseController($dbinfo->dbName, $isDebug, $dbinfo->host, $dbinfo->user, $dbinfo->pass);
// $db = new DatabaseController('english_study', $isDebug);

} catch (Exception $e) {

    error_log( $e->getMessage() );

}

$deleteCount = $db->modify(
  "DELETE FROM `vocabulary` WHERE id = :id",
  [":id" => $no,]
);

echo "削除件数: {$deleteCount}件\n";
 

?>