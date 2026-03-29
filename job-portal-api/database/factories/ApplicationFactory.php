<?php
// database/factories/ApplicationFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ApplicationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'cover_letter' => fake()->paragraph(),
            'status' => fake()->randomElement(['pending', 'reviewed', 'accepted', 'rejected']),
            'created_at' => fake()->dateTimeBetween('-1 month', 'now'),
        ];
    }
}