import { useState } from 'react';
import { useParams } from 'react-router-dom';
import JobOverview from './JobOverview';
import JobCandidates from './JobCandidates';
import JobActivities from './JobActivities';
import JobNotes from './JobNotes';
import JobFiles from './JobFiles';
import JobSourcing from './JobSourcing';
import JobAnalytics from './JobAnalytics';
import JobDetailHeader from './JobDetailHeader';

const MOCK_JOB = {
  title: 'Software Engineer',
  company: 'Eleven Dev',
  location: 'Australian Capital Territory, Australia',
  salary: '2,000 USD - 5,000 USD',
  status: 'Active',
  tags: ['High Priority', 'Critical', 'Confidential'],
  stats: {
    hired: 0,
    inPipeline: 2,
    dropped: 0,
  },
};

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'activities', label: 'Activities' },
  { id: 'notes', label: 'Notes' },
  { id: 'files', label: 'Files' },
  { id: 'sourcing', label: 'Sourcing' },
  { id: 'analytics', label: 'Analytics' },
];

export default function JobDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('candidates');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <JobOverview />;
      case 'candidates':
        return <JobCandidates />;
      case 'activities':
        return <JobActivities />;
      case 'notes':
        return <JobNotes />;
      case 'files':
        return <JobFiles />;
      case 'sourcing':
        return <JobSourcing />;
      case 'analytics':
        return <JobAnalytics />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <JobDetailHeader job={MOCK_JOB} />

      {/* Tabs */}
      <div className="bg-white shadow">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {renderTabContent()}
      </div>
    </div>
  );
}