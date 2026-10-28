IFT LIFE SCIENCES — MULTI-PAGE STATIC WEBSITE
================================================

FILES
- index.html: Home
- about.html: About
- products.html: Product portfolio
- services.html: Services
- quality.html: Quality and compliance information
- contact.html: Contact form
- privacy.html: Draft privacy policy
- assets/styles.css: Responsive styling
- assets/main.js: Mobile menu, product filters, contact form
- functions/api/contact.js: Cloudflare Pages Function for email delivery via Resend
- robots.txt and sitemap.xml: basic SEO files

IMPORTANT: FIXED THE BLANK PAGE FAILURE MODE
The main content is visible without JavaScript. This website does not use an animation setup that leaves all content hidden when JavaScript fails.

DEPLOY ON CLOUDFLARE PAGES
1. Extract the ZIP file.
2. Create or open a Cloudflare Pages project.
3. Upload the extracted folder using Direct Upload, or deploy the folder from a connected Git repository.
4. Keep the `functions` folder at the project root; it must not be inside `assets`.
5. Use no build command. Set the output/build directory to the project root (often entered as `/` or left blank for Direct Upload, depending on the Cloudflare workflow).
6. Deploy. Test the home, About, Products, Services, Quality, Contact and Privacy pages.

MAKE THE CONTACT FORM SEND EMAILS (REQUIRED SETUP)
The form uses a Cloudflare Pages Function and Resend. It will show a clear configuration message until the environment variables are added.

A. Create/verify your Resend account and set up a sender domain/email according to Resend's current verification requirements.
B. In Cloudflare Pages project settings, add these environment variables for Production (and Preview too if you want preview form testing):
   RESEND_API_KEY = your Resend API key
   CONTACT_TO_EMAIL = the official IFT inbox that should receive enquiries
   CONTACT_FROM_EMAIL = the verified sender address permitted by your Resend account
C. Redeploy after adding the variables.
D. Test the contact form using a real enquiry and confirm it reaches the inbox.
Do not put API keys in HTML, JavaScript, or public repository files. Keep secrets only in Cloudflare environment variables.
If using a provider other than Resend, the function needs adapting.

BUSINESS DETAILS THAT MUST BE VERIFIED BEFORE GO-LIVE
- Official email, phone/WhatsApp number, registered/office address
- Logo and approved product pack images
- Exact product compositions/strengths, pack sizes and current availability
- Company identity, licences, certifications and manufacturing claims
This site intentionally does not invent WHO-GMP certification, years in business, staff counts, manufacturing sites, or other unsupported claims. Product information is based on the supplied product list and must be confirmed against current official documents.
The Privacy Policy is a draft template; the owner should review it against actual practices and applicable law before publication.

SEO INCLUDED
- Unique title and meta description on each page
- Canonical and Open Graph tags
- Semantic page structure and responsive layout
- Sitemap.xml and robots.txt
- Organization structured data on the homepage
- Internal navigation and product enquiry links
- Product and company content written cautiously, without unverified certification claims

CONTACT FORM SECURITY / LIMITATIONS
- Server-side input validation and HTML escaping
- Email recipient/sender are environment variables
- No CAPTCHA/rate-limiting is included. Consider adding Turnstile or another abuse-control mechanism before heavy public traffic.
