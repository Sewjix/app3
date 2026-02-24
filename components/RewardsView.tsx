import RewardsHeaderBanner from './RewardsHeaderBanner';
import RewardsHistory from './RewardsHistory';

export default function RewardsView() {
  return (
    <div className="max-w-lg mx-auto py-4 space-y-6 pb-6">
      <RewardsHeaderBanner />
      <RewardsHistory />
    </div>
  );
}
