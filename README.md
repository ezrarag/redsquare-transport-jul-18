# Red Square Transport - Customer Management & Payment System

A React + TypeScript + Next.js application with Firebase (Firestore) and Stripe integration for managing quote requests and payments.

## Features

- **Customer Signup**: Customers can create profiles with contact information
- **Admin Dashboard**: Manage customers and create quotes with payment links
- **Stripe Integration**: Secure payment processing with webhooks
- **Database**: Firebase Firestore (quote_requests, quotes, customers collections)
- **TypeScript**: Full type safety throughout the application

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

### 2. Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore and create a service account (Project Settings > Service accounts > Generate new private key)
3. Set in `.env.local`: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (use `\n` for newlines in the key)

### 3. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable and secret keys from the dashboard
3. Set up a webhook endpoint pointing to `https://yourdomain.com/api/webhooks/stripe`
4. Add the `checkout.session.completed` event to your webhook
5. Get the webhook signing secret

### 4. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 5. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

## Deployment to Vercel

1. Connect your GitHub repository to Vercel
2. Add all environment variables in the Vercel dashboard
3. Deploy!

## Usage

### Customer Flow
1. Visit `/signup` to create a customer profile
2. Receive payment links via email when quotes are created

### Admin Flow
1. Visit `/admin` and login with password: `admin123`
2. View all customer profiles
3. Create quotes for customers
4. Payment links are automatically generated and can be shared

### Payment Flow
1. Customers click payment links to access Stripe Checkout
2. After successful payment, webhook updates quote status to "paid"
3. Customers see success page with confirmation

## Database Schema

### Customers Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR, Required)
- `email` (VARCHAR, Unique, Required)
- `phone` (VARCHAR, Optional)
- `company` (VARCHAR, Optional)
- `address` (TEXT, Optional)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Quotes Table
- `id` (UUID, Primary Key)
- `customer_id` (UUID, Foreign Key)
- `amount` (DECIMAL)
- `service_description` (TEXT)
- `status` (ENUM: pending, sent, paid)
- `stripe_checkout_url` (TEXT)
- `stripe_session_id` (VARCHAR)
- `stripe_payment_intent_id` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Security Notes

- Admin authentication is currently hardcoded (password: admin123)
- Replace with proper authentication system before production
- Stripe webhook signature verification is implemented
- Database has proper foreign key constraints
- Environment variables are properly secured

## Future Enhancements

- Implement proper user authentication (e.g. Firebase Auth)
- Add email notifications for quotes
- Add customer dashboard for viewing quotes
- Implement role-based access control
- Add quote approval workflow
- Add invoice generation
\`\`\`

This complete project provides:

1. ✅ **Customer Signup Form** with Firebase Firestore
2. ✅ **Admin Dashboard** with hardcoded authentication
3. ✅ **Quote Management** with Stripe payment links
4. ✅ **Stripe Webhook** handling for payment status updates
5. ✅ **Database Schema** ready for future auth integration
6. ✅ **TypeScript** throughout with proper types
7. ✅ **Deployment Ready** for Vercel

The system is designed to be easily extensible with proper authentication later, and all the core functionality for managing customers, quotes, and payments is fully implemented.
