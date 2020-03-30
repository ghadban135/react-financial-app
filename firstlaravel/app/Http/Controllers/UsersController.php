<?php

namespace App\Http\Controllers;

use App\Users;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $users = Users::all();

        if(!$users){
            return response()->json([
                'status' => 'failed',
                'message' => 'No users found'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'users' => $users
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

        $users = new Users();
        $users->fill($inputs);
        $users->save();

        return response()->json([
            'status' => 'success',
            'users' => $users
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
        $users = Users::where('id', $id)->first();

        return response()->json([
            'status' => 'success',
            'users' => $users
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
        $users = Users::where('id', $id)->first();

        $users->update($inputs);
        $users->save();

        return response()->json([
            'status' => 'success',
            'users' => $users
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
        $users = Users::where('id', $id)->delete();

        return response()->json([
            'status' => 'success',
        ], 204);
    }
}
