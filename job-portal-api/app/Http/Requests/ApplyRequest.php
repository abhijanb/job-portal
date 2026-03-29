<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ApplyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isCandidate();
    }

    public function rules(): array
    {
        return [
            'cover_letter' => 'nullable|file|mimes:pdf|max:2048',
        ];
    }
}