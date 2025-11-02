'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/hooks/useApp';
import { recommendZohoServices } from '@/ai/flows/recommend-zoho-services';
import { ZOHO_SERVICES, ZohoService } from '@/lib/constants';
import StepContainer from '@/components/tool/StepContainer';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const ServiceCard = ({
  service,
  isSelected,
  onToggle,
  isRecommended,
}: {
  service: ZohoService;
  isSelected: boolean;
  onToggle: (id: string, selected: boolean) => void;
  isRecommended: boolean;
}) => (
  <Card
    className={`transition-all duration-300 ${isSelected ? 'border-primary shadow-lg' : ''}`}
  >
    <CardHeader>
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-secondary p-3 rounded-lg">
            <service.icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg font-headline">{service.name}</CardTitle>
            <CardDescription className="text-xs">{service.category}</CardDescription>
          </div>
        </div>
        <Switch checked={isSelected} onCheckedChange={(checked) => onToggle(service.id, checked)} />
      </div>
      <CardDescription className="pt-2">{service.description}</CardDescription>
      <div className="flex gap-2 pt-2">
        {isRecommended && <Badge variant="secondary">Recommended</Badge>}
        {!service.isStandalone && <Badge variant="outline">Requires Zoho One</Badge>}
      </div>
    </CardHeader>
  </Card>
);

export default function ServicesPage() {
  const router = useRouter();
  const { industryInfo, selectedServices: initialServices, setSelectedServices } = useApp();
  const { toast } = useToast();

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
        setError('Could not get AI recommendations. Please select services manually.');
        toast({ variant: 'destructive', title: 'AI Error', description: 'Could not get AI recommendations.' });
        
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
  }, [industryInfo, router, toast, initialServices]);

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
      title="Service Recommendations"
      description="Based on the challenges, we recommend the following services. Feel free to adjust the selection."
    >
      <div className="space-y-8">
        {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
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
                />
              ))}
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            Next Step
          </Button>
        </div>
      </div>
    </StepContainer>
  );
}
