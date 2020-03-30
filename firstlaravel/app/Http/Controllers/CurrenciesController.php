<?php

namespace App\Http\Controllers;

use App\Currencies;
use Illuminate\Http\Request;

class CurrenciesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $currencies = Currencies::all();

        if(!$currencies){
            return response()->json([
                'status' => 'failed',
                'message' => 'No currencies found'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'currencies' => $currencies
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $inputs = $request->all();

        $currencies = new Currencies();
        $currencies->fill($inputs);
        $currencies->save();

        return response()->json([
            'status' => 'success',
            'currencies' => $currencies
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show($id)
    {
        $currencies = Currencies::where('id', $id)->first();

        return response()->json([
            'status' => 'success',
            'currencies' => $currencies
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $inputs = $request->all();
        $currencies = Currencies::where('id', $id)->first();

        $currencies->update($inputs);
        $currencies->save();

        return response()->json([
            'status' => 'success',
            'currencies' => $currencies
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $currencies = Currencies::where('id', $id)->delete();

        return response()->json([
            'status' => 'success',
        ], 204);
    }
}
