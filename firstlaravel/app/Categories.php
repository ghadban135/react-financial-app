<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    public $timestamps = false;
    protected $table = 'categories';

    protected $fillable = [
        'name', 'users_id'
    ];
}
