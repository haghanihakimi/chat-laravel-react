<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MediaForm>
 */
class MediaFormFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user_id = fake()->unique()->numberBetween(1, User::count());

        return [
            'user_id' => $user_id,
            'message_id' => NULL,
            'media_type' => 'profile',
            'media_path' => fake()->imageUrl($width=400, $height=400),
            'is_active' => true,
        ];
    }
}
