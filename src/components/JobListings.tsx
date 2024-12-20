import { useState } from 'react';

const MOCK_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'New York',
    type: 'Full-time',
  },
  {
    id: 3,
    title: 'UX Designer',
    department: 'Design',
    location: 'San Francisco',
    type: 'Contract',
  },
];

export default function JobListings() {
  const [jobs] = useState(MOCK_JOBS);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {jobs.map((job) => (
          <li key={job.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{job.title}</h3>
                <div className="ml-2 flex-shrink-0 flex">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {job.type}
                  </span>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {job.department}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    {job.location}
                  </p>
                </div>
                <button className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Apply Now
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}