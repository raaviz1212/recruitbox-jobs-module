import { useNavigate } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { BriefcaseIcon } from '@heroicons/react/24/solid';

export interface Job {
  id: number;
  title: string;
  client: string;
  industry: string;
  location: {
    city: string;
    country: string;
  };
  headCount: number;
  jobManager: {
    name: string;
    email: string;
  };
  status: string;
  postedDate: string;
}

interface JobsTableProps {
  jobs: Job[];
  selectedJobs: number[];
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectJob: (id: number) => void;
  onSort: (field: string) => void;
}

export default function JobsTable({
  jobs,
  selectedJobs,
  onSelectAll,
  onSelectJob,
  onSort
}: JobsTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (jobId: number) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <table className="min-w-full">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="pb-3 text-left">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              onChange={onSelectAll}
              checked={jobs.length > 0 && selectedJobs.length === jobs.length}
            />
          </th>
          {['Job Title', 'Client Name', 'Industry', 'Location', 'Head Count', 'Job Manager', 'Actions'].map((header) => (
            <th
              key={header}
              className="pb-3 text-left text-sm font-medium text-gray-500 uppercase cursor-pointer"
              onClick={() => onSort(header.toLowerCase().replace(' ', '_'))}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr 
            key={job.id} 
            className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleRowClick(job.id)}
          >
            <td className="py-4" onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={selectedJobs.includes(job.id)}
                onChange={() => onSelectJob(job.id)}
              />
            </td>
            <td className="py-4">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded">
                  <BriefcaseIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{job.title}</div>
                  <div className="text-sm text-gray-500">{job.status}</div>
                </div>
              </div>
            </td>
            <td className="py-4 text-gray-500">{job.client}</td>
            <td className="py-4 text-gray-500">{job.industry}</td>
            <td className="py-4 text-gray-500">
              {job.location.city}, {job.location.country}
            </td>
            <td className="py-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {job.headCount}
              </span>
            </td>
            <td className="py-4">
              <div className="text-sm">
                <div className="font-medium text-gray-900">{job.jobManager.name}</div>
                <div className="text-gray-500">{job.jobManager.email}</div>
              </div>
            </td>
            <td className="py-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-gray-500">
                  <PencilSquareIcon className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-500">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}