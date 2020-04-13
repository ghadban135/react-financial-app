<?php
namespace App\Http\Controllers;
use App\Transaction;
use App\Category;
use App\Currency;
use App\Http\Requests\TransactionRequest;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
        public function transactionPercentage(Request $request)
       {
        $userId = auth()->user()->id;
        $transactions = Transaction::where('users_id', $userId)
        ->with('category')
        ->get();
        $currencyId = auth()->user()->currencies_id;
        $currencyData = Currency::where('id', $currencyId)->first();
         foreach ($transactions as $transaction)
                $transaction->amount*=$currencyData->code;
        $total = 0;
        $totalIncomes = 0;
        $totalExpenses = 0;
        $result=[];
        $month = $request->month;
        $year = $request->year;
        $myDate = date('Y-m',strtotime($year."-".$month."-1"));
            foreach($transactions as $transaction){
                $startDate=date('Y-m',strtotime($transaction->start_date));
                if (!$transaction->end_date)
                    $endDate = null;
                    else
                    $endDate=date('Y-m',strtotime($transaction->end_date));
                if((($startDate<=$myDate)&&($endDate>=$myDate))
                  ||(($startDate==$myDate)))
                $total+=$transaction->amount;
            }
            foreach($transactions as $transaction){
                $startDate=date('Y-m',strtotime($transaction->start_date));
                if (!$transaction->end_date)
                    $endDate = null;
                    else
                    $endDate=date('Y-m',strtotime($transaction->end_date));
                if((($startDate<=$myDate)&&($endDate>=$myDate))
                  ||(($startDate==$myDate))){
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
                if($totalIncomes>=$totalExpenses){
                    $incomeResult=
                        ['title' => 'free',
                        'amount' => $totalIncomes-$totalExpenses,
                        // 'percentage' => 100-$totalExpenses*100/$totalIncomes,
                        // comment percentage because we are not used and some case =0
                        ]
                    ;
                    $expensResult=
                        ['title' => 'Expenses',
                        'amount' => $totalExpenses,
                        // 'percentage' => $totalExpenses*100/$totalIncomes,
                        ]
                    ;
                 } else if($totalIncomes<$totalExpenses){
                    $incomeResult=
                        ['title' => 'Incomes',
                        'amount' => $totalIncomes,
                        // 'percentage' => $totalIncomes*100/$totalExpenses,
                        ]
                    ;
                    $expensResult=
                        ['title' => 'cost overruns',
                        'amount' => $totalExpenses-$totalIncomes,
                        // 'percentage' => 100-$totalIncomes*100/$totalExpenses,
                    ];
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
            public function transactionDashboard(Request $request)
       {
        $userId = auth()->user()->id;
        $transactions = Transaction::where('users_id', $userId)
        ->with('category')
        ->get();
        $currencyId = auth()->user()->currencies_id;
        $currencyData = Currency::where('id', $currencyId)->first();
        foreach ($transactions as $transaction)
                $transaction->amount*=$currencyData->code;
        $total = 0;
        $totalIncomes = 0;
        $totalExpenses = 0;
        $result=[];
        $month = $request->month;
        $year = $request->year;
        $myDate = date('Y-m',strtotime($year."-".$month."-1"));
        $max=0;
        foreach ($transactions as $transaction)
            if ($max<$transaction->amount&&$transaction->type=="expense")
            $max=$transaction->amount;
            $mostSpent=$max;
            foreach ($transactions as $transaction)
            if($transaction->amount==$max&&$transaction->type=="expense")
            $mostSpent=$transaction->title;
            foreach($transactions as $transaction){
                $startDate=date('Y-m',strtotime($transaction->start_date));
                if (!$transaction->end_date)
                    $endDate = null;
                    else
                    $endDate=date('Y-m',strtotime($transaction->end_date));
                if((($startDate<=$myDate)&&($endDate>=$myDate))
                  ||(($startDate==$myDate)))
                $total+=$transaction->amount;
            }
            foreach($transactions as $transaction){
                $startDate=date('Y-m',strtotime($transaction->start_date));
                if (!$transaction->end_date)
                    $endDate = null;
                    else
                    $endDate=date('Y-m',strtotime($transaction->end_date));
                if((($startDate<=$myDate)&&($endDate>=$myDate))
                  ||(($startDate==$myDate))){
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
            $budget=$totalIncomes-$totalExpenses;


        if(!$transactions){
            return response()->json([
                'success' => false,
                'message' => 'No Incomes found'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'TI'=> $totalIncomes,
            'TE'=>$totalExpenses,
            'B' => $budget,
            'MS'=>$mostSpent,
            'transactions' => $result
        ], 200);
    }
    public function transactionPercentageYear(Request $request)
       { //the result is wrong in this function
        $userId = auth()->user()->id;
        $transactions = Transaction::where('users_id', $userId)
        ->with('category')
        ->get();
        $currencyId = auth()->user()->currencies_id;
        $currencyData = Currency::where('id', $currencyId)->first();
        foreach ($transactions as $transaction)
                $transaction->amount*=$currencyData->code;
        $total = 0;
        $totalIncomes = 0;
        $totalExpenses = 0;
        $result=[];
        $year = $request->year;
        $myDate = $year."-1-1";
        $myDateLastMonth = $year."-12-31";
        foreach ($transactions as $transaction)
            {
                if(date('yy',strtotime($transaction->start_date))
                <=date('yy',strtotime($myDate))
                &&(date('yy',strtotime($transaction->end_date))
                >=date('yy',strtotime($myDate)))
                  ||  ((date('yy',strtotime($transaction->start_date))
                  ==date('yy',strtotime($myDate)))
                    &&($transaction->end_date==null))){
                    if(date('yy',strtotime($transaction->start_date))
                    ==date('yy',strtotime($myDate)))
                    $myStartDate = $transaction->start_date;
                    else
                    $myStartDate = $myDate;
                    if(date('yy',strtotime($transaction->end_date))
                    ==date('yy',strtotime($myDate)))
                    $myEndDate = $transaction->end_date;
                    else
                    $myEndDate = $myDateLastMonth;
                    $subDate=abs(strtotime($myEndDate)
                    -strtotime($myStartDate));
                    $years = floor($subDate / (365*60*60*24));
                    $months = floor(($subDate - $years * 365*60*60*24)
                    / (30*60*60*24));
                        $x=$transaction->amount;
                        if(!($transaction->end_date)==null)
                        $transaction->amount*=($months+$years*12);
                       if($transaction->type=="income")
                      $totalIncomes+=$transaction->amount;
                      else
                      $totalExpenses+=$transaction->amount;
                    $total+=$transaction->amount;
            }
        }
            foreach ($transactions as $transaction)
            {
               if(date('yy',strtotime($transaction->start_date))
                <=date('yy',strtotime($myDate))
                &&(date('yy',strtotime($transaction->end_date))
                >=date('yy',strtotime($myDate)))
                  ||  ((date('yy',strtotime($transaction->start_date))
                  ==date('yy',strtotime($myDate)))
                    &&($transaction->end_date==null))){

                    $item = (($transaction->amount/$total)*100);
                      $result[]=[
                        'title' => $transaction->title,
                        'amount' => $transaction->amount,
                        'type' => $transaction->type,
                        'percentage' => $item,
                        'category' => $transaction->category->name
                    ];
                }
            }
                if($totalIncomes>=$totalExpenses){
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
    public function barChartIncome(Request $request)
       {
        $userId = auth()->user()->id;
        $transactions = Transaction::where('users_id', $userId)
        ->where('type', 'income')
        ->get();
        $currencyId = auth()->user()->currencies_id;
        $currencyData = Currency::where('id', $currencyId)->first();
        foreach ($transactions as $transaction)
                $transaction->amount*=$currencyData->code;
        $year=$request->year;
        $result=[];
        for($i=1;$i<=12;$i++)
        {
            $countOfMonth=0;

            $myDate = date('Y-m',strtotime($year.'-'.$i.'-1'));
            foreach($transactions as $transaction){
                $startDate=date('Y-m',strtotime($transaction->start_date));
                if (!$transaction->end_date)
                    $endDate = null;
                    else
                    $endDate=date('Y-m',strtotime($transaction->end_date));
                if((($startDate<=$myDate)&&($endDate>=$myDate))
                  ||($startDate==$myDate)){
                        $countOfMonth+=$transaction->amount;
                    }}
            $result[]=$countOfMonth;
            }
                    if(!$transactions){
            return response()->json([
                'success' => false,
                'message' => 'No Incomes found'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'transactions' => $result
        ], 200);
       }
       public function barChartExpense(Request $request)
       {
        $userId = auth()->user()->id;
        $transactions = Transaction::where('users_id', $userId)
        ->where('type', '<>','income')
        ->get();
        $currencyId = auth()->user()->currencies_id;
        $currencyData = Currency::where('id', $currencyId)->first();
        foreach ($transactions as $transaction)
                $transaction->amount*=$currencyData->code;
        $year=$request->year;
        $result=[];
        for($i=1;$i<=12;$i++)
        {
            $countOfMonth=0;

            $myDate = date('Y-m',strtotime($year.'-'.$i.'-1'));
            foreach($transactions as $transaction){
                $startDate=date('Y-m',strtotime($transaction->start_date));
                if (!$transaction->end_date)
                    $endDate = null;
                    else
                    $endDate=date('Y-m',strtotime($transaction->end_date));
                if((($startDate<=$myDate)&&($endDate>=$myDate))
                  ||($startDate==$myDate)){
                        $countOfMonth+=$transaction->amount;
                    }}
            $result[]=$countOfMonth;
            }
                    if(!$transactions){
            return response()->json([
                'success' => false,
                'message' => 'No Incomes found'
            ], 500);
        }

        return response()->json([
            'success' => true,
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
        $currencyId = auth()->user()->currencies_id;
        $currencyData = Currency::where('id', $currencyId)->first();
        foreach ($transactions as $transaction)
                $transaction->amount*=$currencyData->code;
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
        $currencyId = auth()->user()->currencies_id;
        $currencyData = Currency::where('id', $currencyId)->first();
        foreach ($transactions as $transaction)
                $transaction->amount*=$currencyData->code;
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
        // ->with('category')
        ->get();
        $currencyId = auth()->user()->currencies_id;
        $currencyData = Currency::where('id', $currencyId)->first();
        foreach ($transactions as $transaction)
                $transaction->amount*=$currencyData->code;
        if(!$transactions){
            return response()->json([
                'success' => false,
                'message' => 'No Saving Plans found'
            ], 500);
        }

        return response()->json([
            'success' => true,
            'transactions' => $transactions
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
        $currencyId=auth()->user()->currencies_id;
        //$inputs = $request->all();
        $currencyId = auth()->user()->currencies_id;
        $currencyData = Currency::where('id', $currencyId)->first();
        $currencyResult = $request->amount/$currencyData->code;
        $transactions = Transaction::create([
            'title' => $request->title,
            'description' => $request->description,
            'amount' => $currencyResult,
            'categories_id' => $request->categories_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'users_id' => $userId,
            'interval' => $request->interval,
            'type' => $request->type,
            'currencies_id' => $currencyId
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
        $currencyId = auth()->user()->currencies_id;
        $currencyData = Currency::where('id', $currencyId)->first();
        $currencyResult = $request->amount/$currencyData->code;
        $transactions->update([
            'title' => $request->title,
            'description' => $request->description,
            'amount' => $currencyResult,
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
