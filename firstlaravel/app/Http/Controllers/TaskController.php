<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {

        //  $test = DB::select('select * from tasks where name = ?', ['awertt']);
        //  DB::table('tasks')->where('name', '=','awertt')->dd();

// $test = DB::table('tasks')->where('name', 'awertt')->value('description');

// $test = Task::orderBy('name', 'desc')->get();

// $test = Task::select('name', 'description as desc')
//                 ->where('name', 'awertt')->first();

        $tasks = Task::all();

        if(!$tasks){
            return response()->json([
                'status' => 'failed',
                'message' => 'No tasks found'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'tasks' => $tasks,
            // 'test'=> $test
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
    //     DB::table('tasks')->insert(
    // ['name' => 'johnexamplem', 'description' => 'knk']
    // );

        $inputs = $request->all();
// dd($inputs);
        $task = new Task();
        // $task->name=$inputs['name'];
        // $task->description=$inputs['description'];
        $task->fill($inputs);
        $task->save();

        return response()->json([
            'status' => 'success',
            'task' => $task
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
        $task = Task::where('id', $id)->first();
                //  $task = Task::find($id);
        return response()->json([
            'status' => 'success',
            'task' => $task
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
        $task = Task::where('id', $id)->first();

        $task->update($inputs);
        $task->save();

        return response()->json([
            'status' => 'success',
            'task' => $task
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
         Task::where('id', $id)->delete();

        return response()->json([
            'status' => 'success',
        ], 204);
    }
}
