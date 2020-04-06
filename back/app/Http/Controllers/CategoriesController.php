<?php

namespace App\Http\Controllers;

use App\User;
use App\Category;
use Illuminate\Http\Request;
use App\Http\Requests\CategoryRequest;
class CategoriesController extends Controller

{
    public function categoriesName()
    {
        $userId = auth()->user()->id;
        $result = User::where('id', $userId)
        ->with('categories')
        ->get();

        return response()->json([
            'success' => true,
            'user' => $result,
        ], 200);
    }
     public function index()
    {
        $userId = auth()->user()->id;
        $result = Category::where('users_id',$userId)->get();

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
    public function store(CategoryRequest $request)
    {
        $userId = auth()->user()->id;
        $result = Category::create([
            'name' => $request->name,
            'users_id' => $userId
        ]);
        if(!$result){
            return response()->json([
                'success' => false,
                'message' => 'something wrong'
            ], 500);
        }
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
         $result = Category::select('id','name')
         ->where('users_id', $id)->get();

        if(!sizeof($result)){
            return response()->json([
                'success' => false,
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
    public function update(CategoryRequest $request, $id)
    {
        $userId = auth()->user()->id;
        $result = Category::where('id', $id)->first();
        $result->update([
            'name' => $request->name,
            'users_id' => $userId,
        ]);;
        $result->save();
                    if(!$result){
            return response()->json([
                'success' => false,
                'message' => 'something wrong'
            ], 500);
        }
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
        $result=Category::where('id', $id)->delete();
                if($result == 0){
            return response()->json([
                'success' => false,
                'message' => 'something wrong'
            ], 500);
        }
        else{
            return response()->json([
            'success' => true,
            'message' => 'deleted succefully',
            'test' => $result
            ], 204);
        }

    }
}
