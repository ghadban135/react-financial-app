<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/categories', 'CategoriesController@index');
Route::get('/categories/{id}', 'CategoriesController@show');
Route::post('/categories/{id}', 'CategoriesController@update');
Route::post('/categories', 'CategoriesController@store');
Route::delete('/categories/{id}', 'CategoriesController@destroy');

Route::get('/tasks', 'TaskController@index');
Route::get('/task/{id}', 'TaskController@show');
Route::post('/task/{id}', 'TaskController@update');
Route::post('/task', 'TaskController@store');
Route::delete('/task/{id}', 'TaskController@destroy');
