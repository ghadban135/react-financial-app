<?php
namespace App\Http\Controllers;
use App\Transaction;
use App\Category;
use App\Http\Requests\TransactionRequest;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
        public function transactionPercentage()
       {
        $userId = auth()->user()->id;
        $transactions = Transaction::where('users_id', $userId)
        ->with('category')
        ->get();
        $total = 0;
        $totalIncomes = 0;
        $totalExpenses = 0;
        $result=[];
        // $test=abs(strtotime("2020-12-5"))
        // -date(strtotime("2020-6-4"));
        // $years = floor($test / (365*60*60*24));  
        // $months = floor(($test - $years * 365*60*60*24) 
        // / (30*60*60*24));

        foreach ($transactions as $transaction)
            {
                if(date('m',strtotime($transaction->start_date))<=date('m')
                &&(date('m',strtotime($transaction->end_date))>=date('m')
                    ||$transaction->end_date==null))
                $total+=$transaction->amount;
            }
            foreach ($transactions as $transaction)
            {
               if(date('yy-m-d',strtotime($transaction->start_date))<date('yy-m-d')
                &&(date('yy-m-d',strtotime($transaction->end_date))>date('yy-m-d')
                    ||$transaction->end_date==null)){
                        $x=$transaction->amount;
                      $item = (($x/$total)*100);
                       if($transaction->type=="income")
                      $totalIncomes+=$x;
                      else
                      $totalExpenses+=$x;
                      $result[]=[
                        'title' => $transaction->title,
                        'amount' => $transaction->amount,
                        'type' => $transaction->type,
                        'percentage' => $item,
                        'category' => $transaction->category->name
                    ];
                }
            }
                if($totalIncomes>$totalExpenses){
                    $incomeResult=
                        ['title' => 'free',
                        'amount' => $totalIncomes-$totalExpenses,
                        'percentage' => 100-$totalExpenses*100/$totalIncomes,]
                    ;
                    $expensResult=
                        ['title' => 'Expenses',
                        'amount' => $totalExpenses,
                        'percentage' => $totalExpenses*100/$totalIncomes,]
                    ;
                 } else if($totalIncomes<$totalExpenses){
                    $incomeResult=
                        ['title' => 'Incomes',
                        'amount' => $totalIncomes,
                        'percentage' => $totalIncomes*100/$totalExpenses,]
                    ;
                    $expensResult=
                        ['title' => 'cost overruns',
                        'amount' => $totalExpenses-$totalIncomes,
                        'percentage' => 100-$totalIncomes*100/$totalExpenses,];
                }else{
                    $incomeResult=
                        ['title' => 'Incomes',
                        'amount' => $totalIncomes,
                        'percentage' => 50,]
                    ;
                    $expensResult=
                        ['title' => 'Expenses',
                        'amount' => $totalExpenses,
                        'percentage' => 50,];
                }

            

        if(!$transactions){
            return response()->json([
                'success' => false,
                'message' => 'No Incomes found'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'incomes'=> $incomeResult,
            'expenses'=>$expensResult,
            'transactions' => $result
        ], 200);
    }
    public function incomeIndex()
       {
        $userId = auth()->user()->id;
        $transactions = Transaction::where('users_id', $userId)
        ->where('type', 'income')
        ->with('category')
        ->get();

        if(!$transactions){
            return response()->json([
                'success' => false,
                'message' => 'No Incomes found'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'transactions' => $transactions
        ], 200);
    }
        public function expenseIndex()
       {
        $userId = auth()->user()->id;
        $transactions = Transaction::where('users_id', $userId)
        ->where('type', 'expense')
        ->with('category')
        ->get();
        if(!$transactions){
            return response()->json([
                'success' => false,
                'message' => 'No Expenses found'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'transactions' => $transactions
        ], 200);
    }
        public function savingPlanIndex()
       {
                  $userId = auth()->user()->id;
        $transactions = Transaction::where('users_id', $userId)
        ->where('type', 'saving expense')
        ->with('category')
        ->get();

        if(!$transactions){
            return response()->json([
                'success' => false,
                'message' => 'No Saving Plans found'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'user' => $transactions
        ], 200);
    }
    // public function pieChartTest()
    //    {
    //     $transactions = Transaction::select('type', 'savingPlan')->first();

    //     return response()->json([
    //         'success' => true,
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
                'success' => false,
                'message' => 'something wrong'
            ], 500);
        }
        return response()->json([
            'success' => true,
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
            'categories_id'=>$request->categories_id,
        ]);;
        $transactions->save();
            if(!$transactions){
            return response()->json([
                'success' => false,
                'message' => 'something wrong'
            ], 500);
        }
        return response()->json([
            'success' => true,
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
