import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetJobQuery } from '../features/jobs/jobApi';
import { useApplyToJobMutation } from '../features/applications/applicationApi';
import { useAppSelector } from '../app/hooks';
import Loader from '../components/Loader';
import { MapPin, DollarSign, Building, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { data: jobData, isLoading, refetch } = useGetJobQuery(Number(id));
  const [applyToJob] = useApplyToJobMutation();
  const [showApplyForm, setShowApplyForm] = useState(false);
  const { register, handleSubmit, reset } = useForm<{ cover_letter: FileList }>();

  const job = jobData?.data;

  const onSubmit = async (data: { cover_letter: FileList }) => {
    try {
      const formData = new FormData();
      if (data.cover_letter[0]) {
        formData.append('cover_letter', data.cover_letter[0]);
      }
      await applyToJob({ jobId: Number(id), data: formData }).unwrap();
      setShowApplyForm(false);
      reset();
      refetch();
    } catch (error: any) {
      alert(error.data?.message || 'Failed to apply.');
    }
  };

  if (isLoading) return <Loader />;
  if (!job) return <div className="text-center py-8">Job not found</div>;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <div className="space-y-3 text-gray-600 mb-6">
        <div className="flex items-center space-x-2">
          <Building size={18} />
          <span className="font-medium">{job.company}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin size={18} />
          <span>{job.location}</span>
        </div>
        {job.salary && (
          <div className="flex items-center space-x-2">
            <DollarSign size={18} />
            <span>${job.salary.toLocaleString()}</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Calendar size={18} />
          <span>Posted on {new Date(job.created_at).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
      </div>
      {user && user.role === 'candidate' && (
        job.has_applied ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-md font-medium">
            You have already applied for this position.
          </div>
        ) : !showApplyForm ? (
          <button
            onClick={() => setShowApplyForm(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Apply Now
          </button>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (Optional)</label>
              <input type='file' accept='.pdf'
                {...register('cover_letter')}
                className="w-full border rounded-md p-2"
                placeholder="Tell us why you're a good fit..."
              />
            </div>
            <div className="space-x-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                Submit Application
              </button>
              <button
                type="button"
                onClick={() => setShowApplyForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )
      )}
      {user?.role === 'employer' && user.id === job.employer.id && (
        <div className="mt-6 space-x-3">
          <button
            onClick={() => navigate(`/jobs/edit/${job.id}`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Edit Job
          </button>
          <button
            onClick={() => navigate(`/employer/jobs/${job.id}/applications`)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            View Applications
          </button>
        </div>
      )}
    </div>
  );
};

export default JobDetails;