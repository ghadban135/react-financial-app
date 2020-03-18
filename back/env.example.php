<?php
# Don't forget to create a env.php file and copy the content of this file to the env.php file.
# After copying the content of this file don't forget to replace the appropriate variable with there values

$variables = [
    'DB_USERNAME' => 'root',
    'DB_HOST' => 'localhost',
    'DB_USERNAME' => 'root',
    'DB_PASSWORD' => '',
    'DB_NAME' => 'demoDB',
    'DB_PORT' => '3306',
];

foreach ($variables as $key => $value) {
    putenv("$key=$value");
}
