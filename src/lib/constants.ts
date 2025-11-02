import {
  Briefcase,
  Users,
  BarChart2,
  Mail,
  FileText,
  CreditCard,
  Headset,
  ShoppingCart,
  Book,
  Zap,
  type LucideIcon,
  Globe,
} from 'lucide-react';

export const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Manufacturing',
  'Education',
  'Real Estate',
  'Hospitality',
  'E-commerce',
  'Marketing & Advertising',
  'Consulting',
  'Non-profit',
];

export type ZohoService = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  isStandalone: boolean;
  icon: LucideIcon;
};

export const ZOHO_ONE_ID = 'zoho_one';
export const ZOHO_ONE_PRICE = 45;

export const ZOHO_SERVICES: ZohoService[] = [
  {
    id: 'crm',
    name: 'Zoho CRM',
    category: 'Sales',
    description: 'Engage with customers, convert more leads, and grow your revenue.',
    price: 20,
    isStandalone: true,
    icon: Users,
  },
  {
    id: 'analytics',
    name: 'Zoho Analytics',
    category: 'Business Intelligence',
    description: 'Get in-depth analytics and insights from your business data.',
    price: 30,
    isStandalone: true,
    icon: BarChart2,
  },
  {
    id: 'projects',
    name: 'Zoho Projects',
    category: 'Project Management',
    description: 'Plan, track, and collaborate on projects from start to finish.',
    price: 5,
    isStandalone: true,
    icon: Briefcase,
  },
  {
    id: 'books',
    name: 'Zoho Books',
    category: 'Finance',
    description: 'Manage your finances, create invoices, and track expenses effortlessly.',
    price: 20,
    isStandalone: true,
    icon: Book,
  },
  {
    id: 'campaigns',
    name: 'Zoho Campaigns',
    category: 'Marketing',
    description: 'Create, send, and track effective email campaigns that get results.',
    price: 5,
    isStandalone: true,
    icon: Mail,
  },
  {
    id: 'forms',
    name: 'Zoho Forms',
    category: 'Data Collection',
    description: 'Build powerful online forms to collect and manage data.',
    price: 12,
    isStandalone: false,
    icon: FileText,
  },
  {
    id: 'desk',
    name: 'Zoho Desk',
    category: 'Customer Support',
    description: 'Provide exceptional customer support across multiple channels.',
    price: 18,
    isStandalone: true,
    icon: Headset,
  },
  {
    id: 'inventory',
    name: 'Zoho Inventory',
    category: 'E-commerce',
    description: 'Manage orders and inventory for your multi-channel business.',
    price: 29,
    isStandalone: false,
    icon: ShoppingCart,
  },
  {
    id: 'subscriptions',
    name: 'Zoho Subscriptions',
    category: 'Finance',
    description: 'Handle recurring billing and subscription management with ease.',
    price: 29,
    isStandalone: false,
    icon: CreditCard,
  },
  {
    id: 'flow',
    name: 'Zoho Flow',
    category: 'Integration',
    description: 'Integrate your apps to automate business workflows.',
    price: 10,
    isStandalone: false,
    icon: Zap,
  },
  {
    id: ZOHO_ONE_ID,
    name: 'Zoho One',
    category: 'All-in-One Suite',
    description: 'The operating system for business. A full suite of 45+ integrated apps.',
    price: ZOHO_ONE_PRICE,
    isStandalone: true,
    icon: Globe,
  },
];
