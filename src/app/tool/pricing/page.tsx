'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/hooks/useApp';
import { ZOHO_SERVICES, ZOHO_ONE_ID, ZOHO_ONE_PRICE_ALL_EMPLOYEES, ZOHO_ONE_PRICE_FLEXIBLE } from '@/lib/constants';
import { logPricingView } from '@/lib/actions';
import StepContainer from '@/components/tool/StepContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Tag } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useTranslation } from '@/context/TranslationContext';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function PricingPage() {
  const router = useRouter();
  const { selectedServices: serviceIds, setSelectedServices, pricing, setPricing } = useApp();
  const { t, lang } = useTranslation();
  
  const [showZohoOne, setShowZohoOne] = useState(pricing?.useZohoOne || false);
  const [zohoOneTier, setZohoOneTier] = useState<'all' | 'flexible'>(pricing?.zohoOneTier || 'all');

  const zohoOnePrice = zohoOneTier === 'all' ? ZOHO_ONE_PRICE_ALL_EMPLOYEES : ZOHO_ONE_PRICE_FLEXIBLE;

  useEffect(() => {
    if (!serviceIds || serviceIds.length === 0) {
      router.replace('/tool/services');
    } else {
        logPricingView();
    }
  }, [serviceIds, router]);

  const { services, individualCost, nonStandaloneServices } = useMemo(() => {
    if (!serviceIds) return { services: [], individualCost: 0, nonStandaloneServices: [] };
    
    const selected = ZOHO_SERVICES.filter(s => serviceIds.includes(s.id) && s.id !== ZOHO_ONE_ID);
    const cost = selected.reduce((sum, s) => sum + s.price, 0);
    const nonStandalone = selected.filter(s => !s.isStandalone);

    return { services: selected, individualCost: cost, nonStandaloneServices: nonStandalone };
  }, [serviceIds]);
  
  useEffect(() => {
    if (nonStandaloneServices.length > 0) {
      setShowZohoOne(true);
    }
  }, [nonStandaloneServices]);


  const handleZohoOneToggle = (checked: boolean) => {
    setShowZohoOne(checked);
    const currentServices = new Set(serviceIds);
    if(checked) {
        currentServices.add(ZOHO_ONE_ID);
    } else {
        currentServices.delete(ZOHO_ONE_ID);
    }
    setSelectedServices(Array.from(currentServices));
  };

  const finalCost = showZohoOne ? zohoOnePrice : individualCost;
  const savings = showZohoOne ? individualCost - zohoOnePrice : 0;

  const handleSubmit = () => {
    setPricing({
        services: services.map(s => s.name),
        totalCost: finalCost,
        useZohoOne: showZohoOne,
        savings,
        zohoOneTier,
        currency: 'EGP'
    });
    router.push('/tool/proposal');
  };

  return (
    <StepContainer
      title={t.pricing.title}
      description={t.pricing.description}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.pricing.selectedServices}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {services.map(service => (
                  <li key={service.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <service.icon className="h-5 w-5 text-muted-foreground" />
                      <span>{service.name}</span>
                    </div>
                    <span className="font-mono font-medium">{service.price.toFixed(2)} {t.common.currency}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
                <div className="flex justify-between items-center w-full font-bold">
                    <span>{t.pricing.individualTotal}</span>
                    <span className="font-mono">{individualCost.toFixed(2)} {t.common.currency}</span>
                </div>
            </CardFooter>
          </Card>

          {nonStandaloneServices.length > 0 && !showZohoOne && (
             <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{t.pricing.bundlingRequiredTitle}</AlertTitle>
                <AlertDescription>
                  {t.pricing.bundlingRequiredDescription}
                </AlertDescription>
              </Alert>
          )}

        </div>
        <div className="space-y-6">
          <Card className={`transition-all ${showZohoOne ? 'border-primary shadow-lg' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{t.pricing.zohoOneBundle}</CardTitle>
                <Switch checked={showZohoOne} onCheckedChange={handleZohoOneToggle} disabled={nonStandaloneServices.length > 0} />
              </div>
              <CardDescription>{t.pricing.zohoOneDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground">{t.pricing.price}</span>
                <span className="font-mono text-2xl font-bold">{zohoOnePrice.toFixed(2)} {t.common.currency}</span>
              </div>
              {showZohoOne && (
                <>
                <Separator />
                <RadioGroup value={zohoOneTier} onValueChange={(v) => setZohoOneTier(v as 'all' | 'flexible')}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="all" id="all" />
                        <Label htmlFor="all">{t.pricing.allEmployees}</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="flexible" id="flexible" />
                        <Label htmlFor="flexible">{t.pricing.flexibleUser}</Label>
                    </div>
                </RadioGroup>
                <Separator />
                {
                savings > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Tag className="h-4 w-4" />
                    <span className="font-medium">{t.pricing.savingsText.replace('{amount}', savings.toFixed(2))}</span>
                  </div>
                ) : savings < 0 ? (
                    <div className="flex items-center gap-2 text-amber-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">{t.pricing.moreCostText.replace('{amount}', (-savings).toFixed(2))}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">{t.pricing.allInOneEnabled}</span>
                    </div>
                )
              }
              </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            {t.common.back}
          </Button>
          <Button onClick={handleSubmit} disabled={nonStandaloneServices.length > 0 && !showZohoOne}>
            {t.common.generateProposal}
          </Button>
        </div>
    </StepContainer>
  );
}
