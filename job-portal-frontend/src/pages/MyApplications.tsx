import React from 'react';
import { useGetMyApplicationsQuery, useWithdrawApplicationMutation } from '../features/applications/applicationApi';
import Loader from '../components/Loader';
import { ApplicationCard } from '../components/ApplicationCard';

const MyApplications: React.FC = () => {
  const { data, isLoading, refetch } = useGetMyApplicationsQuery();
  const [withdraw] = useWithdrawApplicationMutation();

  const handleWithdraw = async (id: number) => {
    if (confirm('Withdraw your application?')) {
      await withdraw(id);
      refetch();
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Applications</h1>
      {data?.data.length === 0 ? (
        <p className="text-gray-500">You haven't applied to any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {data?.data.map((app) => (
            <div key={app.id} className="relative">
              <ApplicationCard application={app} showJob />
              <button
                onClick={() => handleWithdraw(app.id)}
                className="mt-2 text-red-600 text-sm hover:underline"
              >
                Withdraw
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;