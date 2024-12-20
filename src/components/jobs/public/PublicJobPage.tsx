import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { BuildingOfficeIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import ApplicationForm from './ApplicationForm';

const JOB_DATA = {
  title: 'Software Engineer',
  company: 'Eleven Dev',
  location: 'Australian Capital Territory, Australia',
  salary: '2,000 USD - 5,000 USD',
  description: 'Are you a graduating student with a passion for software engineering, ready to launch your career in 2024? We invite you to be part of our dynamic Fresh Grad Program. The ideal candidate should be a divergent thinker who understands industry best practices and a team player possessing strong analytical as well as technical skills. They must be comfortable working in an agile environment and have the ability to take the wheel when necessary.',
  responsibilities: [
    'Analyze requirements',
    'Create innovative, scalable, fault-tolerant software solutions',
    'Work closely with product managers, UX designers, other developers, graphic artists, sales and marketing professionals',
    'Write and test code to ensure compatibility and stability; refine and rewrite as necessary',
    'Expand existing software to meet the changing needs'
  ],
  requirements: [
    'Bachelors Degree in Software Engineering/Information Technology/Computer Science, with expected graduation in 2024',
    'A thorough understanding of computer architecture, operating systems, and data structures',
    'Understanding of HTML, CSS, and JavaScript',
    'The ability to analyze complex technical information',
    'Comfortability designing and implementing database structures to solve real-world problems'
  ],
  tags: ['React', 'TypeScript', 'Node.js'],
  contractDetails: 'Full time',
  openDate: '2024-11-06',
};

export default function PublicJobPage() {
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-lg font-semibold text-indigo-600">Eleven Dev Careers</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Job Description */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <BuildingOfficeIcon className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{JOB_DATA.title}</h1>
                  <div className="flex items-center gap-4 text-gray-600 mt-1">
                    <div className="flex items-center gap-1">
                      <BuildingOfficeIcon className="h-4 w-4" />
                      <span>{JOB_DATA.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{JOB_DATA.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CurrencyDollarIcon className="h-4 w-4" />
                      <span>{JOB_DATA.salary}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-600">{JOB_DATA.description}</p>

                <h2 className="text-lg font-semibold mt-6 mb-3">Key Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {JOB_DATA.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h2 className="text-lg font-semibold mt-6 mb-3">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {JOB_DATA.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Job Details Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <button
                onClick={() => setIsApplicationFormOpen(true)}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Apply to This Job
              </button>

              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Employment Type</h3>
                  <p className="mt-1 text-sm text-gray-900">{JOB_DATA.contractDetails}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Posted On</h3>
                  <p className="mt-1 text-sm text-gray-900">{JOB_DATA.openDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Technologies</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {JOB_DATA.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Application Form Side Panel */}
      <ApplicationForm
        isOpen={isApplicationFormOpen}
        onClose={() => setIsApplicationFormOpen(false)}
        jobTitle={JOB_DATA.title}
      />
    </div>
  );
}