'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/hooks/useApp';
import { detectIndustryFromWebsite } from '@/ai/flows/auto-detect-industry-from-website';
import { getIndustryChallenges } from '@/ai/flows/get-industry-challenges';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { INDUSTRIES } from '@/lib/constants';
import StepContainer from '@/components/tool/StepContainer';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function IndustryPage() {
  const router = useRouter();
  const { companyInfo, industryInfo, setIndustryInfo } = useApp();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [detectedIndustry, setDetectedIndustry] = useState(industryInfo?.industry || '');
  const [generalChallenges, setGeneralChallenges] = useState<string[]>(industryInfo?.generalChallenges || []);
  const [specificChallenges, setSpecificChallenges] = useState(industryInfo?.specificChallenges || '');

  const handleIndustryChange = (industry: string) => {
    setDetectedIndustry(industry);
    fetchChallenges(industry);
  };

  const fetchChallenges = useCallback(async (industry: string) => {
    if (!industry) return;
    setIsLoading(true);
    setError(null);
    try {
      const { challenges } = await getIndustryChallenges({ industry });
      setGeneralChallenges(challenges);
    } catch (err) {
      console.error(err);
      setError('Could not fetch industry challenges. Please try again.');
      toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch industry challenges.' });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  useEffect(() => {
    if (!companyInfo?.companyWebsite) {
      router.replace('/tool/company-info');
      return;
    }

    if (industryInfo?.industry) {
      setIsLoading(false);
      return;
    }

    const runDetection = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { industry } = await detectIndustryFromWebsite({ companyWebsite: companyInfo.companyWebsite! });
        setDetectedIndustry(industry);
        await fetchChallenges(industry);
      } catch (err) {
        console.error(err);
        setError('Could not automatically detect industry. Please select one manually.');
        toast({ variant: 'destructive', title: 'Detection Failed', description: 'Could not auto-detect industry.' });
      } finally {
        setIsLoading(false);
      }
    };
    
    runDetection();
  }, [companyInfo, router, fetchChallenges, industryInfo, toast]);

  const handleSubmit = () => {
    setIndustryInfo({
      industry: detectedIndustry,
      generalChallenges,
      specificChallenges,
    });
    router.push('/tool/services');
  };

  return (
    <StepContainer
      title="Industry & Challenges"
      description="We've auto-detected the industry to find common challenges. You can adjust this and add client-specific issues."
    >
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-2">Detected Industry</h3>
          {isLoading && !detectedIndustry ? (
            <Skeleton className="h-10 w-1/2" />
          ) : (
            <div className="flex items-center gap-4">
              <Select onValueChange={handleIndustryChange} value={detectedIndustry}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">General Industry Challenges</h3>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-4/5" />
            </div>
          ) : generalChallenges.length > 0 ? (
            <div className="p-4 bg-secondary/50 rounded-lg">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {generalChallenges.map((challenge, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 mt-1 shrink-0 text-amber-500"/>
                            <span>{challenge}</span>
                        </li>
                    ))}
                </ul>
            </div>
          ) : (
            <p className="text-muted-foreground">No challenges found for this industry.</p>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Client-Specific Challenges</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add any specific pain points or requirements the client mentioned. One per line.
          </p>
          <Textarea
            placeholder="e.g., Difficulty tracking sales leads through the pipeline."
            rows={5}
            value={specificChallenges}
            onChange={(e) => setSpecificChallenges(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !detectedIndustry}>
            Next Step
          </Button>
        </div>
      </div>
    </StepContainer>
  );
}
