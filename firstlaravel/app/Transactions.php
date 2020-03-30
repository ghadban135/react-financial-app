<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{public $timestamps=false;

     protected $table = 'transactions';

    protected $fillable = [
        'title', 'description','amount','categories_id','start_date','end_date','users_id','interval','type','currencies_id'
    ];
}
