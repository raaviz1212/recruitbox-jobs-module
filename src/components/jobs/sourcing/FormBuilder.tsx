import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { 
  XMarkIcon, 
  PlusIcon, 
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

interface Question {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'radio';
  label: string;
  required: boolean;
  options?: string[];
  placeholder?: string;
}

interface FormBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUESTION_TYPES = [
  { value: 'text', label: 'Short Text' },
  { value: 'textarea', label: 'Long Text' },
  { value: 'number', label: 'Numeric Value' },
  { value: 'select', label: 'Dropdown' },
  { value: 'radio', label: 'Radio Buttons' }
];

export default function FormBuilder({ isOpen, onClose }: FormBuilderProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [formName, setFormName] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'text',
      label: '',
      required: false,
      placeholder: '',
      options: []
    };
    setQuestions([...questions, newQuestion]);
    setEditingQuestion(newQuestion);
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    if (editingQuestion?.id === id) {
      setEditingQuestion(null);
    }
  };

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, ...updates } : q
    ));
    if (editingQuestion?.id === id) {
      setEditingQuestion({ ...editingQuestion, ...updates });
    }
  };

  const moveQuestion = (id: string, direction: 'up' | 'down') => {
    const index = questions.findIndex(q => q.id === id);
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === questions.length - 1)
    ) {
      return;
    }

    const newQuestions = [...questions];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]];
    setQuestions(newQuestions);
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && (question.type === 'select' || question.type === 'radio')) {
      const newOption = `Option ${(question.options?.length || 0) + 1}`;
      updateQuestion(questionId, {
        options: [...(question.options || []), newOption]
      });
    }
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options) {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question && question.options) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex);
      updateQuestion(questionId, { options: newOptions });
    }
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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6 border-b border-gray-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-lg font-medium">Create Custom Form</h2>
                          <p className="mt-1 text-sm text-gray-500">
                            Build your custom application form by adding and configuring questions.
                          </p>
                        </div>
                        <button
                          type="button"
                          className="rounded-md text-gray-400 hover:text-gray-500"
                          onClick={onClose}
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-1 overflow-hidden">
                      {/* Questions List */}
                      <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
                        <div className="p-4">
                          <input
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Form Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        <div className="px-4 space-y-4">
                          {questions.map((question, index) => (
                            <div
                              key={question.id}
                              className={`p-4 border rounded-lg ${
                                editingQuestion?.id === question.id
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{question.label || 'Untitled Question'}</span>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => moveQuestion(question.id, 'up')}
                                    disabled={index === 0}
                                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                  >
                                    <ArrowUpIcon className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => moveQuestion(question.id, 'down')}
                                    disabled={index === questions.length - 1}
                                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                  >
                                    <ArrowDownIcon className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditingQuestion(question)}
                                    className="p-1 text-gray-400 hover:text-gray-600"
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => removeQuestion(question.id)}
                                    className="p-1 text-gray-400 hover:text-gray-600"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                {QUESTION_TYPES.find(t => t.value === question.type)?.label}
                              </div>
                            </div>
                          ))}

                          <button
                            onClick={addQuestion}
                            className="w-full py-2 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 rounded-lg border-2 border-dashed border-blue-200"
                          >
                            <PlusIcon className="h-5 w-5" />
                            <span>Add Question</span>
                          </button>
                        </div>
                      </div>

                      {/* Question Editor */}
                      <div className="w-1/2 p-6 overflow-y-auto">
                        {editingQuestion ? (
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Question Text
                              </label>
                              <input
                                type="text"
                                value={editingQuestion.label}
                                onChange={(e) => updateQuestion(editingQuestion.id, { label: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Question Type
                              </label>
                              <select
                                value={editingQuestion.type}
                                onChange={(e) => updateQuestion(editingQuestion.id, { 
                                  type: e.target.value as Question['type'],
                                  options: ['select', 'radio'].includes(e.target.value) ? [] : undefined
                                })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              >
                                {QUESTION_TYPES.map((type) => (
                                  <option key={type.value} value={type.value}>
                                    {type.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {(editingQuestion.type === 'select' || editingQuestion.type === 'radio') && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Options
                                </label>
                                <div className="space-y-2">
                                  {editingQuestion.options?.map((option, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => updateOption(editingQuestion.id, index, e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                      />
                                      <button
                                        onClick={() => removeOption(editingQuestion.id, index)}
                                        className="text-gray-400 hover:text-gray-600"
                                      >
                                        <TrashIcon className="h-5 w-5" />
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => addOption(editingQuestion.id)}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                                  >
                                    <PlusIcon className="h-4 w-4" />
                                    <span>Add Option</span>
                                  </button>
                                </div>
                              </div>
                            )}

                            {['text', 'textarea', 'number'].includes(editingQuestion.type) && (
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Placeholder Text
                                </label>
                                <input
                                  type="text"
                                  value={editingQuestion.placeholder || ''}
                                  onChange={(e) => updateQuestion(editingQuestion.id, { placeholder: e.target.value })}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                              </div>
                            )}

                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={editingQuestion.required}
                                onChange={(e) => updateQuestion(editingQuestion.id, { required: e.target.checked })}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <label className="ml-2 text-sm text-gray-600">
                                This field is required
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center text-gray-500">
                            Select a question to edit or add a new one
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
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