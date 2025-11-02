import Link from 'next/link';
import { ArrowRight, BarChart, Bot, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const features = [
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: 'AI-Powered Recommendations',
      description: 'Automatically detect industry and suggest relevant Zoho services tailored to your client\'s needs.',
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: 'Dynamic Pricing Engine',
      description: 'Instantly calculate costs, compare bundles, and show savings with our intelligent pricing system.',
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: 'Instant Proposal Generation',
      description: 'Generate professional, multilingual sales proposals in seconds and close deals faster.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative py-20 md:py-32 bg-card overflow-hidden">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
          <div className="container px-4 md:px-6 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold tracking-tighter">
                  Empower Your Sales with AI
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0">
                  The e&amp; Egypt Zoho Sales Tool helps you understand customer needs, recommend the right solutions, and create winning proposals in record time.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button asChild size="lg" className="font-bold">
                    <Link href="/tool/company-info">
                      Start Building Proposal
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="font-bold">
                    <Link href="/login">Sales Rep Login</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                 <div className="relative" data-ai-hint="abstract tech background">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
                  <img
                    src="https://picsum.photos/seed/zohosales/600/400"
                    alt="Abstract representation of data and connections"
                    className="relative rounded-lg shadow-2xl"
                    width={600}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">A Smarter Way to Sell</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Leverage cutting-edge technology to streamline your sales process from start to finish.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                      {feature.icon}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <h3 className="text-xl font-headline font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-card border-t">
        <div className="container px-4 md:px-6 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} e&amp; Egypt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
