<?php

namespace App\Http\Controllers;
use App\Currency;
use App\Http\Requests\CurrencyRequest;
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
        $currencies = Currency::all();
        if(!$currencies){
            return response()->json([
                'success' => false,
                'message' => 'No currencies found'
            ], 500);
        }

        return response()->json([
            'success' => true,
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

        $currencies = new Currency();
        $currencies->fill($inputs);
        $currencies->save();
                if(!$currencies){
            return response()->json([
                'success' => false,
                'message' => 'something wrong'
            ], 500);
        }
        return response()->json([
            'success' => true,
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
        $currencies = Currency::where('id', $id)->first();
                if(!$currencies){
            return response()->json([
                'success' => false,
                'message' => 'No currencies found'
            ], 500);
        }
        return response()->json([
            'success' => true,
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
    public function update(CurrencyRequest $request, $id)
    {
        $inputs = $request->all();
        $currencies = Currency::where('id', $id)->first();

        $currencies->update($inputs);
        $currencies->save();
                if(!$currencies){
            return response()->json([
                'success' => false,
                'message' => 'something wrong'
            ], 500);
        }
        return response()->json([
            'success' => true,
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
        $currencies = Currency::where('id', $id)->delete();
                       if($currencies == 0){
            return response()->json([
                'success' => false,
                'message' => 'something wrong'
            ], 500);
        }
        return response()->json([
            'success' => true,
            'message' => 'deleted succefully'
        ], 204);
    }
}
