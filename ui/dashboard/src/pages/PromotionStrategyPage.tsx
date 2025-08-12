import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { namespaceStore } from '../stores/NamespaceStore'
import { PromotionStrategyStore } from '../stores/PromotionStrategyStore';
import BackButton from '../components/BackButton';
import HeaderBar from '@lib/components/HeaderBar';
import PromotionStrategyDetailsView from '../components/PromotionStrategyDetailsView';
import { useSampleData } from '../hooks/useSampleData';
import type { PromotionStrategy } from '@shared/utils/PSData';

interface NamespaceStore {
  namespace: string;
  namespaces: string[];
  setNamespace: (namespace: string) => void;
  setNamespaces: (namespaces: string[]) => void;
}

interface PromotionStrategyPageProps {
  namespace?: string;
  strategyName?: string;
}

const PromotionStrategyPage: React.FC<PromotionStrategyPageProps> = ({ namespace: propsNamespace, strategyName: propsStrategyName }) => {
  const { namespace: urlNamespace, name: urlStrategyName } = useParams();
  const namespace = propsNamespace || urlNamespace;
  const strategyName = propsStrategyName || urlStrategyName;

  const currentNamespace = namespaceStore((s: NamespaceStore) => s.namespace);
  const setNamespace = namespaceStore((s: NamespaceStore) => s.setNamespace);

  // Use sample data instead of store
  const { promotionStrategy, currentPhase, step, handleHistoryClick } = useSampleData();

  //Navigation:
  const navigate = useNavigate();

  const handleBack = () => {
    setNamespace(currentNamespace);
    navigate('/promotion-strategies');
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '100%', backgroundColor: 'white'}}>
        <div style={{ flex: '0 0 auto' }}>
          <BackButton onClick={handleBack} />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', marginRight: '100px'}}>
          <HeaderBar name={strategyName || "Sample Promotion Strategy"} />
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <PromotionStrategyDetailsView
          strategy={promotionStrategy}
          onHistoryItemClick={handleHistoryClick}
        />
      </div>
    </>
  );
};

export default PromotionStrategyPage; 