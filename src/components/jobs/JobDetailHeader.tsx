import { BuildingOfficeIcon, MapPinIcon, CurrencyDollarIcon, PlusIcon } from '@heroicons/react/24/outline';

interface JobDetailHeaderProps {
  job: {
    title: string;
    company: string;
    location: string;
    salary: string;
    status: string;
    tags: string[];
    stats: {
      hired: number;
      inPipeline: number;
      dropped: number;
    };
  };
}

export default function JobDetailHeader({ job }: JobDetailHeaderProps) {
  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'high priority':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'confidential':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-3 rounded-lg">
              <BuildingOfficeIcon className="h-8 w-8 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <BuildingOfficeIcon className="h-4 w-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CurrencyDollarIcon className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              job.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {job.status}
            </span>
            {job.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-sm font-medium ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
            <button className="flex items-center gap-1 px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-full">
              <PlusIcon className="h-4 w-4" />
              Tags
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="text-center">
            <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
              <div className="text-2xl font-bold">{job.stats.hired}</div>
              <div className="text-sm">Hired</div>
            </div>
          </div>
          <div className="text-center">
            <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg">
              <div className="text-2xl font-bold">{job.stats.inPipeline}</div>
              <div className="text-sm">In pipeline</div>
            </div>
          </div>
          <div className="text-center">
            <div className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg">
              <div className="text-2xl font-bold">{job.stats.dropped}</div>
              <div className="text-sm">Dropped</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}