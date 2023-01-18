<?php
/* Copyright (C) 2023 Code Infinity - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the GNU GENERAL PUBLIC LICENSE (V3),
 *
 * You should have received a copy of the GNU GENERAL PUBLIC LICENSE (V3) with
 * this project. If not, please write to: info@codeinfinity.co.za, or visit : codeinfinity.co.za
 *
 * License URL : https://github.com/tina4stack/tina4-php/blob/master/LICENSE
 */

/**
 * Retrieve dataset by $code
 *
 * @method "POST"
 * @param $code String #Code identifier of dataset config
 * @param $request Tina4\Request #Request data (Unused here)
 * @param $response Tina4\Response #Response of request (Standard HTML Response)
 * @returns  @response Tina4\Response (HTML Dynamic content)
 */
\Tina4\Get::Post("/tina4site/tina4site-dataset/api/{code}", function ($code, \Tina4\Response $response){
    //Instantiate dataset model
    $dataSetModel = (new Tina4SiteDataSet())->load("code = '$code'");

    //Define variables in context
    $table = $dataSetModel->datasetTable;
    $columns = $dataSetModel->datasetColumns;
    $where = $dataSetModel->datasetConditions ?? '';
    $type = $dataSetModel->type;

    //Fetch dataset based on configuration
    $dataset['data'] = $dataSetModel->select($columns)
        ->from($table)
        ->where($where)
        ->asArray();

    //Define dataset type for use by front end
    $dataset['type'] = $type;

    //Return the dataset array containing set properties and dataset listing
    return $response($dataset, HTTP_OK, TEXT_HTML);
});
