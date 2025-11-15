/**
 * Lifecycle hooks for the booking content type
 * Sends email notifications when bookings are created or updated
 */

export default {
  async afterCreate(event) {
    const { result } = event;

    try {
      // Get the booking with populated relations
      const booking = await strapi.entityService.findOne(
        'api::booking.booking',
        result.id,
        {
          populate: {
            tour: {
              populate: {
                adventure: true,
              },
            },
            user: true,
          },
        }
      );

      if (!booking) return;

      // Send email to user
      await strapi.plugins['email'].services.email.send({
        to: booking.contactEmail,
        from: process.env.SMTP_FROM_EMAIL || 'noreply@inviktours.com',
        replyTo: process.env.SMTP_REPLY_TO || 'info@inviktours.com',
        subject: `Rezervasyon Onayı - ${booking.tour?.adventure?.title || 'Tur'}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #6BB86B 0%, #4A934A 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #6BB86B; }
                .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                .info-row:last-child { border-bottom: none; }
                .label { font-weight: bold; color: #666; }
                .value { color: #333; }
                .status { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: bold; }
                .status-pending { background: #fff3cd; color: #856404; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; color: #666; font-size: 14px; }
                .button { display: inline-block; padding: 12px 30px; background: #6BB86B; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Rezervasyon Onayı</h1>
                  <p>Rezervasyonunuz başarıyla alındı</p>
                </div>

                <div class="content">
                  <p>Merhaba <strong>${booking.contactName}</strong>,</p>

                  <p>Rezervasyon talebiniz başarıyla alındı ve şu anda inceleme aşamasındadır.</p>

                  <div class="info-box">
                    <h3 style="margin-top: 0; color: #6BB86B;">Rezervasyon Detayları</h3>

                    <div class="info-row">
                      <span class="label">Referans No:</span>
                      <span class="value">${booking.bookingReference}</span>
                    </div>

                    <div class="info-row">
                      <span class="label">Tur:</span>
                      <span class="value">${booking.tour?.adventure?.title || 'Tur'}</span>
                    </div>

                    ${booking.tour?.startDate ? `
                    <div class="info-row">
                      <span class="label">Başlangıç Tarihi:</span>
                      <span class="value">${new Date(booking.tour.startDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    ` : ''}

                    ${booking.tour?.endDate ? `
                    <div class="info-row">
                      <span class="label">Bitiş Tarihi:</span>
                      <span class="value">${new Date(booking.tour.endDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    ` : ''}

                    <div class="info-row">
                      <span class="label">Katılımcı Sayısı:</span>
                      <span class="value">${booking.numberOfParticipants} kişi</span>
                    </div>

                    <div class="info-row">
                      <span class="label">Durum:</span>
                      <span class="value"><span class="status status-pending">Onay Bekliyor</span></span>
                    </div>

                    ${booking.specialRequests ? `
                    <div class="info-row">
                      <span class="label">Özel İstekler:</span>
                      <span class="value">${booking.specialRequests}</span>
                    </div>
                    ` : ''}
                  </div>

                  <p><strong>Sonraki Adımlar:</strong></p>
                  <ul>
                    <li>Rezervasyonunuz ekibimiz tarafından incelenecektir</li>
                    <li>Onaylandıktan sonra email ile bilgilendirileceksiniz</li>
                    <li>Rezervasyon detaylarınızı hesabınızdan takip edebilirsiniz</li>
                  </ul>

                  <div class="footer">
                    <p>Sorularınız için bizimle iletişime geçebilirsiniz:<br>
                    <a href="mailto:info@inviktours.com">info@inviktours.com</a></p>

                    <p style="margin-top: 20px;">
                      <strong>Inviktours</strong><br>
                      Doğa ile buluşmanın adresi
                    </p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      // Send notification to admin
      const adminEmail = process.env.ADMIN_EMAIL || 'info@inviktours.com';
      await strapi.plugins['email'].services.email.send({
        to: adminEmail,
        from: process.env.SMTP_FROM_EMAIL || 'noreply@inviktours.com',
        subject: `Yeni Rezervasyon - ${booking.bookingReference}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
                .content { background: #f9f9f9; padding: 20px; }
                .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #3498db; }
                .info-row { padding: 8px 0; border-bottom: 1px solid #eee; }
                .label { font-weight: bold; color: #666; display: inline-block; width: 150px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🎫 Yeni Rezervasyon Bildirimi</h2>
                </div>

                <div class="content">
                  <div class="info-box">
                    <div class="info-row">
                      <span class="label">Referans No:</span>
                      ${booking.bookingReference}
                    </div>
                    <div class="info-row">
                      <span class="label">Müşteri:</span>
                      ${booking.contactName}
                    </div>
                    <div class="info-row">
                      <span class="label">Email:</span>
                      ${booking.contactEmail}
                    </div>
                    <div class="info-row">
                      <span class="label">Telefon:</span>
                      ${booking.contactPhone}
                    </div>
                    <div class="info-row">
                      <span class="label">Tur:</span>
                      ${booking.tour?.adventure?.title || 'Tur'}
                    </div>
                    <div class="info-row">
                      <span class="label">Katılımcı:</span>
                      ${booking.numberOfParticipants} kişi
                    </div>
                    ${booking.specialRequests ? `
                    <div class="info-row">
                      <span class="label">Özel İstekler:</span>
                      ${booking.specialRequests}
                    </div>
                    ` : ''}
                  </div>

                  <p><strong>Lütfen admin panelinden rezervasyonu inceleyin ve onaylayın.</strong></p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      strapi.log.info(`Booking confirmation emails sent for booking ${booking.bookingReference}`);
    } catch (error) {
      strapi.log.error('Error sending booking confirmation email:', error);
      // Don't throw error to prevent booking creation from failing
    }
  },

  async afterUpdate(event) {
    const { result, params } = event;

    try {
      // Only send email if status changed
      if (!params.data.status) return;

      // Get the booking with populated relations
      const booking = await strapi.entityService.findOne(
        'api::booking.booking',
        result.id,
        {
          populate: {
            tour: {
              populate: {
                adventure: true,
              },
            },
            user: true,
          },
        }
      );

      if (!booking || !booking.contactEmail) return;

      // Send email on status change
      let subject = '';
      let statusText = '';
      let statusColor = '';
      let message = '';

      switch (booking.status) {
        case 'confirmed':
          subject = 'Rezervasyonunuz Onaylandı';
          statusText = 'Onaylandı';
          statusColor = '#28a745';
          message = 'Harika haber! Rezervasyonunuz onaylandı. Yakında sizinle iletişime geçeceğiz.';
          break;
        case 'cancelled':
          subject = 'Rezervasyonunuz İptal Edildi';
          statusText = 'İptal Edildi';
          statusColor = '#dc3545';
          message = 'Rezervasyonunuz iptal edildi. Sorularınız için bizimle iletişime geçebilirsiniz.';
          break;
        case 'completed':
          subject = 'Rezervasyonunuz Tamamlandı';
          statusText = 'Tamamlandı';
          statusColor = '#007bff';
          message = 'Rezervasyonunuz tamamlandı. Bizimle olduğunuz için teşekkür ederiz!';
          break;
        default:
          return; // Don't send email for other status changes
      }

      await strapi.plugins['email'].services.email.send({
        to: booking.contactEmail,
        from: process.env.SMTP_FROM_EMAIL || 'noreply@inviktours.com',
        replyTo: process.env.SMTP_REPLY_TO || 'info@inviktours.com',
        subject: `${subject} - ${booking.tour?.adventure?.title || 'Tur'}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: ${statusColor}; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid ${statusColor}; }
                .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>${subject}</h1>
                  <p>Rezervasyon Durumu: ${statusText}</p>
                </div>

                <div class="content">
                  <p>Merhaba <strong>${booking.contactName}</strong>,</p>

                  <p>${message}</p>

                  <div class="info-box">
                    <h3 style="margin-top: 0;">Rezervasyon Detayları</h3>
                    <p><strong>Referans No:</strong> ${booking.bookingReference}</p>
                    <p><strong>Tur:</strong> ${booking.tour?.adventure?.title || 'Tur'}</p>
                    ${booking.tour?.startDate ? `<p><strong>Tarih:</strong> ${new Date(booking.tour.startDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>` : ''}
                  </div>

                  <div class="footer">
                    <p>Sorularınız için bizimle iletişime geçebilirsiniz:<br>
                    <a href="mailto:info@inviktours.com">info@inviktours.com</a></p>

                    <p style="margin-top: 20px;">
                      <strong>Inviktours</strong><br>
                      Doğa ile buluşmanın adresi
                    </p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      strapi.log.info(`Status update email sent for booking ${booking.bookingReference}`);
    } catch (error) {
      strapi.log.error('Error sending status update email:', error);
      // Don't throw error to prevent update from failing
    }
  },
};
