<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{

     protected $table = 'transactions';

    protected $fillable = [
        'title', 'description','amount','categories_id','start_date','end_date','users_id','interval','type','currencies_id'
    ];
            public function category()
            {
            return $this->hasOne(Category::class, 'id', 'categories_id');
            }
}
