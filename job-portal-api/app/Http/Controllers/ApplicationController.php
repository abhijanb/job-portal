<?php
namespace App\Http\Controllers;

use App\Http\Requests\ApplyRequest;
use App\Http\Requests\UpdateApplicationStatusRequest;
use App\Http\Resources\ApplicationResource;
use App\Models\Job;
use App\Models\Application;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function apply(ApplyRequest $request, Job $job)
    {
        $existingApplication = Application::where('job_id', $job->id)
            ->where('user_id', $request->user()->id)
            ->exists();

        if ($existingApplication) {
            return response()->json([
                'success' => false,
                'message' => 'You have already applied for this job.',
            ], 400);
        }

        $coverLetterPath = null;
        if ($request->hasFile('cover_letter')) {
            $coverLetterPath = $request->file('cover_letter')->store('cover_letters', 'public');
        }

        $application = Application::create([
            'job_id' => $job->id,
            'user_id' => $request->user()->id,
            'cover_letter' => $coverLetterPath,
            'status' => 'pending',
        ]);

        return response()->json([
            'success' => true,
            'data' => new ApplicationResource($application->load('job', 'candidate')),
            'message' => 'Application submitted successfully',
        ], 201);
    }

    public function withdraw(Application $application)
    {
        if (request()->user()->id !== $application->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to withdraw this application.',
            ], 403);
        }

        $application->delete();

        return response()->json([
            'success' => true,
            'message' => 'Application withdrawn successfully',
        ]);
    }

    public function updateStatus(UpdateApplicationStatusRequest $request, Application $application)
    {
        if ($request->user()->id !== $application->job->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to update this application status.',
            ], 403);
        }

        $application->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'data' => new ApplicationResource($application->load('job', 'candidate')),
            'message' => 'Application status updated successfully',
        ]);
    }

    public function myApplications(Request $request)
    {
        $applications = $request->user()
            ->applications()
            ->with(['job.employer', 'candidate'])
            ->latest()
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => ApplicationResource::collection($applications),
            'meta' => [
                'current_page' => $applications->currentPage(),
                'last_page' => $applications->lastPage(),
                'per_page' => $applications->perPage(),
                'total' => $applications->total(),
            ],
        ]);
    }

    public function jobApplications(Request $request, Job $job)
    {
        if ($request->user()->id !== $job->user_id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized to view applications for this job.',
            ], 403);
        }

        $applications = $job->applications()
            ->with('candidate')
            ->latest()
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data' => ApplicationResource::collection($applications),
            'meta' => [
                'current_page' => $applications->currentPage(),
                'last_page' => $applications->lastPage(),
                'per_page' => $applications->perPage(),
                'total' => $applications->total(),
            ],
        ]);
    }

}