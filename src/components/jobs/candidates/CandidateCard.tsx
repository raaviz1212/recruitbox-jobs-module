import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { DocumentIcon, EnvelopeIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Candidate } from '../JobCandidates';

interface CandidateCardProps {
  candidate: Candidate;
  onEmailClick: (candidate: Candidate) => void;
  onViewDetails: (candidate: Candidate) => void;
}

export default function CandidateCard({
  candidate,
  onEmailClick,
  onViewDetails
}: CandidateCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: candidate.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-move"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
          {candidate.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-medium text-sm">{candidate.name}</div>
          <div className="text-xs text-gray-500">{candidate.timeInStage}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
        {candidate.hasResume && (
          <DocumentIcon className="h-5 w-5 text-gray-400" />
        )}
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEmailClick(candidate);
            }}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <EnvelopeIcon className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(candidate);
            }}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}