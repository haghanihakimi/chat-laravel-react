<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conversations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id')->constrained("chats")->onDelete('cascade');
            $table->foreignId('sender_id')->constrained("users")->onDelete('cascade');
            $table->foreignId('recipient_id')->constrained("users")->onDelete('cascade');
            $table->timestamp('seen_at')->nullable()->default(null);
            $table->foreignId('deleted_by')->nullable()->default(null)->constrained("users")->onDelete('cascade');
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
        Schema::dropIfExists('conversations');
    }
};
