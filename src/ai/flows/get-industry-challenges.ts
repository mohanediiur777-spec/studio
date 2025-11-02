'use server';

/**
 * @fileOverview Retrieves general industry challenges based on the detected industry.
 *
 * - getIndustryChallenges - A function that retrieves industry challenges.
 * - GetIndustryChallengesInput - The input type for the getIndustryChallenges function.
 * - GetIndustryChallengesOutput - The return type for the getIndustryChallenges function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetIndustryChallengesInputSchema = z.object({
  industry: z.string().describe('The detected industry of the company.'),
});
export type GetIndustryChallengesInput = z.infer<typeof GetIndustryChallengesInputSchema>;

const GetIndustryChallengesOutputSchema = z.object({
  challenges: z.array(z.string()).describe('An array of general challenges for the detected industry.'),
});
export type GetIndustryChallengesOutput = z.infer<typeof GetIndustryChallengesOutputSchema>;

export async function getIndustryChallenges(input: GetIndustryChallengesInput): Promise<GetIndustryChallengesOutput> {
  return getIndustryChallengesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getIndustryChallengesPrompt',
  input: {schema: GetIndustryChallengesInputSchema},
  output: {schema: GetIndustryChallengesOutputSchema},
  prompt: `You are an expert in various industries and their common challenges.

  Based on the detected industry, provide a list of general challenges that companies in this industry typically face.

  Industry: {{{industry}}}

  Challenges:`,
});

const getIndustryChallengesFlow = ai.defineFlow(
  {
    name: 'getIndustryChallengesFlow',
    inputSchema: GetIndustryChallengesInputSchema,
    outputSchema: GetIndustryChallengesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
