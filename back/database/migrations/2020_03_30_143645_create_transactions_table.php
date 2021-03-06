<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->increments('id');
		$table->text('title');
		$table->string('description',250)->nullable();
		$table->double('amount', 8, 2);
		$table->integer('categories_id');
		$table->datetime('start_date');
		$table->datetime('end_date')->nullable();
		$table->integer('users_id');
		$table->string('interval',20)->nullable();
		$table->string('type',20);
		$table->integer('currencies_id');
	    $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transactions');
    }
}
