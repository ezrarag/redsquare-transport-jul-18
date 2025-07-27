# Project TODOs

## Quote Modal
- [x] Implement city autocomplete for pickup/dropoff locations (with available/greyed-out cities)
- [x] Connect frontend to backend for available cities

## Supabase Integration
- [ ] Confirm quote requests are stored in Supabase
- [x] Ensure .env.local is set up with Supabase keys
- [x] Improve error handling for missing Supabase environment variables
- [ ] Redirect users to dashboard after quote submission
- [ ] Fix us_cities_conformed.csv for Supabase import (Supabase error with id column)
- [ ] Add jobs table to Supabase for dynamic careers page

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
- [ ] Ensure application submissions are sent to company email and stored in Supabase
- [ ] Create a QR code that links to the Careers page
- [ ] Integrate QR code generator into admin tools with options for download as image or other mediums (e.g., copy, share, print)
- [ ] Allow admins to generate QR codes for any page or campaign (e.g., quote form, careers, custom URLs)
- [ ] Document workflow for QR code usage: social media, messaging apps, print, website, etc.

## General
- [ ] Keep this TODO list updated as we work

---

**Recent Updates:**
- Completed multi-section careers page with animated Core Values icons
- Removed right sidebar and improved video card sizing
- Enhanced Supabase error handling for missing environment variables
- Updated TODO.md to reflect completed tasks

**Next Session:**
- Focus on implementing dynamic jobs table for careers page
- Complete Supabase integration for job applications
- Work on QR code generation features 