<?php
namespace App\Http\Controllers;

use App\Http\Requests\JobRequest;
use App\Http\Resources\JobResource;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::with('employer');

        if ($request->filled('title')) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }
        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }
        if ($request->filled('min_salary')) {
            $query->where('salary', '>=', $request->min_salary);
        }
        if ($request->filled('max_salary')) {
            $query->where('salary', '<=', $request->max_salary);
        }

        $jobs = $query->latest()->paginate(15);

        return response()->json([
            'success' => true,
            'data' => JobResource::collection($jobs),
            'meta' => [
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
                'per_page' => $jobs->perPage(),
                'total' => $jobs->total(),
            ],
        ]);
    }

    public function show(Job $job)
    {
        return response()->json([
            'success' => true,
            'data' => new JobResource($job->load('employer')),
        ]);
    }

    public function store(JobRequest $request)
    {
        $job = $request->user()->jobs()->create($request->validated());

        return response()->json([
            'success' => true,
            'data' => new JobResource($job),
            'message' => 'Job created successfully',
        ], 201);
    }

public function update(JobRequest $request, Job $job)
{
    if ($request->user()->id !== $job->user_id) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized to update this job.',
        ], 403);
    }
    
    $job->update($request->validated());

    return response()->json([
        'success' => true,
        'data' => new JobResource($job),
        'message' => 'Job updated successfully',
    ]);
}

public function destroy(Job $job)
{
    if (request()->user()->id !== $job->user_id) {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized to delete this job.',
        ], 403);
    }
    
    $job->delete();

    return response()->json([
        'success' => true,
        'message' => 'Job deleted successfully',
    ]);
}

    public function myJobs(Request $request)
    {
        $jobs = $request->user()->jobs()->latest()->paginate(15);

        return response()->json([
            'success' => true,
            'data' => JobResource::collection($jobs),
            'meta' => [
                'current_page' => $jobs->currentPage(),
                'last_page' => $jobs->lastPage(),
                'per_page' => $jobs->perPage(),
                'total' => $jobs->total(),
            ],
        ]);
    }
}