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

Route::get('/incomes', 'TransactionsController@incomeIndex');
Route::get('/expenses', 'TransactionsController@expenseIndex');
Route::get('/savingPlans', 'TransactionsController@savingPlanIndex');
Route::get('/transaction/{id}', 'TransactionsController@show');
Route::post('/transaction', 'TransactionsController@create');
Route::post('/transaction/{id}', 'TransactionsController@update');
Route::delete('/transaction/{id}', 'TransactionsController@destroy');

Route::get('/currencies', 'CurrenciesController@index');
Route::get('/currency/{id}', 'CurrenciesController@show');
Route::post('/currency', 'CurrenciesController@store');
Route::post('/currency/{id}', 'CurrenciesController@update');
Route::delete('/currency/{id}', 'CurrenciesController@destroy');

Route::get('/users', 'UsersController@index');
Route::get('/user/{id}', 'UsersController@show');
Route::post('/user', 'UsersController@store');
Route::post('/user/{id}', 'UsersController@update');
Route::delete('/user/{id}', 'UsersController@destroy');