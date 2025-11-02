'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/hooks/useApp';
import { logProposalDownload } from '@/lib/actions';
import StepContainer from '@/components/tool/StepContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Download, FileText } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const proposalText = {
    en: {
        title: "Your Custom Zoho Solution Proposal",
        success: "Proposal Generated Successfully!",
        summary: "Proposal Summary",
        clientInfo: "Client Information",
        company: "Company",
        website: "Website",
        preparedFor: "Prepared for",
        preparedBy: "Prepared by",
        finalPackage: "Final Package",
        totalCost: "Total Monthly Cost",
        savings: "Savings with Zoho One",
        includes: "Includes",
        services: "services",
        download: "Download Proposal",
        quick: "Quick",
        detailed: "Detailed",
    },
    ar: {
        title: "مقترح حلول Zoho المخصص لك",
        success: "تم إنشاء المقترح بنجاح!",
        summary: "ملخص المقترح",
        clientInfo: "معلومات العميل",
        company: "الشركة",
        website: "الموقع الإلكتروني",
        preparedFor: "مُعد لـ",
        preparedBy: "مُعد بواسطة",
        finalPackage: "الباقة النهائية",
        totalCost: "التكلفة الشهرية الإجمالية",
        savings: "التوفير مع Zoho One",
        includes: "تشمل",
        services: "خدمات",
        download: "تحميل المقترح",
        quick: "سريع",
        detailed: "مفصل",
    }
}

export default function ProposalPage() {
  const router = useRouter();
  const { companyInfo, pricing, resetApp } = useApp();
  const { toast } = useToast();
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const text = proposalText[lang];

  useEffect(() => {
    if (!companyInfo || !pricing) {
      router.replace('/tool/company-info');
    }
  }, [companyInfo, pricing, router]);

  if (!companyInfo || !pricing) {
    return null;
  }

  const handleDownload = (type: 'quick' | 'detailed') => {
    logProposalDownload({ type, lang });
    toast({
      title: 'Download Initiated',
      description: `Your ${type} proposal in ${lang === 'en' ? 'English' : 'Arabic'} is being prepared.`,
    });
  };
  
  const handleNewProposal = () => {
    resetApp();
    router.push('/tool/company-info');
  }

  return (
    <div>
        <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg p-4 flex items-center gap-4 mb-8">
            <CheckCircle className="h-6 w-6" />
            <div className="font-medium">{text.success}</div>
        </div>

      <StepContainer title={text.title} description="">
        <div className="flex justify-end mb-4">
             <Tabs defaultValue="en" onValueChange={(value) => setLang(value as 'en' | 'ar')}>
                <TabsList>
                    <TabsTrigger value="en">English</TabsTrigger>
                    <TabsTrigger value="ar">العربية</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <Card>
            <CardHeader>
              <CardTitle>{text.clientInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">{text.preparedFor}</span>
                    <span className="font-medium">{companyInfo.companyName}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">{text.website}</span>
                    <span className="font-medium">{companyInfo.companyWebsite}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-muted-foreground">{text.preparedBy}</span>
                    <span className="font-medium">{companyInfo.salesRepName}</span>
                </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>{text.finalPackage}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="text-center">
                    <p className="text-muted-foreground text-sm">{text.totalCost}</p>
                    <p className="text-4xl font-bold font-mono">${pricing.totalCost.toFixed(2)}<span className="text-base font-normal">/mo</span></p>
               </div>
               <Separator />
               <div className="text-sm space-y-2">
                    {pricing.useZohoOne ? (
                        <div className="flex justify-between items-center">
                             <span className="font-medium">Zoho One Bundle</span>
                            {pricing.savings > 0 && <span className="text-green-600 font-medium">{text.savings}: ${pricing.savings.toFixed(2)}</span>}
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Custom Package</span>
                            <span className="text-muted-foreground">{pricing.services.length} {text.services}</span>
                        </div>
                    )}
               </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5" />
                        {text.download}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="flex-1" onClick={() => handleDownload('quick')}>
                        <FileText className="mr-2 h-4 w-4" /> {text.quick} (.pdf)
                    </Button>
                    <Button size="lg" variant="secondary" className="flex-1" onClick={() => handleDownload('detailed')}>
                         <FileText className="mr-2 h-4 w-4" /> {text.detailed} (.pdf)
                    </Button>
                </CardContent>
            </Card>
        </div>

        <div className="mt-12 text-center">
            <Button onClick={handleNewProposal}>Create Another Proposal</Button>
        </div>

      </StepContainer>
    </div>
  );
}
