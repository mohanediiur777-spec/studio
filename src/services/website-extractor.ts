'use server';

/**
 * Extracts text content from a given website URL.
 * NOTE: This is a simplified implementation for demonstration purposes.
 * A production version would need a more robust solution like a headless browser
 * to handle complex client-side rendered websites.
 * @param url The URL of the website to extract text from.
 * @returns The text content of the website.
 */
export async function extractTextFromWebsite(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch website: ${response.statusText}`);
    }
    const html = await response.text();
    // This is a very basic way to strip HTML tags.
    // It will not handle scripts, styles, and other non-visible content perfectly.
    const text = html
      .replace(/<style[^>]*>.*<\/style>/gs, ' ')
      .replace(/<script[^>]*>.*<\/script>/gs, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s\s+/g, ' ')
      .trim();
      
    // Limit the content size to avoid overly large payloads to the AI model
    return text.substring(0, 15000);
  } catch (error) {
    console.error('Error extracting text from website:', error);
    // It's better to return a meaningful error or empty string
    // that the calling flow can handle.
    return '';
  }
}
