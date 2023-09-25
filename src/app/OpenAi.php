<?php

use Tina4\Api;

class OpenAi extends Api
{

    public $ignoreSSLValidation = true;

    function __construct($siteId = null)
    {
        $siteId = $siteId ?? 1;

        $site = new Site();
        $site->id = $siteId;
        $authHeader = "";
        if ($site->load() && !empty($site->openAiKey)) {
            $authHeader = "Authorization: Bearer " . $site->openAiKey;
        } else {
            throw new \Exception("OpenAI Key not set");
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
     * @return void
     */
    function getCompletion($prompt, $maxTokens= null)
    {
        $maxTokens = $maxTokens ?? 250;
        $request =  [ "model" => "text-davinci-003", "prompt" => $prompt, "max_tokens" => $maxTokens, "temperature" => 0.25];

        $response = $this->sendRequest("/v1/completions", "POST", $request);

        if (!empty($response->error)) {
            return $response;
        } else {
            return $response["body"];
        }
    }

}