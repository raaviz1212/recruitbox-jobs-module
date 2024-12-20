import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import { ChevronDownIcon, ArrowTopRightOnSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import FormBuilder from './sourcing/FormBuilder';
import JobSettingsPanel from './sourcing/JobSettingsPanel';

const FORM_TEMPLATES = [
  { id: 1, name: 'Default Application Form' },
  { id: 2, name: 'Technical Role Form' },
  { id: 3, name: 'Sales Position Form' },
  { id: 4, name: 'Management Role Form' },
];

export default function JobSourcing() {
  const [acceptApplications, setAcceptApplications] = useState(false);
  const [displaySalary, setDisplaySalary] = useState(false);
  const [displayPackage, setDisplayPackage] = useState(false);
  const [isFormDropdownOpen, setIsFormDropdownOpen] = useState(false);
  const [isFormBuilderOpen, setIsFormBuilderOpen] = useState(false);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(FORM_TEMPLATES[0]);

  return (
    <div className="p-6 space-y-8">
      {/* Publish Job Section */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Publish job</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage the publishing of the job on your career page and whether you wish to pin it at the top of your job listings.
        </p>
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block">
          Learn more about publishing your job
        </a>
      </div>

      {/* Accept Applications Section */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-900">Accept Online Applications</h3>
          <Switch
            checked={acceptApplications}
            onChange={setAcceptApplications}
            className={`${
              acceptApplications ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                acceptApplications ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>

        {acceptApplications && (
          <div className="mt-4 space-y-4">
            {/* Application Form Selection */}
            <div className="relative border-b border-gray-200 py-3">
              <div>
                <span className="text-sm text-gray-500">Application form</span>
                <button
                  onClick={() => setIsFormDropdownOpen(!isFormDropdownOpen)}
                  className="flex items-center justify-between w-full mt-1 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {selectedForm.name}
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Dropdown Menu */}
              {isFormDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="py-1">
                    {FORM_TEMPLATES.map((form) => (
                      <button
                        key={form.id}
                        onClick={() => {
                          setSelectedForm(form);
                          setIsFormDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-left text-gray-900 hover:bg-gray-100"
                      >
                        {form.name}
                      </button>
                    ))}
                    <div className="border-t border-gray-100">
                      <button
                        onClick={() => {
                          setIsFormBuilderOpen(true);
                          setIsFormDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-left text-blue-600 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Create Custom Form
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Job Link */}
            <div className="flex items-center justify-between border-b border-gray-200 py-3">
              <div>
                <span className="text-sm text-gray-500">Link</span>
                <p className="text-sm font-medium text-gray-900">View job in Career page</p>
              </div>
              <Link
                to="/job/software-engineer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-gray-600"
              >
                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Job Settings Section */}
      <div className="border-t border-gray-200 pt-6">
        <div>
          <h3 className="text-base font-medium text-gray-900">Job Settings</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage the job's display settings such as salary and package. Select which application form applicants will have to fill out when applying.
          </p>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block">
            Learn more about how to customize your published job
          </a>
        </div>

        <div className="mt-4 space-y-4">
          {/* Display Salary Toggle */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-gray-900">Display salary information</span>
            <Switch
              checked={displaySalary}
              onChange={setDisplaySalary}
              className={`${
                displaySalary ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  displaySalary ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          {/* Display Package Toggle */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-gray-900">Display package details</span>
            <Switch
              checked={displayPackage}
              onChange={setDisplayPackage}
              className={`${
                displayPackage ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  displayPackage ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </div>

      {/* Form Builder Panel */}
      <FormBuilder
        isOpen={isFormBuilderOpen}
        onClose={() => setIsFormBuilderOpen(false)}
      />

      {/* Job Settings Panel */}
      <JobSettingsPanel
        isOpen={isSettingsPanelOpen}
        onClose={() => setIsSettingsPanelOpen(false)}
      />
    </div>
  );
}