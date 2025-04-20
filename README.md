# DuoXPy Website

A website for DuoXPy with payment processing and key delivery system.

## Features

- PayPal payment integration (EUR currency)
- Manual payment option with PayPal Friends & Family
- Instant license key display after payment
- Supabase database for key storage and management
- No authentication required

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Supabase Configuration
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key

# PayPal Configuration
REACT_APP_PAYPAL_CLIENT_ID=your-paypal-client-id
REACT_APP_PAYPAL_SECRET=your-paypal-secret
```

### 2. Database Setup

Run the SQL commands in `supabase-setup.sql` in your Supabase SQL editor to create the necessary tables and security policies.

### 3. Install Dependencies

```bash
# Install main project dependencies
npm install

# Install API dependencies
cd api
npm install
cd ..
```

### 4. Start Development Server

```bash
# Start both frontend and API servers
npm run start
```

This will start:
- Frontend: http://localhost:8080
- API: http://localhost:3000

### 5. Build for Production

```bash
# Build frontend
npm run build

# The API can be deployed separately
```

## API Endpoints

- `POST /api/generate-key`: Generate a license key after payment
- `POST /api/create-pending-key`: Create a pending key for manual payment
- `POST /api/confirm-payment`: Confirm a manual payment and generate a key
- `GET /api/get-key`: Get HTML page with a key
- `GET /api/get-link`: Get HTML page with a link

## Deployment

This project is configured for deployment on Vercel. Make sure to set up the environment variables in your Vercel project settings.

## License

This project is proprietary and not licensed for public use.
