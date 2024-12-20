import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Question {
  id: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
  label: string;
  required: boolean;
  options?: string[];
}

interface CustomFormBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomFormBuilder({ isOpen, onClose }: CustomFormBuilderProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formName, setFormName] = useState('');

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'text',
      label: '',
      required: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ));
  };

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
                        <h2 className="text-lg font-medium">Create Custom Form</h2>
                        <button
                          type="button"
                          className="rounded-md text-gray-400 hover:text-gray-500"
                          onClick={onClose}
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="px-4 sm:px-6 space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Form Name
                        </label>
                        <input
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      {questions.map((question) => (
                        <div key={question.id} className="border rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1 space-y-4">
                              <input
                                type="text"
                                value={question.label}
                                onChange={(e) => updateQuestion(question.id, { label: e.target.value })}
                                placeholder="Question"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                              <select
                                value={question.type}
                                onChange={(e) => updateQuestion(question.id, { type: e.target.value as Question['type'] })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              >
                                <option value="text">Short Answer</option>
                                <option value="textarea">Long Answer</option>
                                <option value="select">Dropdown</option>
                                <option value="radio">Multiple Choice</option>
                                <option value="checkbox">Checkboxes</option>
                              </select>
                            </div>
                            <button
                              onClick={() => removeQuestion(question.id)}
                              className="ml-2 text-gray-400 hover:text-gray-600"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={question.required}
                              onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm text-gray-600">Required</label>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={addQuestion}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <PlusIcon className="h-5 w-5" />
                        <span>Add Question</span>
                      </button>
                    </div>

                    <div className="mt-auto border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          onClick={onClose}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          onClick={onClose}
                        >
                          Save Form
                        </button>
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