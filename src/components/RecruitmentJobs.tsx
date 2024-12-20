import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import JobsFilter from './jobs/JobsFilter';
import JobsTable, { Job } from './jobs/JobsTable';
import BulkActions from './jobs/BulkActions';

const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    client: 'Eleven Dev Private Limited',
    industry: 'Technology',
    location: {
      city: 'Sydney',
      country: 'Australia'
    },
    headCount: 3,
    jobManager: {
      name: 'Ali R Zain',
      email: 'liam12@gmail.com'
    },
    status: 'Active',
    postedDate: '2023-11-20'
  },
  {
    id: 2,
    title: 'Product Manager',
    client: 'Global Tech Solutions',
    industry: 'Technology',
    location: {
      city: 'Melbourne',
      country: 'Australia'
    },
    headCount: 1,
    jobManager: {
      name: 'Sarah Chen',
      email: 'sarah.c@example.com'
    },
    status: 'On Hold',
    postedDate: '2023-11-18'
  },
  {
    id: 3,
    title: 'Senior Data Scientist',
    client: 'FinTech Innovations',
    industry: 'Finance',
    location: {
      city: 'Brisbane',
      country: 'Australia'
    },
    headCount: 2,
    jobManager: {
      name: 'Michael Scott',
      email: 'mscott@example.com'
    },
    status: 'Active',
    postedDate: '2023-11-15'
  }
];

export default function RecruitmentJobs() {
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedJobs(jobs.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (jobId: number) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for jobs:`, selectedJobs);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Jobs</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your recruitment jobs</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          + Add Job
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <JobsFilter />
            <BulkActions
              onAction={handleBulkAction}
              disabled={selectedJobs.length === 0}
            />
          </div>

          <JobsTable
            jobs={jobs}
            selectedJobs={selectedJobs}
            onSelectAll={handleSelectAll}
            onSelectJob={handleSelectJob}
            onSort={handleSort}
          />

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
            <div className="text-sm text-gray-500">
              Showing 1 to {jobs.length} of {jobs.length} results
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}