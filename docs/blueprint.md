# **App Name**: e& Egypt Zoho Sales Tool

## Core Features:

- User Authentication: Dual access system for sales reps and managers.
- Company Information Input: Collect required and optional company details including Sales Rep Name, Company Name, Company Website and social media links.
- Industry Detection and Challenge Fetching: Auto-detect industry from company website content, with fallback to keyword matching from a pre-defined list of 8 industries. Gather general industry challenges from a pre-defined database.
- Client-Specific Challenges Input: Allow sales rep to input specific client challenges.
- AI-Powered Service Recommendations: Suggest Zoho services based on general industry recommendations on page 2 and refined by client challenges on page 3, enabling service selection with visual toggles. This is a tool.
- Pricing & Bundling Engine: Accurately compare pricing and enforce mandatory Zoho One bundling for non-standalone apps based on selected services. Calculate and display savings or upgrade costs. Clear validation that prevents proceeding if non-standalone apps are selected without Zoho One
- Proposal Generation and Download: Generate a final proposal with summary, success message, and download options in both Quick and Detailed formats, and in both English and Arabic. Log data to Google Sheets at pricing page view and proposal download events. Persist local changes via window.storage

## Style Guidelines:

- Primary color: Saturated blue (#29ABE2) to evoke trust and professionalism, fitting for enterprise sales.
- Background color: Light grey (#F0F2F5), a desaturated near-white, for a clean, professional look that allows content to stand out.
- Accent color: A slightly darker shade of blue-cyan (#0080A8) for buttons, toggles, and highlights, creating good contrast and focus.
- Headline font: 'Poppins', a sans-serif font for headings, because of its modern and geometric look.
- Body font: 'PT Sans', a sans-serif font for body text, ensuring readability and a contemporary feel.
- Use clear and professional icons from a consistent set, like Material Design Icons, to represent different services and features.
- Employ a clean and structured layout with clear sections for company information, challenges, service recommendations, and pricing. Use whitespace effectively to avoid clutter.
- Incorporate subtle animations for loading states and transitions between proposal steps to improve user engagement.