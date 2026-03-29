import React from 'react';
import { useForm } from 'react-hook-form';
import { useCreateJobMutation } from '../features/jobs/jobApi';
import { useNavigate } from 'react-router-dom';

type JobFormData = {
  title: string;
  description: string;
  location: string;
  salary: number;
  company: string;
};

const CreateJob: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<JobFormData>();
  const [createJob, { isLoading }] = useCreateJobMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: JobFormData) => {
    try {
      await createJob(data).unwrap();
      alert('Job posted successfully!');
      navigate('/my-jobs');
    } catch (error) {
      alert('Failed to post job');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="mt-1 w-full border rounded-md p-2"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input
            {...register('company', { required: 'Company is required' })}
            className="mt-1 w-full border rounded-md p-2"
          />
          {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            {...register('location', { required: 'Location is required' })}
            className="mt-1 w-full border rounded-md p-2"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Salary (optional)</label>
          <input
            type="number"
            {...register('salary', { valueAsNumber: true })}
            className="mt-1 w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={6}
            className="mt-1 w-full border rounded-md p-2"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default CreateJob;