export interface Account {
  id: string;
  name: string;
  balance: number;
  accentColor: string;
  icon: 'credit-card' | 'banknote' | 'trending-up';
}

export interface BankCard {
  id: string;
  holderName: string;
  lastFour: string;
  expiry: string;
  network: 'visa' | 'mastercard';
  cardType: 'physical' | 'virtual';
  gradientFrom: string;
  gradientTo: string;
}

export interface RewardTransaction {
  id: string;
  merchant: string;
  icon: 'music' | 'package' | 'shopping-cart' | 'play' | 'utensils' | 'laptop' | 'coffee';
  amountSpent: number;
  pointsEarned: number;
  date: Date;
}

export const accounts: Account[] = [
  { id: '1', name: 'Checking Account', balance: 4287.5, accentColor: '#4A90D9', icon: 'credit-card' },
  { id: '2', name: 'Savings Account', balance: 12940.0, accentColor: '#5CB85C', icon: 'banknote' },
  { id: '3', name: 'Investment Account', balance: 8322.75, accentColor: '#F5A623', icon: 'trending-up' },
];

export const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

export const cards: BankCard[] = [
  {
    id: '1',
    holderName: 'Alex Johnson',
    lastFour: '4291',
    expiry: '08/28',
    network: 'visa',
    cardType: 'physical',
    gradientFrom: '#0D1B4B',
    gradientTo: '#1A3A8F',
  },
  {
    id: '2',
    holderName: 'Alex Johnson',
    lastFour: '7736',
    expiry: '03/27',
    network: 'mastercard',
    cardType: 'virtual',
    gradientFrom: '#1C1C2E',
    gradientTo: '#2D2D5E',
  },
];

export const totalPoints = 1450;

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export const rewardTransactions: RewardTransaction[] = [
  { id: '1', merchant: 'Spotify Premium', icon: 'music', amountSpent: 9.99, pointsEarned: 10, date: daysAgo(1) },
  { id: '2', merchant: 'Amazon', icon: 'package', amountSpent: 134.75, pointsEarned: 135, date: daysAgo(2) },
  { id: '3', merchant: 'Whole Foods Market', icon: 'shopping-cart', amountSpent: 62.3, pointsEarned: 62, date: daysAgo(3) },
  { id: '4', merchant: 'Netflix', icon: 'play', amountSpent: 15.49, pointsEarned: 15, date: daysAgo(5) },
  { id: '5', merchant: 'Uber Eats', icon: 'utensils', amountSpent: 38.0, pointsEarned: 38, date: daysAgo(6) },
  { id: '6', merchant: 'Apple Store', icon: 'laptop', amountSpent: 249.0, pointsEarned: 249, date: daysAgo(8) },
  { id: '7', merchant: 'Starbucks', icon: 'coffee', amountSpent: 6.5, pointsEarned: 7, date: daysAgo(10) },
];
