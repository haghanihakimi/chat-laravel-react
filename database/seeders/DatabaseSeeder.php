<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Model\User;
use App\Model\Contact;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory()->create([
            'first_name' => 'Admin',
            'surname' => 'User',
            'username' => 'admin',
            'email' => 'admin@email.com',
            'email_verified_at' => now(),
            'password' => Hash::make("password"),
            'gender' => 'male',
        ]);
        for ($i = 0;$i < 10;$i++) {
            \App\Models\User::factory(10)->create();
        }
        for ($i = 0;$i < 10;$i++) {
            \App\Models\Contact::factory(10)->create();
        }
    }
}
