import { useParams } from 'react-router-dom';
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

// Mock data - in a real app, this would come from an API
const JOB_DATA = {
  id: 1,
  title: 'Software Engineer',
  status: 'NOT PUBLISHED',
  badges: ['NEW CANDIDATES'],
  assignedTo: 'Ali',
  company: 'Eleven Dev',
  location: 'Australian Capital Territory, Australia',
  salary: '2,000 USD - 5,000 USD',
  stats: {
    hired: 0,
    inPipeline: 2,
    dropped: 0,
  },
  tags: ['React', 'TypeScript', 'Node.js'],
};

const TABS = [
  { name: 'Candidates', count: 2, path: 'candidates' },
  { name: 'Summary', path: 'summary' },
  { name: 'Team', count: 2, path: 'team' },
  { name: 'Recommendations', path: 'recommendations' },
  { name: 'Activities', path: 'activities' },
  { name: 'Notes', path: 'notes' },
  { name: 'Attachments', path: 'attachments' },
  { name: 'Sourcing', path: 'sourcing' },
  { name: 'Reports', path: 'reports' },
];

const KANBAN_STAGES = [
  { name: 'New Candidates', count: 2 },
  { name: 'Interested' },
  { name: 'Shortlisted' },
  { name: 'Client Submission' },
  { name: 'Client Interview' },
];

export default function JobDetails() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{JOB_DATA.title}</h1>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                {JOB_DATA.status}
              </span>
              {JOB_DATA.badges.map((badge) => (
                <span key={badge} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {badge}
                </span>
              ))}
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                  {JOB_DATA.assignedTo.charAt(0)}
                </div>
                <span className="text-sm text-gray-600">{JOB_DATA.assignedTo}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <BuildingOfficeIcon className="h-5 w-5" />
                <span>{JOB_DATA.company}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPinIcon className="h-5 w-5" />
                <span>{JOB_DATA.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CurrencyDollarIcon className="h-5 w-5" />
                <span>{JOB_DATA.salary}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                <div className="text-2xl font-bold">{JOB_DATA.stats.hired}</div>
                <div className="text-sm">Hired</div>
              </div>
            </div>
            <div className="text-center">
              <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg">
                <div className="text-2xl font-bold">{JOB_DATA.stats.inPipeline}</div>
                <div className="text-sm">In pipeline</div>
              </div>
            </div>
            <div className="text-center">
              <div className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg">
                <div className="text-2xl font-bold">{JOB_DATA.stats.dropped}</div>
                <div className="text-sm">Dropped</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2">
          <TagIcon className="h-5 w-5 text-gray-400" />
          {JOB_DATA.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {TABS.map((tab) => (
            <a
              key={tab.name}
              href={`#${tab.path}`}
              className={`
                border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${tab.name === 'Candidates' ? 'border-indigo-500 text-indigo-600' : ''}
              `}
            >
              {tab.name}
              {tab.count && (
                <span className="ml-2 bg-gray-100 text-gray-900 px-2.5 py-0.5 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-4">
        {KANBAN_STAGES.map((stage) => (
          <div key={stage.name} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-900">{stage.name}</h3>
              {stage.count && (
                <span className="bg-gray-100 text-gray-900 px-2.5 py-0.5 rounded-full text-xs">
                  {stage.count}
                </span>
              )}
            </div>
            {stage.name === 'New Candidates' && (
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                      TC
                    </div>
                    <div>
                      <div className="font-medium">Test Case</div>
                      <div className="text-sm text-gray-500">8h</div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white">
                      TCM
                    </div>
                    <div>
                      <div className="font-medium">Test Cas Mav</div>
                      <div className="text-sm text-gray-500">5h</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}