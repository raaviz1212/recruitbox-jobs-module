import { BellIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <div></div>
        <div className="flex items-center space-x-4">
          <button className="p-1">
            <BellIcon className="h-6 w-6 text-gray-400" />
          </button>
          <div className="flex items-center">
            <span className="text-sm font-medium mr-2">Admin User</span>
            <span className="text-sm text-gray-500">admin</span>
            <button className="ml-4 text-sm text-gray-600 hover:text-gray-900">
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}