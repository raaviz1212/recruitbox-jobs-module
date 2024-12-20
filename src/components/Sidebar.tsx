import { Link } from 'react-router-dom';
import {
  Square3Stack3DIcon,
  UserGroupIcon,
  BriefcaseIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
  InboxIcon,
  DocumentIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600">Lead Manager</h1>
      </div>
      
      <nav className="space-y-1 px-3">
        <Link to="/" className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
          <Square3Stack3DIcon className="h-5 w-5 mr-3" />
          <span>Dashboard</span>
        </Link>

        <div>
          <div className="flex items-center px-3 py-2 text-gray-600">
            <BriefcaseIcon className="h-5 w-5 mr-3" />
            <span>Recruitment</span>
          </div>
          
          <div className="ml-8 space-y-1">
            <Link to="/clients" className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
              <UserGroupIcon className="h-5 w-5 mr-3" />
              <span>Clients</span>
            </Link>
            
            <Link to="/jobs" className="flex items-center px-3 py-2 text-indigo-600 bg-indigo-50 rounded-md">
              <DocumentIcon className="h-5 w-5 mr-3" />
              <span>Jobs</span>
            </Link>
            
            <Link to="/candidates" className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
              <UserIcon className="h-5 w-5 mr-3" />
              <span>Candidates</span>
            </Link>
            
            <Link to="/placements" className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
              <ClipboardDocumentCheckIcon className="h-5 w-5 mr-3" />
              <span>Placements</span>
            </Link>
            
            <Link to="/inbox" className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
              <InboxIcon className="h-5 w-5 mr-3" />
              <span>Inbox</span>
            </Link>
            
            <Link to="/templates" className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
              <DocumentIcon className="h-5 w-5 mr-3" />
              <span>Templates</span>
            </Link>
            
            <Link to="/reports" className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
              <ChartBarIcon className="h-5 w-5 mr-3" />
              <span>Reports</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}