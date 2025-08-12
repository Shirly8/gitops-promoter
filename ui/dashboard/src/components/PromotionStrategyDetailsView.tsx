import React from 'react';
import Card from '@lib/components/Card';
import { enrichPromotionStrategy, type PromotionStrategy } from '@shared/utils/PSData';

interface PromotionStrategyDetailsViewProps {
  strategy: PromotionStrategy;
  onHistoryItemClick?: (environmentIndex: number, historyIndex: number) => void;
}

export const PromotionStrategyDetailsView: React.FC<PromotionStrategyDetailsViewProps> = ({
  strategy,
  onHistoryItemClick,
}) => {
  if (!strategy) return <div>No strategy found</div>;

  const enrichedEnvs = enrichPromotionStrategy(strategy);
  return <Card environments={enrichedEnvs} onHistoryItemClick={onHistoryItemClick} />;
};

export default PromotionStrategyDetailsView; 