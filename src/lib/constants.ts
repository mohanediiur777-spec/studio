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
  Building,
  MonitorPlay,
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
  descriptionAr: string;
  longDescription: string;
  longDescriptionAr: string;
  price: number;
  isStandalone: boolean;
  icon: LucideIcon;
};

export const ZOHO_ONE_ID = 'zoho_one';
export const ZOHO_ONE_PRICE_ALL_EMPLOYEES = 1575;
export const ZOHO_ONE_PRICE_FLEXIBLE = 3675;

export const ZOHO_SERVICES: ZohoService[] = [
    {
    id: 'crm',
    name: 'Zoho CRM',
    category: 'Sales',
    description: 'Engage with customers, convert more leads, and grow your revenue.',
    descriptionAr: 'تفاعل مع العملاء، وحوّل المزيد من العملاء المحتملين، وزد إيراداتك.',
    longDescription: `<strong>Standard Tier:</strong><ul><li>Scoring Rules</li><li>Workflows</li><li>Multiple Pipelines</li><li>Mass Email</li><li>Custom Dashboards</li></ul><p>Higher tiers (Professional, Enterprise) offer more advanced features like AI-powered assistants, advanced customization, and higher API limits.</p>`,
    longDescriptionAr: `<strong>الطبقة القياسية:</strong><ul><li>قواعد التقييم</li><li>مسارات العمل</li><li>خطوط أنابيب متعددة</li><li>رسائل بريد إلكتروني جماعية</li><li>لوحات معلومات مخصصة</li></ul><p>تقدم المستويات الأعلى (Professional, Enterprise) ميزات أكثر تقدمًا مثل المساعدين المدعومين بالذكاء الاصطناعي والتخصيص المتقدم وحدود أعلى لواجهة برمجة التطبيقات.</p>`,
    price: 700,
    isStandalone: true,
    icon: Users,
  },
  {
    id: 'desk',
    name: 'Zoho Desk',
    category: 'Customer Support',
    description: 'Provide exceptional customer support across multiple channels.',
    descriptionAr: 'قدّم دعمًا استثنائيًا للعملاء عبر قنوات متعددة.',
    longDescription: `<strong>Standard Tier:</strong><ul><li>Help Center</li><li>Community Forums</li><li>Ticket Status Dashboards</li><li>SLA Management</li><li>Multi-channel support (email, social, phone)</li></ul><p>Higher tiers (Professional, Enterprise) offer features like AI-powered ticket analysis, advanced reporting, and live chat.</p>`,
    longDescriptionAr: `<strong>الطبقة القياسية:</strong><ul><li>مركز المساعدة</li><li>منتديات المجتمع</li><li>لوحات معلومات حالة التذاكر</li><li>إدارة اتفاقية مستوى الخدمة</li><li>دعم متعدد القنوات (بريد إلكتروني، وسائل تواصل اجتماعي، هاتف)</li></ul><p>تقدم المستويات الأعلى (Professional, Enterprise) ميزات مثل تحليل التذاكر المدعوم بالذكاء الاصطناعي والتقارير المتقدمة والدردشة الحية.</p>`,
    price: 700,
    isStandalone: true,
    icon: Headset,
  },
    {
    id: 'books',
    name: 'Zoho Books',
    category: 'Finance',
    description: 'Manage your finances, create invoices, and track expenses effortlessly.',
    descriptionAr: 'أدِر أموالك، وأنشئ فواتير، وتتبع النفقات دون عناء.',
    longDescription: `<strong>Standard Tier:</strong><ul><li>Invoicing & Billing</li><li>Expense Tracking</li><li>Bank Reconciliation</li><li>Project Time Tracking</li><li>Basic Reports</li></ul><p>Higher tiers (Professional, Premium) add features like purchase orders, inventory management, and multi-currency handling.</p>`,
    longDescriptionAr: `<strong>الطبقة القياسية:</strong><ul><li>الفواتير والفوترة</li><li>تتبع النفقات</li><li>التسوية المصرفية</li><li>تتبع وقت المشروع</li><li>تقارير أساسية</li></ul><p>تضيف المستويات الأعلى (Professional, Premium) ميزات مثل أوامر الشراء وإدارة المخزون والتعامل متعدد العملات.</p>`,
    price: 243,
    isStandalone: true,
    icon: Book,
  },
  {
    id: 'workplace',
    name: 'Zoho Workplace',
    category: 'Collaboration',
    description: 'A suite of productivity apps: email, file storage, word processor, and more.',
    descriptionAr: 'مجموعة من تطبيقات الإنتاجية: بريد إلكتروني، تخزين ملفات، معالج نصوص، والمزيد.',
    longDescription: `<strong>Standard Tier:</strong><ul><li>Custom Domain Email</li><li>30GB Mail Storage & 5GB WorkDrive Storage</li><li>Zoho Office Suite (Writer, Sheet, Show)</li><li>Zoho Cliq (Team Chat)</li></ul><p>The Professional tier offers more storage, larger attachment limits, and advanced admin controls.</p>`,
    longDescriptionAr: `<strong>الطبقة القياسية:</strong><ul><li>بريد إلكتروني بنطاق مخصص</li><li>تخزين بريد 30 جيجابايت وتخزين 5 جيجابايت في WorkDrive</li><li>Zoho Office Suite (Writer, Sheet, Show)</li><li>Zoho Cliq (دردشة الفريق)</li></ul><p>تقدم الطبقة الاحترافية مساحة تخزين أكبر وحدودًا أعلى للمرفقات وعناصر تحكم إدارية متقدمة.</p>`,
    price: 135,
    isStandalone: true,
    icon: Briefcase,
  },
    {
    id: 'inventory',
    name: 'Zoho Inventory',
    category: 'E-commerce',
    description: 'Manage orders and inventory for your multi-channel business.',
    descriptionAr: 'أدِر الطلبات والمخزون لأعمالك متعددة القنوات.',
    longDescription: `<strong>Standard Tier:</strong><ul><li>Multi-channel order management</li><li>Inventory control</li><li>Warehouse management</li><li>Serial & batch tracking</li><li>Shipping integrations</li></ul><p>Higher tiers (Professional, Premium) support more warehouses, higher order volumes, and advanced features.</p>`,
    longDescriptionAr: `<strong>الطبقة القياسية:</strong><ul><li>إدارة الطلبات متعددة القنوات</li><li>مراقبة المخزون</li><li>إدارة المستودعات</li><li>تتبع الأرقام التسلسلية والدُفعات</li><li>تكاملات الشحن</li></ul><p>تدعم المستويات الأعلى (Professional, Premium) المزيد من المستودعات وأحجام طلبات أعلى وميزات متقدمة.</p>`,
    price: 1048.5,
    isStandalone: false,
    icon: ShoppingCart,
  },
  {
    id: 'sites',
    name: 'Zoho Sites',
    category: 'Website Builder',
    description: 'Build professional websites with a drag-and-drop interface.',
    descriptionAr: 'أنشئ مواقع ويب احترافية باستخدام واجهة سحب وإفلات.',
    longDescription: `<strong>Standard Tier:</strong><ul><li>Visual website builder</li><li>Pre-built templates</li><li>Blog & forms</li><li>Basic SEO features</li><li>E-commerce (limited products)</li></ul><p>The Professional tier offers more advanced features like membership portals, site search, and pop-ups.</p>`,
    longDescriptionAr: `<strong>الطبقة القياسية:</strong><ul><li>منشئ مواقع الويب المرئي</li><li>قوالب جاهزة</li><li>مدونة ونماذج</li><li>ميزات تحسين محركات البحث الأساسية</li><li>تجارة إلكترونية (منتجات محدودة)</li></ul><p>تقدم الطبقة الاحترافية ميزات أكثر تقدمًا مثل بوابات العضوية والبحث في الموقع والنوافذ المنبثقة.</p>`,
    price: 280,
    isStandalone: true,
    icon: MonitorPlay
  },
  {
    id: ZOHO_ONE_ID,
    name: 'Zoho One',
    category: 'All-in-One Suite',
    description: 'The operating system for business. A full suite of 45+ integrated apps.',
    descriptionAr: 'نظام التشغيل للأعمال. مجموعة كاملة من أكثر من 45 تطبيقًا متكاملاً.',
    longDescription: `<p>Zoho One includes Enterprise or Premium level versions of almost every Zoho application, all centrally managed. It is designed to run your entire business. Instead of buying individual apps, you get a full suite covering Sales, Marketing, Support, Finance, HR, and Operations.</p><p>It's like buying an open ticket to a full amusement park for the price of just a few rides.</p>`,
    longDescriptionAr: `<p>يتضمن Zoho One إصدارات على مستوى Enterprise أو Premium من كل تطبيق من تطبيقات Zoho تقريبًا، وكلها مُدارة مركزيًا. إنه مصمم لإدارة أعمالك بالكامل. بدلاً من شراء تطبيقات فردية، تحصل على مجموعة كاملة تغطي المبيعات والتسويق والدعم والتمويل والموارد البشرية والعمليات.</p><p>الأمر يشبه شراء تذكرة مفتوحة لمدينة ملاهي كاملة بسعر عدد قليل من الألعاب.</p>`,
    price: ZOHO_ONE_PRICE_ALL_EMPLOYEES,
    isStandalone: true,
    icon: Globe,
  },
];
