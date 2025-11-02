'use server';
/**
 * @fileOverview Automatically detects the company's industry from its website content.
 *
 * - detectIndustryFromWebsite - A function that handles the industry detection process.
 * - DetectIndustryInput - The input type for the detectIndustryFromWebsite function.
 * - DetectIndustryOutput - The return type for the detectIndustryFromWebsite function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {extractTextFromWebsite} from '../../services/website-extractor';

const DetectIndustryInputSchema = z.object({
  companyWebsite: z.string().describe('The URL of the company website.'),
  websiteContent: z.string().optional(),
});
export type DetectIndustryInput = z.infer<typeof DetectIndustryInputSchema>;

const DetectIndustryOutputSchema = z.object({
  industry: z.string().describe('The detected industry of the company.'),
});
export type DetectIndustryOutput = z.infer<typeof DetectIndustryOutputSchema>;

export async function detectIndustryFromWebsite(input: {companyWebsite: string}): Promise<DetectIndustryOutput> {
  return detectIndustryFromWebsiteFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectIndustryPrompt',
  input: {schema: z.object({ websiteContent: z.string() })},
  output: {schema: DetectIndustryOutputSchema},
  prompt: `You are an expert in identifying the industry of a company based on its website content.\n\nAnalyze the following website content and determine the most likely industry the company operates in. Return ONLY the industry name, do not include any other text.\n\nWebsite Content: {{{websiteContent}}}`,
});

const detectIndustryFromWebsiteFlow = ai.defineFlow(
  {
    name: 'detectIndustryFromWebsiteFlow',
    inputSchema: DetectIndustryInputSchema,
    outputSchema: DetectIndustryOutputSchema,
  },
  async input => {
    const websiteContent = await extractTextFromWebsite(input.companyWebsite);

    if (!websiteContent) {
        return { industry: '' };
    }

    const {output} = await prompt({websiteContent});
    return {
      industry: output!.industry,
    };
  }
);
