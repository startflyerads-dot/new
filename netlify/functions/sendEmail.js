import nodemailer from 'nodemailer';

export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const data = JSON.parse(event.body);

    if (!data.email || !data.firstName) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields (firstName, email)' }) };
    }

    // Configure NodeMailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '465', 10),
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const toEmail = process.env.TO_EMAIL || 'your-email@example.com';
    const subject = `New Strategy Session Request from ${data.firstName} ${data.lastName || ''}`;

    const html = `
      <h2>New Strategy Session Request</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName || ''}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
      <p><strong>Industry:</strong> ${data.industry || 'N/A'}</p>
      <p><strong>Service Type:</strong> ${data.serviceType || 'N/A'}</p>
      <p><strong>Budget:</strong> ${data.projectBudget || 'N/A'}</p>
      <p><strong>Timeline:</strong> ${data.timeline || 'N/A'}</p>
      <p><strong>Preferred Contact:</strong> ${data.preferredContact || 'N/A'}</p>
      <p><strong>Subscribe to Newsletter:</strong> ${data.newsletter ? 'Yes' : 'No'}</p>
      <h3>Project Description</h3>
      <p>${(data.description || 'N/A').replace(/\n/g, '<br/>')}</p>
    `;

    await transporter.sendMail({
      from: `"${data.firstName} ${data.lastName || ''}" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject,
      html,
      text: `
Name: ${data.firstName} ${data.lastName || ''}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Company: ${data.company || 'N/A'}
Industry: ${data.industry || 'N/A'}
Service Type: ${data.serviceType || 'N/A'}
Budget: ${data.projectBudget || 'N/A'}
Timeline: ${data.timeline || 'N/A'}
Preferred Contact: ${data.preferredContact || 'N/A'}
Subscribe to Newsletter: ${data.newsletter ? 'Yes' : 'No'}

Project Description:
${data.description || 'N/A'}
      `
    });

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('sendEmail error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Failed to send email' }) };
  }
}
