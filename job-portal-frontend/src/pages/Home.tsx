import React, { useState } from 'react';
import { useGetJobsQuery } from '../features/jobs/jobApi';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';
import { Search, MapPin } from 'lucide-react';

const Home: React.FC = () => {
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    min_salary: '',
    max_salary: '',
  });
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useGetJobsQuery({
    title: filters.title || undefined,
    location: filters.location || undefined,
    min_salary: filters.min_salary ? Number(filters.min_salary) : undefined,
    max_salary: filters.max_salary ? Number(filters.max_salary) : undefined,
    page,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-2xl font-bold mb-4">Find Your Dream Job</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              name="title"
              placeholder="Job title"
              value={filters.title}
              onChange={handleFilterChange}
              className="pl-10 w-full border rounded-md p-2"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={filters.location}
              onChange={handleFilterChange}
              className="pl-10 w-full border rounded-md p-2"
            />
          </div>
          <input
            type="number"
            name="min_salary"
            placeholder="Min Salary"
            value={filters.min_salary}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          />
          <input
            type="number"
            name="max_salary"
            placeholder="Max Salary"
            value={filters.max_salary}
            onChange={handleFilterChange}
            className="border rounded-md p-2"
          />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {data?.meta && data.meta.last_page > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {data.meta.last_page}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.meta.last_page, p + 1))}
                disabled={page === data.meta.last_page}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
          {isFetching && <Loader />}
        </>
      )}
    </div>
  );
};

export default Home;