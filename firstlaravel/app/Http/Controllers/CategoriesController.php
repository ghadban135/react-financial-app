<?php

namespace App\Http\Controllers;

use App\Categories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = Categories::all();

        if(!$result){
            return response()->json([
                'success' => false,
                'message' => 'No categories found'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'categories' => $result,
        ], 200);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         $inputs = $request->all();
        $result = new Categories();
        $result->fill($inputs);
        $result->save();

        return response()->json([
            'success' => true,
            'categories' => $result
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
         $result = Categories::select('id','name')
         ->where('users_id', $id)->get();

        if(!sizeof($result)){
            return response()->json([
                'success' => true,
                'categories' => 'No categories found for this user'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'categories' => $result,
        ], 200);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $inputs = $request->all();
        $result = Categories::where('id', $id)->first();

        $result->update($inputs);
        $result->save();

        return response()->json([
            'success' => true,
            'categories' => $result
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Categories::where('id', $id)->delete();

        return response()->json([
            'success' => true,
        ], 204);
    }
}
