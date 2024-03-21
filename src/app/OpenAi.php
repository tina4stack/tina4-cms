<?php

use Tina4\Api;

class OpenAi extends Api
{

    public $ignoreSSLValidation = true;
    public $active = true;

    function __construct($siteId = null)
    {
        $siteId = $siteId ?? 1;

        $site = new Site();
        $authHeader = "";
        if ($site->load("id = ?", [$siteId]) && !empty($site->openAiKey)) {
            $authHeader = "Authorization: Bearer " . $site->openAiKey;
        } else {
            $this->active = false;
        }
        $baseURL = 'https://api.openai.com';
        parent::__construct($baseURL, $authHeader);
    }

    /**
     * Gets the models for ChatGPT
     * @return array|mixed
     */
    function getModels()
    {
        return $this->sendRequest("/v1/models");
    }

    /**
     * @param $prompt
     * @param null $maxTokens
     * @return array
     */
    function getCompletion($prompt, $maxTokens= null): array
    {
        if (!$this->active) return [];

        $maxTokens = $maxTokens ?? 250;
        $request =  [ "model" => "gpt-3.5-turbo", "messages" => [(object)["role" => "user", "content" => $prompt]], "max_tokens" => $maxTokens, "temperature" => 0.25];

        $response = $this->sendRequest("/v1/chat/completions", "POST", $request);

        if (!empty($response["error"])) {
            return $response;
        } else {
            return $response["body"];
        }
    }

    /**
     * Gets an image from the API
     * @param $prompt
     * @param int $noOfImages
     * @return string
     */
    function getImage($prompt, int $noOfImages=1): ?string
    {
        if (!$this->active) return null;

        $request =  [ "model" => "dall-e-3", "prompt" => $prompt, "size" => "1024x1024", "n" => $noOfImages];
        $response = $this->sendRequest("/v1/images/generations", "POST", $request);

        if (!empty($response["error"])) {
            return $response;
        } else {
            return $response["body"];
        }

    }

}