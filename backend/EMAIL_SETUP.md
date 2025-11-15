# Email Configuration Guide

This document explains how to configure email notifications for the Inviktours booking system.

## Features

The system automatically sends emails for:

1. **New Booking Confirmation** (to customer)
   - Sent when a customer creates a new booking
   - Includes booking reference, tour details, participant count
   - Confirms booking is pending review

2. **New Booking Notification** (to admin)
   - Sent when a new booking is created
   - Includes all booking details for review
   - Helps admin track new reservations

3. **Booking Status Updates** (to customer)
   - Sent when booking status changes (confirmed, cancelled, completed)
   - Includes updated status and relevant information

## SMTP Configuration

### Option 1: Gmail (Recommended for Testing)

1. **Enable 2-Step Verification** on your Gmail account
2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Copy the generated 16-character password

3. **Add to .env file**:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_FROM_EMAIL=noreply@inviktours.com
SMTP_REPLY_TO=info@inviktours.com
ADMIN_EMAIL=admin@inviktours.com
```

### Option 2: SendGrid

1. **Create SendGrid account** at https://sendgrid.com
2. **Create API Key** in Settings > API Keys
3. **Add to .env file**:
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USERNAME=apikey
SMTP_PASSWORD=your-sendgrid-api-key
SMTP_FROM_EMAIL=noreply@inviktours.com
SMTP_REPLY_TO=info@inviktours.com
ADMIN_EMAIL=admin@inviktours.com
```

### Option 3: Mailgun

1. **Create Mailgun account** at https://www.mailgun.com
2. **Get SMTP credentials** from Sending > Domain Settings
3. **Add to .env file**:
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USERNAME=your-mailgun-username
SMTP_PASSWORD=your-mailgun-password
SMTP_FROM_EMAIL=noreply@inviktours.com
SMTP_REPLY_TO=info@inviktours.com
ADMIN_EMAIL=admin@inviktours.com
```

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `SMTP_HOST` | SMTP server hostname | Yes | smtp.gmail.com |
| `SMTP_PORT` | SMTP port (usually 587 for TLS) | Yes | 587 |
| `SMTP_USERNAME` | SMTP username/email | Yes | your-email@gmail.com |
| `SMTP_PASSWORD` | SMTP password/API key | Yes | your-app-password |
| `SMTP_FROM_EMAIL` | "From" email address | No* | noreply@inviktours.com |
| `SMTP_REPLY_TO` | "Reply-To" email address | No* | info@inviktours.com |
| `ADMIN_EMAIL` | Admin email for notifications | No* | admin@inviktours.com |

*Falls back to default values if not provided

## Testing Email Configuration

### Method 1: Create a Test Booking

1. Start the backend: `npm run develop`
2. Navigate to http://localhost:1337/admin
3. Go to Content Manager > Bookings
4. Create a new booking
5. Check your email inbox

### Method 2: Use Strapi Email Test

1. Go to Settings > Email Plugin
2. Click "Test Email Delivery"
3. Enter a test email address
4. Click "Send Test Email"

## Email Templates

Email templates are defined in `/backend/src/api/booking/content-types/booking/lifecycles.ts`

To customize emails:

1. Open the `lifecycles.ts` file
2. Modify the HTML templates in the `afterCreate` and `afterUpdate` hooks
3. Restart Strapi to apply changes

## Troubleshooting

### Emails not sending

1. **Check Strapi logs** for error messages
2. **Verify SMTP credentials** are correct
3. **Check email provider settings**:
   - Gmail: Enable "Less secure app access" or use App Password
   - Check if emails are in spam folder
4. **Test SMTP connection** using a tool like telnet:
   ```bash
   telnet smtp.gmail.com 587
   ```

### Emails going to spam

1. **Add SPF record** to your domain:
   ```
   v=spf1 include:_spf.google.com ~all
   ```

2. **Add DKIM** if supported by your provider

3. **Use a verified domain** for SMTP_FROM_EMAIL

### Error: "self signed certificate in certificate chain"

Add to .env:
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0
```

**⚠️ Only use for development!** In production, use proper SSL certificates.

## Production Deployment

### Strapi Cloud

1. Add environment variables in Strapi Cloud dashboard:
   - Settings > Environment Variables
   - Add all SMTP_* variables
   - Restart application

### Self-Hosted

1. Add SMTP credentials to your `.env` file
2. Ensure `.env` is **NOT** committed to git (use `.env.example` for documentation)
3. Configure firewall to allow SMTP port (587) outbound connections
4. Restart Strapi

## Email Content Customization

### Customer Confirmation Email

Location: `lifecycles.ts` → `afterCreate` hook

Contains:
- Booking reference number
- Tour details (name, dates)
- Participant count
- Status badge
- Special requests (if any)
- Next steps information

### Admin Notification Email

Location: `lifecycles.ts` → `afterCreate` hook (second email)

Contains:
- Booking reference
- Customer details (name, email, phone)
- Tour information
- Participant count
- Special requests

### Status Update Email

Location: `lifecycles.ts` → `afterUpdate` hook

Sent when status changes to:
- `confirmed` - Green theme
- `cancelled` - Red theme
- `completed` - Blue theme

## Security Best Practices

1. **Never commit** SMTP credentials to git
2. **Use environment variables** for all sensitive data
3. **Use App Passwords** instead of account passwords
4. **Enable 2FA** on email accounts
5. **Rotate credentials** regularly
6. **Use dedicated email account** for sending (e.g., noreply@inviktours.com)
7. **Monitor bounce rates** and email deliverability

## Additional Resources

- [Strapi Email Plugin Documentation](https://docs.strapi.io/dev-docs/plugins/email)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [SendGrid SMTP](https://docs.sendgrid.com/for-developers/sending-email/integrating-with-the-smtp-api)

## Support

For issues or questions:
- Check Strapi logs: `npm run develop` (look for email-related errors)
- Review this documentation
- Contact development team

---

**Last Updated:** 2025-01-15
