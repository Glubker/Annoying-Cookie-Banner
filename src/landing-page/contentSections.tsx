
const DocsUrl = 'https://docs.opensaas.sh'
const GithubUrl = 'https://github.com/wasp-lang/open-saas'
const BlogUrl = 'https://docs.opensaas.sh'

export const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#' },
  { name: 'Documentation', href: 'https://docs.opensaas.sh' },
  { name: 'Blog', href: '#' },
];
export const features = [
  {
    name: 'Open-Source Philosophy',
    description:
      'The repo and framework are 100% open-source, and so are the services wherever possible. Still missing something? Contribute!',
    icon: '🤝',
    href: DocsUrl,
  },
  {
    name: 'DIY Auth, Done For You',
    description: 'Pre-configured full-stack Auth that you own. No 3rd-party services or hidden fees.',
    icon: '🔐',
    href: DocsUrl + '/guides/authentication/',
  },
  {
    name: 'Full-stack Type Safety',
    description:
      'Full support for TypeScript with auto-generated types that span the whole stack. Nothing to configure!',
    icon: '🥞',
    href: DocsUrl,
  },
  {
    name: 'Stripe Integration',
    description: "No SaaS is complete without payments. That's why payments and the necessary webhooks are built-in.",
    icon: '💸',
    href: DocsUrl + '/guides/stripe-integration/',
  },
  {
    name: 'Admin Dashboard',
    description: 'Graphs! Tables! Analytics w/ Plausible or Google! All in one place. Ooooooooooh.',
    icon: '📈',
    href: DocsUrl + '/general/admin-dashboard/',
  },
  {
    name: 'Email Sending',
    description:
      'Email sending built-in. Combine it with the cron jobs feature to easily send emails to your customers.',
    icon: '📧',
    href: DocsUrl + '/guides/email-sending/',
  },
  {
    name: 'OpenAI API Implemented',
    description: 'Have a sweet AI-powered app concept? Get your idea shipped to potential customers in days!',
    icon: '🤖',
    href: DocsUrl,
  },
  {
    name: 'File Uploads with AWS',
    description: 'File upload examples with AWS S3 presigned URLs are included and fully documented!',
    icon: '📁',
    href: DocsUrl + '/guides/file-uploading/',
  },
  {
    name: 'Blog w/ Astro',
    description:
      'Built-in blog with the Astro framework. Write your posts in Markdown, and watch your SEO performance take off.',
    icon: '📝',
    href: DocsUrl + '/start/guided-tour/',
  },
  {
    name: 'Deploy Anywhere. Easily.',
    description:
      'No vendor lock-in because you own all your code. Deploy yourself, or let Wasp deploy it for you with a single command.',
    icon: '🚀 ',
    href: DocsUrl + '/guides/deploying/',
  },
  {
    name: 'E2E Tests w/ Playwright',
    description: 'Move fast without breaking too much. Tests and a CI pipeline w/ GitHub Actions are set up for you.',
    icon: '🧪',
    href: DocsUrl + '/guides/tests/',
  },
  {
    name: 'Complete Documentation & Support',
    description: "We don't leave you hanging. We have detailed docs and a Discord community to help!",
    icon: '🫂',
    href: DocsUrl,
  },
];
export const testimonials = [
  {
    name: 'Max Khamrovskyi',
    role: 'Senior Eng @ Red Hat',
    avatarSrc: 'https://pbs.twimg.com/profile_images/1719397191205179392/V_QrGPSO_400x400.jpg',
    socialUrl: 'https://twitter.com/maksim36ua',
    quote: 'I used Wasp to build and sell my AI-augmented SaaS app for marketplace vendors within two months!',
  },
  {
    name: 'Tim Skaggs',
    role: 'Founder @ Antler US',
    avatarSrc: 'https://pbs.twimg.com/profile_images/1802196804236091392/ZG0OE_fO_400x400.jpg',
    socialUrl: 'https://twitter.com/tskaggs',
    quote: 'Nearly done with a MVP in 3 days of part-time work... and deployed on Fly.io in 10 minutes.',
  },
  {
    name: 'Jonathan Cocharan',
    role: 'Entrepreneur',
    avatarSrc: 'https://pbs.twimg.com/profile_images/926142421653753857/o6Hmcbr7_400x400.jpg',
    socialUrl: 'https://twitter.com/jonathancocharan',
    quote:
      'In just 6 nights... my SaaS app is live 🎉! Huge thanks to the amazing @wasplang community 🙌 for their guidance along the way. These tools are incredibly efficient 🤯!',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'Why is this SaaS Template free and open-source?',
    answer:
      'We believe the best product is made when the community puts their heads together. We also believe a quality starting point for a web app should be free and available to everyone. Our hope is that together we can create the best SaaS template out there and bring our ideas to customers quickly.',
  },
  {
    id: 2,
    question: "What's Wasp?",
    href: 'https://wasp-lang.dev',
    answer: "It's the fastest way to develop full-stack React + NodeJS + Prisma apps and it's what gives this template superpowers. Wasp relies on React, NodeJS, and Prisma to define web components and server queries and actions. Wasp's secret sauce is its compiler which takes the client, server code, and config file and outputs the client app, server app and deployment code, supercharging the development experience. Combined with this template, you can build a SaaS app in record time.",
  },
];
export const footerNavigation = {
  app: [
    { name: 'Github', href: GithubUrl },
    { name: 'Documentation', href: DocsUrl },
    { name: 'Blog', href: BlogUrl },
  ],
  company: [
    { name: 'About', href: 'https://wasp-lang.dev' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};