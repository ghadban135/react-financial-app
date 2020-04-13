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
Route::post('/register', 'AuthController@register');
Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout');

Route::group(['middleware' => ['jwt.verify']], function() {

Route::get('/ping', function(){
    return response()->json([
                'success' => true,], 500);
});

Route::get('/incomes', 'TransactionsController@incomeIndex');
Route::get('/expenses', 'TransactionsController@expenseIndex');
Route::get('/savingPlans', 'TransactionsController@savingPlanIndex');
Route::get('/transaction/{id}', 'TransactionsController@show');
Route::post('/transaction', 'TransactionsController@create');
Route::post('/transaction/{id}', 'TransactionsController@update');
Route::delete('/transaction/{id}', 'TransactionsController@destroy');

Route::get('/pieChartMonth', 'TransactionsController@transactionPercentage');
Route::get('/pieChartYear', 'TransactionsController@transactionPercentageYear');
Route::get('/barChartIncome', 'TransactionsController@barChartIncome');
Route::get('/barChartExpense', 'TransactionsController@barChartExpense');
Route::get('/pieChartMain', 'TransactionsController@transactionDashboard');

Route::get('/currencies', 'CurrenciesController@index');
Route::get('/currency/{id}', 'CurrenciesController@show');
Route::post('/currency', 'CurrenciesController@store');
Route::post('/currency/{id}', 'CurrenciesController@update');
Route::delete('/currency/{id}', 'CurrenciesController@destroy');

Route::get('/categories', 'CategoriesController@index');
Route::get('/category/{id}', 'CategoriesController@show');
Route::post('/category/{id}', 'CategoriesController@update');
Route::post('/category', 'CategoriesController@store');
Route::delete('/category/{id}', 'CategoriesController@destroy');


});
