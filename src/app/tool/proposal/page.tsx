'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/hooks/useApp';
import { logProposalDownload } from '@/lib/actions';
import StepContainer from '@/components/tool/StepContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Download, FileText } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from '@/context/TranslationContext';

export default function ProposalPage() {
  const router = useRouter();
  const { companyInfo, pricing, resetApp } = useApp();
  const { toast } = useToast();
  const { t, lang, setLang } = useTranslation();

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
      title: t.proposal.downloadInitiated,
      description: t.proposal.downloadDescription
        .replace('{type}', type)
        .replace('{lang}', lang === 'en' ? 'English' : 'Arabic'),
    });
    // In a real app, you would generate a PDF here.
    // For this prototype, we just show a toast.
    console.log(`Downloading ${type} proposal in ${lang}`);
  };
  
  const handleNewProposal = () => {
    resetApp();
    router.push('/tool/company-info');
  }

  const text = t.proposal;

  return (
    <div>
        <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg p-4 flex items-center gap-4 mb-8">
            <CheckCircle className="h-6 w-6" />
            <div className="font-medium">{text.success}</div>
        </div>

      <StepContainer title={text.title} description="">
        <div className="flex justify-end mb-4">
             <Tabs defaultValue={lang} onValueChange={(value) => setLang(value as 'en' | 'ar')}>
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
                    <p className="text-4xl font-bold font-mono">{pricing.totalCost.toFixed(2)}<span className="text-base font-normal"> {t.common.currency}</span></p>
               </div>
               <Separator />
               <div className="text-sm space-y-2">
                    {pricing.useZohoOne ? (
                        <div className="flex justify-between items-center">
                             <span className="font-medium">{t.pricing.zohoOneBundle}</span>
                            {pricing.savings > 0 && <span className="text-green-600 font-medium">{text.savings}: {pricing.savings.toFixed(2)} {t.common.currency}</span>}
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <span className="font-medium">{t.proposal.customPackage}</span>
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
            <Button onClick={handleNewProposal}>{text.createAnother}</Button>
        </div>

      </StepContainer>
    </div>
  );
}
