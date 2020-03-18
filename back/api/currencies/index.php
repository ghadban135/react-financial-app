<?php

use MyApp\DB\Currency;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');

require_once __DIR__ . '/../../autoload.php';
require_once ROOT_PATH . '/models/db.php';
require_once ROOT_PATH . '/models/Currency.php';

$currenciesModel = new Currency($db);
//
http_response_code(200);
header('Content-Type: application/json; charset=utf-8');

try {

    $currencies = $currenciesModel->getCurrencies();
//    var_dump($currencies);


    if ($currencies) {
        echo json_encode(array(
            'success' => true,
            'data' => $currencies
        ));
        die();
    }

    echo json_encode(array(
        'success' => false,
        'message' => 'currency with is not found'
    ));
    die();
} catch (Exception $error) {
    echo json_encode(array(
        'success' => false,
        'message' => $error->getMessage(),
    ));
    die();

}
