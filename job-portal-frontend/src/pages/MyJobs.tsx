import React from 'react';
import { useGetMyJobsQuery, useDeleteJobMutation } from '../features/jobs/jobApi';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { Edit, Trash2, Eye } from 'lucide-react';

const MyJobs: React.FC = () => {
  const { data, isLoading, refetch } = useGetMyJobsQuery();
  const [deleteJob] = useDeleteJobMutation();

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this job?')) {
      await deleteJob(id);
      refetch();
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Posted Jobs</h1>
      {data?.data.length === 0 ? (
        <p className="text-gray-500">You haven't posted any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {data?.data.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-600">{job.company} - {job.location}</p>
                <p className="text-sm text-gray-500">Applications: {job.applications_count || 0}</p>
              </div>
              <div className="flex space-x-2">
                <Link to={`/jobs/${job.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                  <Eye size={18} />
                </Link>
                <Link to={`/jobs/edit/${job.id}`} className="p-2 text-yellow-600 hover:bg-yellow-50 rounded">
                  <Edit size={18} />
                </Link>
                <button onClick={() => handleDelete(job.id)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;