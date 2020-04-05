<?php

namespace App\Http\Controllers;
use App\Transaction;
use App\Http\Requests\TransactionRequest;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function incomeIndex()
       {
           $userId = auth()->user()->id;
        $transactions = Transaction::where('type', 'income')->where('users_id', $userId)->get();

        if(!$transactions){
            return response()->json([
                'status' => false,
                'message' => 'No Incomes found'
            ], 500);
        }

        return response()->json([
            'status' => true,
            'Incomes' => $transactions
        ], 200);
    }
        public function expenseIndex()
       {
                   $userId = auth()->user()->id;
        $transactions = Transaction::where('type', 'expense')->where('users_id', $userId)->get();

        if(!$transactions){
            return response()->json([
                'status' => false,
                'message' => 'No Expenses found'
            ], 500);
        }

        return response()->json([
            'status' => true,
            'Expenses' => $transactions
        ], 200);
    }
        public function savingPlanIndex()
       {
                   $userId = auth()->user()->id;
        $transactions = Transaction::where('type', 'savingPlan')->where('users_id', $userId)->get();

        if(!$transactions){
            return response()->json([
                'status' => false,
                'message' => 'No Saving Plans found'
            ], 500);
        }

        return response()->json([
            'status' => true,
            'Saving Plans' => $transactions
        ], 200);
    }
    // public function pieChartTest()
    //    {
    //     $transactions = Transaction::select('type', 'savingPlan')->first();

    //     return response()->json([
    //         'status' => true,
    //         'Saving Plans' => $transactions
    //     ], 200);
    // }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(TransactionRequest $request)
    {
        $userId = auth()->user()->id;
        //$inputs = $request->all();

        $transactions = Transaction::create([
            'title' => $request->title,
            'description' => $request->description,
            'amount' => $request->amount,
            'categories_id' => $request->categories_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'users_id' => $userId,
            'interval' => $request->interval,
            'type' => $request->type,
            'currencies_id' => $request->currencies_id
        ]);
        // $transaction = new Transaction();
        // $transaction->fill($inputs);
        // $transaction->save();
                if(!$transactions){
            return response()->json([
                'success' => false,
                'message' => 'something wrong'
            ], 500);
        }
        return response()->json([
            'success' => true,
            'transaction' => $transactions
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $transactions = Transaction::where('id', $id)->first();
                if(!$transactions){
            return response()->json([
                'status' => false,
                'message' => 'something wrong'
            ], 500);
        }
        return response()->json([
            'status' => true,
            'transaction' => $transactions
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TransactionRequest $request, $id)
    {
            {
        $userId = auth()->user()->id;
        $transactions = Transaction::where('id', $id)->first();
        $transactions->update([
            'title' => $request->title,
            'description' => $request->description,
            'amount' => $request->amount,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'user_id' => $userId,
            'interval' => $request->interval,
            'type' => $request->type,
            'currencies_id' => $request->currencies_id,
        ]);;
        $transactions->save();
            if(!$transactions){
            return response()->json([
                'status' => false,
                'message' => 'something wrong'
            ], 500);
        }
        return response()->json([
            'status' => true,
            'transactions' => $transactions
        ], 201);
    }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $transactions = Transaction::where('id', $id)->delete();
                        if($transactions ==0){
            return response()->json([
                'status' => false,
                'message' => 'something wrong'
            ], 500);
        }
        return response()->json([
            'status' => true,
            'message' => 'deleted succefully'
        ], 204);
    }
}
