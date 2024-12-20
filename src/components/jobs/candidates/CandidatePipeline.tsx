import { useDroppable } from '@dnd-kit/core';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import CandidateCard from './CandidateCard';
import { Candidate } from '../JobCandidates';
import { useState } from 'react';

interface CandidatePipelineProps {
  title: string;
  candidates: Candidate[];
  onTitleEdit: (newTitle: string) => void;
  onEmailClick: (candidate: Candidate) => void;
  onViewDetails: (candidate: Candidate) => void;
}

export default function CandidatePipeline({
  title,
  candidates,
  onTitleEdit,
  onEmailClick,
  onViewDetails
}: CandidatePipelineProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const { setNodeRef } = useDroppable({ id: title });

  const handleTitleSubmit = () => {
    onTitleEdit(editedTitle);
    setIsEditing(false);
  };

  return (
    <div className="flex-shrink-0 w-[300px] bg-gray-50 rounded-lg">
      <div className="p-3 flex items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-2">
            <span
              className="font-medium cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              {title}
            </span>
            {candidates.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {candidates.length}
              </span>
            )}
          </div>
        )}
        <button className="text-gray-400 hover:text-gray-600">
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className="p-2 space-y-2 overflow-y-auto"
        style={{ height: 'calc(100vh - 300px)' }}
      >
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onEmailClick={onEmailClick}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}