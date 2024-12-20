import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import CandidatePipeline from './candidates/CandidatePipeline';
import CandidateCard from './candidates/CandidateCard';
import CandidateEmailModal from './candidates/CandidateEmailModal';
import CandidateDetailsPanel from './candidates/CandidateDetailsPanel';

export interface Candidate {
  id: string;
  name: string;
  image: string;
  hasResume: boolean;
  email: string;
  stage: string;
  timeInStage: string;
}

const INITIAL_STAGES = [
  'Candidates Backlog',
  'Interested',
  'Shortlisted',
  'Client Submitted',
  'Client Interview',
  'Offered',
  'Placement Made'
];

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'John Smith',
    image: '/avatars/john.jpg',
    hasResume: true,
    email: 'john@example.com',
    stage: 'Candidates Backlog',
    timeInStage: '2d'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    image: '/avatars/sarah.jpg',
    hasResume: true,
    email: 'sarah@example.com',
    stage: 'Candidates Backlog',
    timeInStage: '1d'
  },
  {
    id: '3',
    name: 'Michael Brown',
    image: '/avatars/michael.jpg',
    hasResume: false,
    email: 'michael@example.com',
    stage: 'Interested',
    timeInStage: '3d'
  }
];

export default function JobCandidates() {
  const [stages, setStages] = useState(INITIAL_STAGES);
  const [candidates, setCandidates] = useState(MOCK_CANDIDATES);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeCandidate = candidates.find(c => c.id === active.id);
    const overStage = over.id as string;

    if (activeCandidate && activeCandidate.stage !== overStage) {
      setCandidates(candidates.map(candidate => 
        candidate.id === activeCandidate.id
          ? { ...candidate, stage: overStage }
          : candidate
      ));
    }

    setActiveId(null);
  };

  const handleStageEdit = (oldStage: string, newStage: string) => {
    setStages(stages.map(s => s === oldStage ? newStage : s));
    setCandidates(candidates.map(c => 
      c.stage === oldStage ? { ...c, stage: newStage } : c
    ));
  };

  const handleAddStage = () => {
    setStages([...stages, `New Stage ${stages.length + 1}`]);
  };

  const handleEmailClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsEmailModalOpen(true);
  };

  const handleViewDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailsPanelOpen(true);
  };

  return (
    <div className="h-[calc(100vh-240px)] overflow-hidden">
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="flex gap-4 p-4 overflow-x-auto h-full">
          {stages.map((stage) => (
            <CandidatePipeline
              key={stage}
              title={stage}
              onTitleEdit={(newTitle) => handleStageEdit(stage, newTitle)}
              candidates={candidates.filter(c => c.stage === stage)}
              onEmailClick={handleEmailClick}
              onViewDetails={handleViewDetails}
            />
          ))}
          <button
            onClick={handleAddStage}
            className="flex-shrink-0 w-[300px] h-[100px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
          >
            Add New Column
          </button>
        </div>

        <DragOverlay>
          {activeId ? (
            <CandidateCard
              candidate={candidates.find(c => c.id === activeId)!}
              onEmailClick={handleEmailClick}
              onViewDetails={handleViewDetails}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {selectedCandidate && (
        <>
          <CandidateEmailModal
            isOpen={isEmailModalOpen}
            onClose={() => setIsEmailModalOpen(false)}
            candidate={selectedCandidate}
          />
          <CandidateDetailsPanel
            isOpen={isDetailsPanelOpen}
            onClose={() => setIsDetailsPanelOpen(false)}
            candidate={selectedCandidate}
          />
        </>
      )}
    </div>
  );
}