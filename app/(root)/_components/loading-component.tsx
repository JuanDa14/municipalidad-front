'use client';

import { SkeletonResponse } from './skeleton-response';

interface LoadingComponentProps {
	isLoading: boolean;
	children: React.ReactNode;
}

export const LoadingComponent = ({ isLoading, children }: LoadingComponentProps) => {
	return <>{isLoading ? <SkeletonResponse /> : <>{children}</>}</>;
};
