import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetJobApplicationsQuery, useUpdateApplicationStatusMutation } from '../features/applications/applicationApi';
import Loader from '../components/Loader';
import { ApplicationCard } from '../components/ApplicationCard';

const EmployerApplications: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { data, isLoading, refetch } = useGetJobApplicationsQuery(Number(jobId));
  const [updateStatus] = useUpdateApplicationStatusMutation();

  const handleStatusChange = async (applicationId: number, newStatus: string) => {
    await updateStatus({ applicationId, status: newStatus as any });
    refetch();
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Applications for this Job</h1>
      {data?.data.length === 0 ? (
        <p className="text-gray-500">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {data?.data.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onStatusChange={(status) => handleStatusChange(app.id, status)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerApplications;