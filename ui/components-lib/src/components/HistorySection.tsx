import React from 'react';
import { GoGitCommit, GoGitPullRequest, GoClock } from 'react-icons/go';
import './HistorySection.scss';

interface HistoryItem {
  active: {
    dry: {
      sha: string;
      subject: string;
      commitTime: string;
    };
  };
  pullRequest?: {
    id?: string;
    url?: string;
  };
}

interface HistorySectionProps {
  history: HistoryItem[];
  environmentName: string;
  onHistoryItemClick?: (historyIndex: number) => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ 
  history, 
  environmentName, 
  onHistoryItemClick 
}) => {
  if (!history || history.length === 0) return null;

  const handleItemClick = (index: number) => {
    if (onHistoryItemClick) {
      onHistoryItemClick(index);
    }
  };

  return (
    <div className="history-section">
      <div className="history-header">
        <h4>History</h4>
        <span className="history-count">{history.length} promotions</span>
      </div>
      
      <div className="history-list">
        {history.slice(0, 5).map((item, index) => (
          <div 
            key={index} 
            className="history-item"
            onClick={() => handleItemClick(index)}
            style={{ cursor: onHistoryItemClick ? 'pointer' : 'default' }}
          >
            <div className="history-item-content">
              <div className="history-item-main">
                <span className="commit-sha">{item.active.dry.sha.substring(0, 7)}</span>
                <span className="commit-message">{item.active.dry.subject}</span>
                
                {item.pullRequest?.id && (
                  <a 
                    href={item.pullRequest.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pr-link"
                    onClick={(e) => e.stopPropagation()} // Prevent triggering history click
                  >
                    <GoGitPullRequest />
                    PR #{item.pullRequest.id}
                  </a>
                )}
              </div>
              
              <div className="history-item-meta">
                <span className="timestamp">
                  <GoClock />
                  {new Date(item.active.dry.commitTime).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {history.length > 5 && (
          <div className="history-more">
            <button className="view-more-btn">
              View {history.length - 5} more promotions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 