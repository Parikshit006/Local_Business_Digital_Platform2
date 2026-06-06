require('dotenv').config();
const mongoose = require('mongoose');
const Service = require('./models/Service');

const demoServices = [
  {
    title: 'Website Builder',
    category: 'Website',
    price: 2999,
    duration: 'monthly',
    shortDescription: 'Professional business websites built and launched within days.',
    longDescription: 'Get your business online quickly and professionally. Our Website Builder service provides you with a fully responsive, SEO-ready website designed to convert visitors into customers. We handle everything from design to deployment, ensuring a seamless experience for both you and your clients.',
    features: [
      'Responsive Design',
      'Contact Forms',
      'SEO Ready',
      'Analytics Integration'
    ],
    isActive: true
  },
  {
    title: 'Social Media Management',
    category: 'Marketing',
    price: 3999,
    duration: 'monthly',
    shortDescription: 'Comprehensive social media management to grow your online presence.',
    longDescription: 'Engage with your audience and build brand loyalty through targeted social media campaigns. Our team of experts will manage your accounts, schedule content, and track engagement to ensure maximum reach and impact across all major platforms.',
    features: [
      'Content Scheduling',
      'Instagram Management',
      'Facebook Management',
      'Engagement Tracking'
    ],
    isActive: true
  },
  {
    title: 'Google Business Profile Optimization',
    category: 'Marketing',
    price: 1999,
    duration: 'one-time',
    shortDescription: 'Optimize your Google Business Profile for maximum local visibility.',
    longDescription: 'Stand out in local search results with a fully optimized Google Business Profile. We will set up your profile, optimize keywords, and ensure your business information is accurate and compelling, driving more foot traffic and inquiries to your store.',
    features: [
      'Profile Setup',
      'Keyword Optimization',
      'Local Search Visibility',
      'Business Verification'
    ],
    isActive: true
  },
  {
    title: 'SEO Optimization',
    category: 'Marketing',
    price: 4999,
    duration: 'monthly',
    shortDescription: 'Boost your website ranking and organic traffic with expert SEO services.',
    longDescription: 'Climb the search engine rankings and attract more qualified leads with our comprehensive SEO Optimization service. We conduct in-depth keyword research, perform technical audits, and implement on-page SEO strategies to maximize your organic visibility.',
    features: [
      'Keyword Research',
      'On-page SEO',
      'Technical Audit',
      'Monthly Reports'
    ],
    isActive: true
  },
  {
    title: 'GST Registration Assistance',
    category: 'Compliance',
    price: 2499,
    duration: 'one-time',
    shortDescription: 'Hassle-free GST registration support for your business.',
    longDescription: 'Navigate the complexities of tax compliance with ease. Our GST Registration Assistance service provides step-by-step guidance, document preparation, and application support to ensure your business is fully compliant without the headache.',
    features: [
      'GST Registration',
      'Document Guidance',
      'Application Support',
      'Compliance Review'
    ],
    isActive: true
  },
  {
    title: 'Logo & Brand Identity Design',
    category: 'Branding',
    price: 3499,
    duration: 'one-time',
    shortDescription: 'Create a memorable and professional brand identity.',
    longDescription: 'Establish a strong visual presence with our Logo & Brand Identity Design service. We work closely with you to design a custom logo, define your brand colors, and create a comprehensive typography guide that resonates with your target audience.',
    features: [
      'Custom Logo',
      'Brand Colors',
      'Typography Guide',
      'Brand Assets'
    ],
    isActive: true
  },
  {
    title: 'Inventory Management Setup',
    category: 'Automation',
    price: 5999,
    duration: 'one-time',
    shortDescription: 'Streamline your stock tracking with automated inventory systems.',
    longDescription: 'Take control of your stock with our Inventory Management Setup. We integrate robust tracking tools, set up stock alerts, and provide a comprehensive reporting dashboard to help you make informed purchasing decisions and avoid stockouts.',
    features: [
      'Inventory Tracking',
      'Stock Alerts',
      'Reporting Dashboard',
      'User Training'
    ],
    isActive: true
  },
  {
    title: 'WhatsApp Business Setup',
    category: 'Automation',
    price: 1499,
    duration: 'one-time',
    shortDescription: 'Connect with customers directly through WhatsApp Business.',
    longDescription: 'Enhance your customer communication with a fully configured WhatsApp Business profile. We set up automated greetings, quick replies, and product catalogs so you can respond faster and drive sales directly through chat.',
    features: [
      'Business Profile Setup',
      'Automated Greetings',
      'Quick Replies',
      'Catalog Configuration'
    ],
    isActive: true
  },
  {
    title: 'Performance Advertising',
    category: 'Marketing',
    price: 6999,
    duration: 'monthly',
    shortDescription: 'Data-driven ad campaigns on Google and Meta platforms.',
    longDescription: 'Maximize your marketing ROI with highly targeted Performance Advertising. We manage your Google and Meta ad campaigns, continuously optimizing for the best results and providing transparent ROI reporting so you know exactly how your budget is performing.',
    features: [
      'Google Ads',
      'Meta Ads',
      'Campaign Optimization',
      'ROI Reporting'
    ],
    isActive: true
  },
  {
    title: 'Complete Digital Starter Pack',
    category: 'Bundle',
    price: 9999,
    duration: 'one-time',
    shortDescription: 'The ultimate all-in-one package to launch your business online.',
    longDescription: 'Get everything you need to establish a powerful digital presence from day one. The Complete Digital Starter Pack bundles our top services, including website setup, social media profiles, Google Business optimization, and a cohesive branding package, saving you time and money.',
    features: [
      'Website Setup',
      'Social Media Setup',
      'Google Business Profile',
      'Branding Package'
    ],
    isActive: true
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    console.log('Clearing existing services...');
    await Service.deleteMany({});
    console.log('Existing services cleared.');

    console.log('Inserting demo services...');
    const inserted = await Service.insertMany(demoServices);
    console.log(`Successfully inserted ${inserted.length} services.`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed.');
  }
};

seedDB();
