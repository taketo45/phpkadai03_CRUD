<?php
require_once('../../appconfig/config.php');

require_once('lib/DatabaseInfo.php');
require_once('lib/DatabaseController.php');

//エラー表示
ini_set("display_errors", 1);
$isDebug = true;

$db = null;
//データ取得
$dbinfo = new DatabaseInfo(); 

$level = $_POST['level']?:0;
$limit = $_POST['limit'];

error_log($level."と".$limit);


//データ取得
try {
  $db = new DatabaseController($dbinfo->dbName, $isDebug, $dbinfo->host, $dbinfo->user, $dbinfo->pass);

  error_log("SELECT ALL done!");

} catch (Exception $e) {

    error_log( $e->getMessage() );

}

// $sql = "SELECT * FROM `vocabulary`";
$sql = "SELECT * FROM `vocabulary` WHERE level >= :level LIMIT :limit";
$param = [
  ":level" => $level,
  ":limit" => (int)$limit    //LIMITのシンタックスエラー対策
];
$values = $db->select($sql, $param);


$json = json_encode($values);
// $json = $values;
echo $json;

?>

