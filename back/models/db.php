<?php

$servername = getenv('DB_HOST');
$username = getenv('DB_USERNAME');
$password = getenv('DB_PASSWORD');
$database_name = getenv('DB_NAME');
$database_port = getenv('DB_PORT') ?: 3306;
try {
    $db = new PDO("mysql:host=$servername;port=$database_port;dbname=$database_name", $username, $password);
} catch (PDOException $e) {
    echo $e->getMessage();
    die();
}

$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
