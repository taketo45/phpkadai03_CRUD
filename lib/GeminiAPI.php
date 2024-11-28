<?php
class GeminiAPI {
    private string $apiKey;
    private bool $isDebug;
    private string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent';

    public function __construct(string $apiKey, bool $isDebug = false) {
        $this->apiKey = $apiKey;
        $this->isDebug = $isDebug;
    }

    private function logDebug(string $methodName, ?array $params = null, $result = null): void {
        if ($this->isDebug) {
            error_log("[GeminiAPI] {$methodName}");
            if ($params) error_log('Parameters: ' . json_encode($params));
            if ($result) error_log('Result: ' . json_encode($result));
        }
    }

    private function prepareRequest(string $prompt): array {
        return [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => 0.9,
                'topK' => 1,
                'topP' => 1,
                'maxOutputTokens' => 2048,
            ]
        ];
    }

    private function executeRequest(array $requestData): array {
        $ch = curl_init();
        $url = $this->baseUrl . '?key=' . $this->apiKey;

        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($requestData),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json'
            ]
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            throw new Exception("cURL Error: {$error}");
        }

        if ($httpCode !== 200) {
            throw new Exception("API Error: HTTP {$httpCode}");
        }

        return json_decode($response, true);
    }

    public function generateResponse(string $prompt): array {
        try {
            $this->logDebug('generateResponse', ['prompt' => $prompt]);

            $requestData = $this->prepareRequest($prompt);
            $response = $this->executeRequest($requestData);

            $text = $response['candidates'][0]['content']['parts'][0]['text'] ?? '';
            $this->logDebug('generateResponse', null, $text);

            return [
                'success' => true,
                'text' => $text
            ];
        } catch (Exception $e) {
            if ($this->isDebug) {
                error_log('GeminiAPI Error: ' . json_encode([
                    'message' => $e->getMessage(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                    'trace' => $e->getTraceAsString(),
                    'prompt' => $prompt
                ]));
            }

            return [
                'success' => false,
                'error' => "エラーが発生しました: {$e->getMessage()}"
            ];
        }
    }
}