<?php
// routes/api.php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ApplicationController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{job}', [JobController::class, 'show']);

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Profile
    Route::get('/user', [ProfileController::class, 'show']);
    Route::put('/user', [ProfileController::class, 'update']);

    // Jobs (read-only for all users)

    // Employer only job management
    Route::post('/jobs', [JobController::class, 'store']);
    Route::put('/jobs/{job}', [JobController::class, 'update']);
    Route::delete('/jobs/{job}', [JobController::class, 'destroy']);
    Route::get('/my-jobs', [JobController::class, 'myJobs']);

    // Applications - Candidate
    Route::post('/jobs/{job}/apply', [ApplicationController::class, 'apply']);
    Route::delete('/applications/{application}', [ApplicationController::class, 'withdraw']);
    Route::get('/my-applications', [ApplicationController::class, 'myApplications']);

    // Applications - Employer
    Route::get('/employer/jobs/{job}/applications', [ApplicationController::class, 'jobApplications']);
    Route::patch('/applications/{application}/status', [ApplicationController::class, 'updateStatus']);

    Route::post('/logout', [AuthController::class, 'logout']);
});