'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/hooks/useApp';
import { ZOHO_SERVICES, ZOHO_ONE_ID, ZOHO_ONE_PRICE } from '@/lib/constants';
import { logPricingView } from '@/lib/actions';
import StepContainer from '@/components/tool/StepContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Tag } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function PricingPage() {
  const router = useRouter();
  const { selectedServices: serviceIds, setSelectedServices, pricing, setPricing } = useApp();
  
  const [showZohoOne, setShowZohoOne] = useState(pricing?.useZohoOne || false);

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


  const isZohoOneSelected = useMemo(() => serviceIds?.includes(ZOHO_ONE_ID), [serviceIds]);

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

  const finalCost = showZohoOne ? ZOHO_ONE_PRICE : individualCost;
  const savings = showZohoOne ? individualCost - ZOHO_ONE_PRICE : 0;

  const handleSubmit = () => {
    setPricing({
        services: services.map(s => s.name),
        totalCost: finalCost,
        useZohoOne: showZohoOne,
        savings,
    });
    router.push('/tool/proposal');
  };

  return (
    <StepContainer
      title="Pricing & Bundling"
      description="Review the costs, compare with Zoho One, and finalize your service package."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selected Services</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {services.map(service => (
                  <li key={service.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <service.icon className="h-5 w-5 text-muted-foreground" />
                      <span>{service.name}</span>
                    </div>
                    <span className="font-mono font-medium">${service.price}/mo</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
                <div className="flex justify-between items-center w-full font-bold">
                    <span>Individual Total</span>
                    <span className="font-mono">${individualCost.toFixed(2)}/mo</span>
                </div>
            </CardFooter>
          </Card>

          {nonStandaloneServices.length > 0 && !showZohoOne && (
             <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Bundling Required</AlertTitle>
                <AlertDescription>
                  You've selected services that require Zoho One. Please enable the Zoho One bundle to proceed.
                </AlertDescription>
              </Alert>
          )}

        </div>
        <div className="space-y-6">
          <Card className={`transition-all ${showZohoOne ? 'border-primary shadow-lg' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Zoho One Bundle</CardTitle>
                <Switch checked={showZohoOne} onCheckedChange={handleZohoOneToggle} disabled={nonStandaloneServices.length > 0} />
              </div>
              <CardDescription>All apps, one unified system.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-muted-foreground">Price</span>
                <span className="font-mono text-2xl font-bold">${ZOHO_ONE_PRICE.toFixed(2)}/mo</span>
              </div>
              <Separator />
               {showZohoOne && (
                savings > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <Tag className="h-4 w-4" />
                    <span className="font-medium">You save ${savings.toFixed(2)}/mo!</span>
                  </div>
                ) : savings < 0 ? (
                    <div className="flex items-center gap-2 text-amber-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">Costs ${(-savings).toFixed(2)}/mo more but includes all apps.</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">All-in-one suite enabled.</span>
                    </div>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={nonStandaloneServices.length > 0 && !showZohoOne}>
            Generate Proposal
          </Button>
        </div>
    </StepContainer>
  );
}
