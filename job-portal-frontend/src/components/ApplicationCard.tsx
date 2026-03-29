import React from 'react';
import type { Application } from '../types';
import { StatusBadge } from './StatusBadge';

interface ApplicationCardProps {
  application: Application;
  showJob?: boolean;
  onStatusChange?: (status: string) => void;
}

export const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, showJob = false, onStatusChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {showJob && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{application.job.title}</h3>
          <p className="text-gray-600">{application.job.company} - {application.job.location}</p>
        </div>
      )}
      {application.candidate && (
        <div className="mb-3">
          <span className="font-medium">Candidate:</span> {application.candidate?.name}
        </div>
      )}
      {application.cover_letter && (
        <div className="mb-3">
          <span className="font-medium">Cover Letter:</span>
          {application.cover_letter.startsWith('http') ? (
            <a
              href={application.cover_letter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block mt-1"
            >
              View PDF
            </a>
          ) : (
            <p className="text-gray-700 mt-1">{application.cover_letter}</p>
          )}
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <span className="font-medium">Status:</span>{' '}
          <StatusBadge status={application.status} />
        </div>
        {onStatusChange && (
          <select
            value={application?.status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        )}
      </div>
    </div>
  );
};