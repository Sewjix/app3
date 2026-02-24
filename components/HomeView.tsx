import Header from './Header';
import TotalBalanceBanner from './TotalBalanceBanner';
import AccountsSection from './AccountsSection';
import CardsSection from './CardsSection';

export default function HomeView() {
  return (
    <div className="max-w-lg mx-auto py-4 space-y-6 pb-6">
      <Header />
      <TotalBalanceBanner />
      <AccountsSection />
      <CardsSection />
    </div>
  );
}
