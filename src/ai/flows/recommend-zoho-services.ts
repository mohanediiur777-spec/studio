'use server';

/**
 * @fileOverview Recommends Zoho services based on industry challenges and client-specific challenges.
 *
 * - recommendZohoServices - A function that recommends Zoho services.
 * - RecommendZohoServicesInput - The input type for the recommendZohoServices function.
 * - RecommendZohoServicesOutput - The return type for the recommendZohoServices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendZohoServicesInputSchema = z.object({
  industryChallenges: z
    .string()
    .describe('General challenges for the detected industry.'),
  clientSpecificChallenges: z
    .string()
    .describe('Specific challenges provided by the client.'),
});
export type RecommendZohoServicesInput = z.infer<
  typeof RecommendZohoServicesInputSchema
>;

const RecommendZohoServicesOutputSchema = z.object({
  recommendedServices: z
    .string()
    .describe('Recommended Zoho services based on the challenges.'),
});
export type RecommendZohoServicesOutput = z.infer<
  typeof RecommendZohoServicesOutputSchema
>;

export async function recommendZohoServices(
  input: RecommendZohoServicesInput
): Promise<RecommendZohoServicesOutput> {
  return recommendZohoServicesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendZohoServicesPrompt',
  input: {schema: RecommendZohoServicesInputSchema},
  output: {schema: RecommendZohoServicesOutputSchema},
  prompt: `You are an AI assistant that recommends Zoho services based on industry challenges and client-specific challenges.

  Industry Challenges: {{{industryChallenges}}}
  Client-Specific Challenges: {{{clientSpecificChallenges}}}

  Based on these challenges, recommend a list of Zoho services that can help address them.
  The response should be a comma-separated list of Zoho services with no extra text.  Do not explain why you are recommending each service.
  Example: Zoho CRM, Zoho Analytics, Zoho Projects
  `,
});

const recommendZohoServicesFlow = ai.defineFlow(
  {
    name: 'recommendZohoServicesFlow',
    inputSchema: RecommendZohoServicesInputSchema,
    outputSchema: RecommendZohoServicesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
