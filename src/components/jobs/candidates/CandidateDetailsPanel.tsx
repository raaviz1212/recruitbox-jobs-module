import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Candidate } from '../JobCandidates';

interface CandidateDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
}

export default function CandidateDetailsPanel({
  isOpen,
  onClose,
  candidate
}: CandidateDetailsPanelProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium">Candidate Details</h2>
                        <button
                          type="button"
                          className="rounded-md text-gray-400 hover:text-gray-500"
                          onClick={onClose}
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-medium">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-xl font-medium">{candidate.name}</h3>
                          <p className="text-gray-500">{candidate.email}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2">Current Stage</h4>
                          <p className="text-gray-600">{candidate.stage}</p>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Time in Current Stage</h4>
                          <p className="text-gray-600">{candidate.timeInStage}</p>
                        </div>

                        {candidate.hasResume && (
                          <div>
                            <h4 className="font-medium mb-2">Resume</h4>
                            <button className="text-indigo-600 hover:text-indigo-700">
                              Download Resume
                            </button>
                          </div>
                        )}

                        {/* Add more candidate details sections here */}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}