<?php
/**
 * Code was coped from the below link
 * https://medium.com/@hfally/how-to-create-an-environment-variable-file-like-laravel-symphonys-env-37c20fc23e72
 *
 * The use case of this code is to use envirnment variable without using any extra library
 * In simple words, using a library would make the code more complicated
 */
if (file_exists(__DIR__ . '/env.php')) {
    include __DIR__ .'/env.php';
}
if (!function_exists('env')) {
    function env($key, $default = null)
    {
        $value = getenv($key);

        if ($value === false) {
            return $default;
        }

        return $value;
    }
}

define('ROOT_PATH', __DIR__);