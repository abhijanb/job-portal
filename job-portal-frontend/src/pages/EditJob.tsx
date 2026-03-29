import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useGetJobQuery, useUpdateJobMutation } from '../features/jobs/jobApi';
import Loader from '../components/Loader';

type JobFormData = {
  title: string;
  description: string;
  location: string;
  salary: number;
  company: string;
};

const EditJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: jobData, isLoading: isLoadingJob } = useGetJobQuery(Number(id));
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<JobFormData>();

  useEffect(() => {
    if (jobData?.data) {
      reset({
        title: jobData.data.title,
        description: jobData.data.description,
        location: jobData.data.location,
        salary: jobData.data.salary || 0,
        company: jobData.data.company,
      });
    }
  }, [jobData, reset]);

  const onSubmit = async (data: JobFormData) => {
    try {
      await updateJob({ id: Number(id), data }).unwrap();
      alert('Job updated successfully');
      navigate('/my-jobs');
    } catch (error) {
      alert('Failed to update job');
    }
  };

  if (isLoadingJob) return <Loader />;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Job Title</label>
          <input {...register('title', { required: 'Title is required' })} className="w-full border rounded p-2" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Company</label>
          <input {...register('company', { required: 'Company is required' })} className="w-full border rounded p-2" />
          {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input {...register('location', { required: 'Location is required' })} className="w-full border rounded p-2" />
          {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Salary (optional)</label>
          <input type="number" {...register('salary', { valueAsNumber: true })} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea {...register('description', { required: 'Description is required' })} rows={6} className="w-full border rounded p-2" />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <button type="submit" disabled={isUpdating} className="w-full bg-blue-600 text-white py-2 rounded">
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditJob;