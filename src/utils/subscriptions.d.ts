export interface SubscriptionData {
  currentPlan: 'free' | 'pro' | 'expert' | null;
  isLoading: boolean;
  usageCount: number;
  remainingGenerations: number;
  planLimit: number;
}

export function useSubscriptions(): SubscriptionData; 