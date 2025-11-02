'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/hooks/useApp';
import { recommendZohoServices } from '@/ai/flows/recommend-zoho-services';
import { ZOHO_SERVICES, ZohoService } from '@/lib/constants';
import StepContainer from '@/components/tool/StepContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, PlusCircle, MinusCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useTranslation } from '@/context/TranslationContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const ServiceCard = ({
  service,
  isSelected,
  onToggle,
  isRecommended,
  lang
}: {
  service: ZohoService;
  isSelected: boolean;
  onToggle: (id: string, selected: boolean) => void;
  isRecommended: boolean;
  lang: 'en' | 'ar';
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const description = lang === 'ar' ? service.descriptionAr : service.description;
  const longDescription = lang === 'ar' ? service.longDescriptionAr : service.longDescription;


  return (
  <Collapsible open={isOpen} onOpenChange={setIsOpen}>
    <Card
      className={`transition-all duration-300 ${isSelected ? 'border-primary shadow-lg' : ''}`}
    >
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-secondary/20 p-3 rounded-lg">
              <service.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-headline">{service.name}</CardTitle>
              <CardDescription className="text-xs">{service.category}</CardDescription>
            </div>
          </div>
          <Switch checked={isSelected} onCheckedChange={(checked) => onToggle(service.id, checked)} />
        </div>
        <CardDescription className="pt-2">{description}</CardDescription>
        <div className="flex gap-2 pt-2 items-center">
          {isRecommended && <Badge variant="secondary">Recommended</Badge>}
          {!service.isStandalone && <Badge variant="outline">Requires Zoho One</Badge>}
           <CollapsibleTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto p-0 h-auto">
                    {isOpen ? <MinusCircle className="mr-1 h-4 w-4" /> : <PlusCircle className="mr-1 h-4 w-4" />}
                    {isOpen ? 'Show Less' : 'Show More'}
                </Button>
            </CollapsibleTrigger>
        </div>
      </CardHeader>
      <CollapsibleContent>
        <CardContent>
            <div className="prose prose-sm dark:prose-invert text-muted-foreground" dangerouslySetInnerHTML={{ __html: longDescription }}/>
        </CardContent>
      </CollapsibleContent>
    </Card>
  </Collapsible>
)};

export default function ServicesPage() {
  const router = useRouter();
  const { industryInfo, selectedServices: initialServices, setSelectedServices } = useApp();
  const { toast } = useToast();
  const { t, lang } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendedServiceIds, setRecommendedServiceIds] = useState<string[]>([]);
  const [selectedServices, setInternalSelectedServices] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!industryInfo) {
      router.replace('/tool/industry');
      return;
    }

    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const input = {
          industryChallenges: industryInfo.generalChallenges.join(', '),
          clientSpecificChallenges: industryInfo.specificChallenges,
        };
        const { recommendedServices } = await recommendZohoServices(input);
        const ids = recommendedServices.split(',').map(s => s.trim().toLowerCase().replace(/\s+/g, ''));
        setRecommendedServiceIds(ids);

        const initialSelection: Record<string, boolean> = {};
        ZOHO_SERVICES.forEach(service => {
            initialSelection[service.id] = ids.includes(service.id);
        });
        
        if (initialServices && initialServices.length > 0) {
            initialServices.forEach(id => {
                if (id in initialSelection) initialSelection[id] = true;
            });
        }
        
        setInternalSelectedServices(initialSelection);

      } catch (err) {
        console.error(err);
        setError(t.services.error);
        toast({ variant: 'destructive', title: t.services.errorTitle, description: t.services.error });
        
        const initialSelection: Record<string, boolean> = {};
        ZOHO_SERVICES.forEach(service => {
            initialSelection[service.id] = false;
        });
        setInternalSelectedServices(initialSelection);

      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [industryInfo, router, toast, initialServices, t]);

  const handleToggle = (id: string, isSelected: boolean) => {
    setInternalSelectedServices(prev => ({ ...prev, [id]: isSelected }));
  };

  const handleSubmit = () => {
    const serviceIds = Object.entries(selectedServices)
      .filter(([, isSelected]) => isSelected)
      .map(([id]) => id);
    setSelectedServices(serviceIds);
    router.push('/tool/pricing');
  };

  const sortedServices = useMemo(() => {
    return [...ZOHO_SERVICES].sort((a, b) => {
      const aSelected = selectedServices[a.id];
      const bSelected = selectedServices[b.id];
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [selectedServices]);

  return (
    <StepContainer
      title={t.services.title}
      description={t.services.description}
    >
      <div className="space-y-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>{t.services.errorTitle}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-6 w-12" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardHeader>
                </Card>
              ))
            : sortedServices.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isSelected={!!selectedServices[service.id]}
                  onToggle={handleToggle}
                  isRecommended={recommendedServiceIds.includes(service.id)}
                  lang={lang}
                />
              ))}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            {t.common.back}
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {t.common.nextStep}
          </Button>
        </div>
      </div>
    </StepContainer>
  );
}
