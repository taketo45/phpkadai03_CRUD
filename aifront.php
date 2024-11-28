<?php
header('Content-Type: application/json; charset=utf-8');

require_once '../../appconfig/config.php';
require_once 'lib/GeminiAPI.php';


// プロンプトの取得と検証
$prompt = $_POST['eword'] ?? '';

if (empty($prompt)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'プロンプトが空です']);
    exit;
}

$completeprompt = "英単語「".$prompt."」の語源の構成と意味の変遷だけを教えてください。";

// GeminiAPIの実行
$gemini = new GeminiAPI(GEMINI_API_KEY, true);
$response = $gemini->generateResponse($completeprompt);

echo json_encode($response);