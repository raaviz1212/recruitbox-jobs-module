import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface BulkActionsProps {
  onAction: (action: string) => void;
  disabled?: boolean;
}

export default function BulkActions({ onAction, disabled = false }: BulkActionsProps) {
  const actions = [
    'Change Status',
    'Assign Manager',
    'Export Selected',
    'Delete Selected'
  ];

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        disabled={disabled}
        className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
      >
        Bulk Actions
        <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {actions.map((action) => (
              <Menu.Item key={action}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block px-4 py-2 text-sm text-gray-700 w-full text-left`}
                    onClick={() => onAction(action)}
                  >
                    {action}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}