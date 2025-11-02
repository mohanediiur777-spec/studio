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
import { ZOHO_SERVICES } from '@/lib/constants';

export default function ProposalPage() {
  const router = useRouter();
  const { companyInfo, industryInfo, pricing, resetApp, selectedServices } = useApp();
  const { toast } = useToast();
  const { t, lang, setLang } = useTranslation();

  useEffect(() => {
    if (!companyInfo || !pricing) {
      router.replace('/tool/company-info');
    }
  }, [companyInfo, pricing, router]);

  if (!companyInfo || !pricing || !industryInfo) {
    return null;
  }
  
  const generateProposalText = (type: 'quick' | 'detailed') => {
    const servicesInProposal = ZOHO_SERVICES.filter(s => selectedServices?.includes(s.id));
    let proposal = '';

    if (type === 'quick') {
        proposal += `${t.proposal.title}\n`;
        proposal += `==================================\n\n`;
        proposal += `${t.proposal.preparedFor}: ${companyInfo.companyName}\n`;
        proposal += `${t.proposal.preparedBy}: ${companyInfo.salesRepName}\n\n`;
        proposal += `----------------------------------\n`;
        proposal += `**${t.proposal.finalPackage}**\n`;
        proposal += `${t.proposal.totalCost}: ${pricing.totalCost.toFixed(2)} ${t.common.currency}\n`;
        if (pricing.useZohoOne) {
            proposal += `${t.pricing.zohoOneBundle}\n`;
            if (pricing.savings > 0) {
              proposal += `${t.proposal.savings}: ${pricing.savings.toFixed(2)} ${t.common.currency}\n`;
            }
        } else {
            proposal += `${t.proposal.services}: ${pricing.services.join(', ')}\n`;
        }
    } else {
        proposal += `# ${t.proposal.title}\n\n`;
        proposal += `## ${t.proposal.clientInfo}\n`;
        proposal += `- **${t.proposal.preparedFor}:** ${companyInfo.companyName}\n`;
        proposal += `- **${t.proposal.website}:** ${companyInfo.companyWebsite}\n`;
        proposal += `- **${t.proposal.preparedBy}:** ${companyInfo.salesRepName}\n\n`;
        proposal += `## Industry & Challenges\n`;
        proposal += `**Industry:** ${industryInfo.industry}\n`;
        proposal += `**General Challenges:**\n${industryInfo.generalChallenges.map(c => `- ${c}`).join('\n')}\n\n`;
        if (industryInfo.specificChallenges) {
            proposal += `**Client-Specific Challenges:**\n${industryInfo.specificChallenges}\n\n`;
        }
        proposal += `## Recommended Solution\n\n`;
        if (pricing.useZohoOne) {
            proposal += `### ${t.pricing.zohoOneBundle}\n`;
            proposal += `The comprehensive Zoho One suite is recommended to address your needs with a unified platform.\n\n`;
        } else {
            proposal += `### ${t.proposal.customPackage}\n`;
            proposal += `Based on the identified challenges, the following services are recommended:\n\n`;
            servicesInProposal.forEach(service => {
                proposal += `#### ${service.name}\n`;
                proposal += `${lang === 'ar' ? service.descriptionAr : service.description}\n\n`;
            });
        }
        proposal += `## Pricing Summary\n`;
        proposal += `**${t.proposal.totalCost}:** ${pricing.totalCost.toFixed(2)} ${t.common.currency}\n`;
        if (pricing.useZohoOne && pricing.savings > 0) {
            proposal += `**${t.proposal.savings}:** ${pricing.savings.toFixed(2)} ${t.common.currency}\n`;
        }
    }
    return proposal;
  };

  const handleDownload = (type: 'quick' | 'detailed') => {
    logProposalDownload({ type, lang });

    const proposalText = generateProposalText(type);
    const blob = new Blob([proposalText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Zoho_Proposal_${companyInfo.companyName.replace(/\s+/g, '_')}_${type}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: t.proposal.downloadInitiated,
      description: t.proposal.downloadDescription
        .replace('{type}', type)
        .replace('{lang}', lang === 'en' ? 'English' : 'Arabic'),
    });
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
                        <FileText className="mr-2 h-4 w-4" /> {text.quick} (.txt)
                    </Button>
                    <Button size="lg" variant="secondary" className="flex-1" onClick={() => handleDownload('detailed')}>
                         <FileText className="mr-2 h-4 w-4" /> {text.detailed} (.txt)
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
