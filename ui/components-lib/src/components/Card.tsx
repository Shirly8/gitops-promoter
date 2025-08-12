import { FaServer } from 'react-icons/fa';
import { GoHistory } from 'react-icons/go';
import { StatusType } from './StatusIcon';
import React, { useState } from 'react';
import CommitInfo from './CommitInfo';
import { HistorySection } from './HistorySection';
import './Card.scss';

export interface CardProps {
  environments: any[];
  onHistoryItemClick?: (environmentIndex: number, historyIndex: number) => void;
}

const Card: React.FC<CardProps> = ({ environments, onHistoryItemClick }) => {
  // Add CSS class for horizontal layout when 4+ environments
  const isHorizontalLayout = environments.length >= 4;
  
  // State to track which environment's history is currently open
  const [activeHistoryPanel, setActiveHistoryPanel] = useState<string | null>(null);
  
  const toggleHistoryPanel = (branch: string) => {
    setActiveHistoryPanel(activeHistoryPanel === branch ? null : branch);
  };
  
  // Calculate card position based on which history is open
  const getCardPosition = (index: number) => {
    if (!activeHistoryPanel) return 0;
    
    const activeIndex = environments.findIndex(env => env.branch === activeHistoryPanel);
    const totalCards = environments.length;
    const historyWidth = 320; // Width of history panel
    const gap = 60; // Gap between card and history panel
    const totalSpace = historyWidth + gap; // Total space needed
    
    if (activeIndex === 0) {
      // First card history open: first card slides more to the right
      if (index === 0) return -totalSpace / 1.5 + 20 + 10 + 10; // First card moves left but reduced by 20px + 10px + 10px more (about -213px)
      return totalSpace / 4; // Other cards move right less (about 95px)
    } else if (activeIndex === 1) {
      // Second card history open: first moves left by 30px more, third moves right by 10px more
      if (index === 0) return -50 - 50 - 30 - 30 - 30; // First card moves left by 190px (160px + 30px more)
      if (index === 1) return -totalSpace / 2; // Second card moves left more (about -190px)
      return 50 + 50 + 10 + 10 - 5; // Third card moves right by 115px (120px - 5px more to left)
    } else if (activeIndex === 2) {
      // Third card history open: third moves left by 20px more
      if (index === 0) return -totalSpace / 3; // First card moves left (about -127px)
      if (index === 1) return -totalSpace / 3; // Second card moves left (about -127px)
      return -50 - 30 - 20 - 20 - 5; // Third card moves left by 125px (120px + 5px more)
    }
    
    return 0;
  };

  const handleHistoryItemClick = (environmentIndex: number, historyIndex: number) => {
    if (onHistoryItemClick) {
      onHistoryItemClick(environmentIndex, historyIndex);
    }
  };
  
  return (
    <div className={`env-cards-container ${activeHistoryPanel ? 'history-open' : ''}`}>
      <div className={`env-cards-wrapper ${isHorizontalLayout ? 'horizontal-layout' : ''}`}>
        {environments.map((env: any, envIdx: number) => {
          const branch = env.branch;
          const phase = env.phase;
          const proposedStatus = env.promotionStatus;
          const isHistoryOpen = activeHistoryPanel === branch;
          const cardPosition = getCardPosition(envIdx);

          // Active commits (currently deployed)
          const activeDeploymentCommit = {
            sha: env.drySha,
            author: env.dryCommitAuthor,
            subject: env.dryCommitSubject,
            body: env.dryCommitMessage,
            date: env.dryCommitDate
          };

          const activeCodeCommit = {
            sha: env.referenceSha,
            author: env.referenceCommitAuthor,
            subject: env.referenceCommitSubject,
            body: env.referenceCommitBody || '',
            date: env.referenceCommitDate
          };

          const proposedDeploymentCommit = {
            sha: env.proposedSha,
            author: env.proposedDryCommitAuthor,
            subject: env.proposedDryCommitSubject,
            body: env.proposedDryCommitBody,
            date: env.proposedDryCommitDate
          };

          const proposedCodeCommit = {
            sha: env.proposedReferenceSha,
            author: env.proposedReferenceCommitAuthor,
            subject: env.proposedReferenceCommitSubject,
            body: env.proposedReferenceCommitBody || '',
            date: env.proposedReferenceCommitDate
          };

          return (
            <div 
              key={env.branch} 
              className={`env-card-column ${isHistoryOpen ? 'history-open' : ''}`}
              style={{ 
                transform: `translateX(${cardPosition}px)`,
                transition: 'transform 0.3s ease'
              }}
            >
              <div className={`env-card ${(() => {
                const shouldShowProposed = (proposedStatus !== 'promoted' && 
                 proposedStatus !== 'success' && 
                 env.proposedChecks && 
                 env.proposedChecks.length > 0 && 
                 !env.proposedChecks.every((check: any) => check.status === 'success'));
                
                // Only add shortened class for development and staging when proposed cards disappear
                if ((branch.includes('development') || branch.includes('staging') || branch.includes('production')) && !shouldShowProposed) {
                  console.log(`Card ${branch}: Adding shortened class - shouldShowProposed=${shouldShowProposed}`);
                  return 'env-card--shortened';
                }
                console.log(`Card ${branch}: Not shortened - shouldShowProposed=${shouldShowProposed}, isDevOrStaging=${branch.includes('development') || branch.includes('staging') || branch.includes('production')}`);
                return '';
              })()}`}>
                <div className="env-card__title" style={{ display: 'flex', alignItems: 'center' }}>
                  <FaServer className="env-card__icon" />
                  <span className="env-card__env-name">{branch}</span>
                  
                  {/* History Icon in the right corner */}
                  <div className="history-icon-container">
                    <button 
                      className={`history-icon-btn ${isHistoryOpen ? 'active' : ''}`}
                      onClick={() => toggleHistoryPanel(branch)}
                      title="View History"
                    >
                      <GoHistory />
                    </button>
                  </div>
                </div>

                {/* Active Commits Section */}
                <CommitInfo
                  title="Active"
                  deploymentCommit={activeDeploymentCommit}
                  codeCommit={activeCodeCommit}
                  isActive={true}
                  status={phase as StatusType}
                  deploymentCommitUrl={env.dryCommitUrl}
                  codeCommitUrl={env.referenceCommitUrl}
                  activeChecks={env.activeChecks}
                  proposedChecks={env.proposedChecks}
                  activeChecksSummary={env.activeChecksSummary}
                  proposedChecksSummary={env.proposedChecksSummary}
                  prUrl={env.activePrUrl}
                  prNumber={env.activePrNumber?.toString()}
                />

                {/* Proposed Commits Section - Only show if there are proposed checks and they're not all successful (hide when all pass) */}
                {proposedStatus !== 'promoted' && 
                 proposedStatus !== 'success' && 
                 env.proposedChecks && 
                 env.proposedChecks.length > 0 && 
                 !env.proposedChecks.every((check: any) => check.status === 'success') && (
                  <CommitInfo
                    title="Proposed"
                    deploymentCommit={proposedDeploymentCommit}
                    codeCommit={proposedCodeCommit}
                    isActive={false}
                    status={proposedStatus as StatusType}
                    className="proposed"
                    deploymentCommitUrl={env.proposedDryCommitUrl}
                    codeCommitUrl={env.proposedReferenceCommitUrl}
                    activeChecks={env.activeChecks}
                    proposedChecks={env.proposedChecks}
                    activeChecksSummary={env.activeChecksSummary}
                    proposedChecksSummary={env.proposedChecksSummary}
                    prUrl={env.prUrl}
                    prNumber={env.prNumber?.toString()}
                  />
                )}
              </div>

              {/* History Panel - Slides out from the right */}
              {isHistoryOpen && (
                <div className="history-panel">
                  <HistorySection 
                    history={env.history || []} 
                    environmentName={branch}
                    onHistoryItemClick={(historyIndex) => handleHistoryItemClick(envIdx, historyIndex)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;