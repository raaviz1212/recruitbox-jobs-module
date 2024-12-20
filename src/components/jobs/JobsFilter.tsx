import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FunnelIcon } from '@heroicons/react/24/outline';

const filters = {
  status: ['All Status', 'Active', 'On Hold', 'Placement Made', 'Lost'],
  country: ['All Countries', 'Australia', 'United States', 'United Kingdom', 'Canada'],
  city: ['All Cities', 'Sydney', 'Melbourne', 'Brisbane', 'Perth'],
  industry: ['All Industries', 'Technology', 'Finance', 'Healthcare', 'Education'],
  salary: {
    min: '',
    max: ''
  },
  postedDate: {
    start: '',
    end: ''
  }
};

export default function JobsFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 ${
          isOpen ? 'border-indigo-600 text-indigo-600' : 'border-gray-300 text-gray-700'
        }`}
      >
        <FunnelIcon className="h-5 w-5" />
        Filter
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-30 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white rounded-lg shadow-lg p-6 z-20">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filter Jobs</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  {filters.status.map(option => (
                    <option key={option} value={option === 'All Status' ? '' : option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Industry</label>
                <select className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  {filters.industry.map(option => (
                    <option key={option} value={option === 'All Industries' ? '' : option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <select className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  {filters.country.map(option => (
                    <option key={option} value={option === 'All Countries' ? '' : option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <select className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                  {filters.city.map(option => (
                    <option key={option} value={option === 'All Cities' ? '' : option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Posted Date Range</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}