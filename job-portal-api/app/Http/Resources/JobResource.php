<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'location' => $this->location,
            'salary' => $this->salary,
            'company' => $this->company,
            'employer' => [
                'id' => $this->employer->id,
                'name' => $this->employer->name,
                'email' => $this->employer->email,
            ],
            'applications_count' => $this->when($this->applications_count, $this->applications_count),
            'has_applied' => Auth::check() && Auth::user()->isCandidate() ? $this->applications()->where('user_id', Auth::id())->exists() : false,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}