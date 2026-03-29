<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'job' => new JobResource($this->whenLoaded('job')),
            'candidate' => new UserResource($this->whenLoaded('candidate')),
            'cover_letter' => $this->cover_letter ? asset(\Illuminate\Support\Facades\Storage::url($this->cover_letter)) : null,
            'status' => $this->status,
            'applied_at' => $this->created_at,
        ];
    }
}