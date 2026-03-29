<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateApplicationStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() && $this->user()->isEmployer();
    }

    public function rules(): array
    {
        return [
            'status' => 'required|in:pending,reviewed,accepted,rejected',
        ];
    }
}