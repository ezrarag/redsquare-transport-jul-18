# Project TODOs

## Dependencies & Setup
- [x] Update package.json with all required Radix UI dependencies
- [x] Add missing form handling libraries (react-hook-form, @hookform/resolvers, zod)
- [x] Add UI utilities (next-themes, sonner)
- [x] Update React versions to fix peer dependency warnings
- [x] Fix environment variable handling for development builds
- [x] Ensure all dependencies are properly installed and configured

## Quote Modal
- [x] Implement city autocomplete for pickup/dropoff locations (with available/greyed-out cities)
- [x] Connect frontend to backend for available cities

## Firebase (Firestore) Integration
- [x] Quote requests stored in Firestore
- [x] Admin quote requests and quotes use Firestore
- [x] Stripe webhook updates Firestore documents
- [ ] Redirect users to dashboard after quote submission
- [ ] Add jobs collection in Firestore for dynamic careers page (optional)

## Client Dashboard
- [ ] Create a dashboard page for clients to view their quotes/requests
- [ ] Link dashboard after signup/quote submission

## Careers Page & QR Code
- [x] Add "Careers" to the site menu
- [x] Create a Careers page with job description and application form
- [x] Implement multi-section careers page with Hero, Join Us, Core Values, and Current Positions sections
- [x] Add animated Core Values icons with Framer Motion
- [x] Remove right sidebar from careers page
- [x] Increase video card size in Join Us section
- [x] Create contact modal component for careers page
- [x] Make floating contact button functional on careers page
- [x] Make "Apply Now" button functional on careers page
- [x] Ensure careers page menu works like landing page
- [ ] Ensure application submissions are sent to company email and stored in Firestore
- [ ] Create a QR code that links to the Careers page
- [ ] Integrate QR code generator into admin tools with options for download as image or other mediums (e.g., copy, share, print)
- [ ] Allow admins to generate QR codes for any page or campaign (e.g., quote form, careers, custom URLs)
- [ ] Document workflow for QR code usage: social media, messaging apps, print, website, etc.

## Contact Modal
- [x] Create comprehensive contact modal component
- [x] Include contact information cards (location, phone, email, hours)
- [x] Add professional contact form with validation
- [x] Implement smooth animations and professional styling
- [x] Integrate with careers page contact buttons
- [ ] Connect form submission to backend/email service

## General
- [ ] Keep this TODO list updated as we work

---

**Recent Updates:**
- ✅ Updated all dependencies and fixed peer dependency warnings
- ✅ Created comprehensive contact modal component with form validation
- ✅ Made careers page menu functional (same as landing page)
- ✅ Added floating contact button and "Apply Now" button functionality
- ✅ Fixed environment variable handling for development builds
- ✅ Updated Core Values to reflect transportation company values
- ✅ Enhanced TODO.md to reflect completed tasks

**Next Session:**
- Focus on implementing dynamic jobs table for careers page
- Complete backend integration for job applications and contact form submissions
- Work on QR code generation features
- Connect contact modal form to backend/email service 