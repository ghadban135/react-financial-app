<?php

namespace App\Http\Controllers;
use App\Transactions;
use Illuminate\Http\Request;

class transactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function incomeIndex()
       {
        $transactions = Transactions::where('type', 'income')
        // ->where('transactions.categories_id','=','categories.id')
        // ->select('transactions.name','categories.name')
        ->first();

        if(!$transactions){
            return response()->json([
                'status' => 'failed',
                'message' => 'No Incomes found'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'Incomes' => $transactions
        ], 200);
    }
        public function expenseIndex()
       {
        $transactions = Transactions::where('type', 'expense')->first();

        if(!$transactions){
            return response()->json([
                'status' => 'failed',
                'message' => 'No Expenses found'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'Expenses' => $transactions
        ], 200);
    }
        public function savingPlanIndex()
       {
        $transactions = Transactions::where('type', 'savingPlan')->first();

        if(!$transactions){
            return response()->json([
                'status' => 'failed',
                'message' => 'No Saving Plans found'
            ], 500);
        }

        return response()->json([
            'status' => 'success',
            'Saving Plans' => $transactions
        ], 200);
    }        public function pieChartTest()
       {
        $transactions = Transactions::select('type', 'savingPlan')->first();

        return response()->json([
            'status' => 'success',
            'Saving Plans' => $transactions
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $inputs = $request->all();

        $transaction = new Transactions();
        $transaction->fill($inputs);
        $transaction->save();

        return response()->json([
            'status' => 'success',
            'transaction' => $transaction
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
        $transaction = Transactions::where('id', $id)->first();

        return response()->json([
            'status' => 'success',
            'transaction' => $transaction
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
    public function update(Request $request, $id)
    {
            {
        $inputs = $request->all();
        $transactions = Transactions::where('id', $id)->first();

        $transactions->update($inputs);
        $transactions->save();

        return response()->json([
            'status' => 'success',
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
        $transaction = Transactions::where('id', $id)->delete();

        return response()->json([
            'status' => 'success',
        ], 204);
    }
}
