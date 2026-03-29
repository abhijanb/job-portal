import React from 'react';
import { Link } from 'react-router-dom';
import type { Job } from '../types';
import { MapPin, DollarSign, Building } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <Link to={`/jobs/${job.id}`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center space-x-2">
            <Building size={16} />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
          {job.salary && (
            <div className="flex items-center space-x-2">
              <DollarSign size={16} />
              <span>${job.salary.toLocaleString()}</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default JobCard;