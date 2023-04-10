<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition()
    {
        $user_id = User::all()->random()->id;

        return [
            'user_id' => $user_id,
            'contact_id' => User::whereNotIn('id', [$user_id])->get()->random()->id,
            'status' => fake()->randomElement(['accepted', 'pending']),
        ];
    }
}
