<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "english_study";

// MySQLデータベースに接続
try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// CSVファイルを開く
$csvFile = fopen('data/englishword.csv', 'r');
if ($csvFile === false) {
    die('Error opening the file.');
}

// CSVファイルの各行を読み込み、データベースに挿入
while (($data = fgetcsv($csvFile)) !== false) {
    $stmt = $pdo->prepare("INSERT INTO vocabulary (id, word, part_of_speech, meaning, example_sentence, level) VALUES (:id, :word, :part_of_speech, :meaning, :example_sentence, :level)");
    $stmt->bindValue(':id', $data[0], PDO::PARAM_INT);
    $stmt->bindValue(':word', $data[1], PDO::PARAM_STR);
    $stmt->bindValue(':part_of_speech', $data[2], PDO::PARAM_STR);
    $stmt->bindValue(':meaning', $data[3], PDO::PARAM_STR);
    $stmt->bindValue(':example_sentence', $data[4], PDO::PARAM_STR);
    $stmt->bindValue(':level', $data[5], PDO::PARAM_INT);
    $stmt->execute();
}

// CSVファイルを閉じる
fclose($csvFile);

echo "Data successfully imported!";
?>