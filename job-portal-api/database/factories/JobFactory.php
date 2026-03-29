<?php
// database/factories/JobFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->jobTitle(),
            'description' => fake()->paragraphs(3, true),
            'location' => fake()->city() . ', ' . fake()->country(),
            'salary' => fake()->numberBetween(30000, 150000),
            'company' => fake()->company(),
            'user_id' => null, // Set in seeder
        ];
    }
}