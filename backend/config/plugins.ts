export default {
  'users-permissions': {
    enabled: true,
  },
  upload: {
    config: {
      sizeLimit: 250 * 1024 * 1024, // 250mb
      // Windows'ta Sharp EPERM sorununu çözmek için responsive formatları devre dışı bırak
      breakpoints: {},
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      settings: {
        defaultFrom: process.env.SMTP_FROM_EMAIL || 'noreply@inviktours.com',
        defaultReplyTo: process.env.SMTP_REPLY_TO || 'info@inviktours.com',
      },
    },
  },
};
