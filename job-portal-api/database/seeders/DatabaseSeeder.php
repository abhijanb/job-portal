<?php
namespace Database\Seeders;

use App\Models\User;
use App\Models\Job;
use App\Models\Application;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $employers = User::factory(2)->create([
            'role' => 'employer',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        $candidates = User::factory(3)->create([
            'role' => 'candidate',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        foreach ($employers as $employer) {
            $jobs = Job::factory(rand(2, 3))->create([
                'user_id' => $employer->id,
            ]);

            foreach ($jobs as $job) {
                $applyingCandidates = $candidates->random(rand(0, count($candidates)));
                foreach ($applyingCandidates as $candidate) {
                    Application::factory()->create([
                        'job_id' => $job->id,
                        'user_id' => $candidate->id,
                    ]);
                }
            }
        }

        User::factory()->create([
            'name' => 'Unverified User',
            'email' => 'unverified@example.com',
            'password' => Hash::make('password'),
            'role' => 'candidate',
            'email_verified_at' => null,
        ]);
    }
}