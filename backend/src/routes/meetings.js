const { google } = require('googleapis');
const { clerkClient } = require('@clerk/clerk-sdk-node');

async function scheduleMeeting(req, res) {
  try {
    console.log('Starting meeting scheduling...');
    console.log('Request body:', req.body);
    console.log('Auth:', req.auth);

    // Verify the Clerk session
    const { userId } = req.auth;
    if (!userId) {
      console.log('No userId found in request');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { date, notes } = req.body;
    if (!date) {
      console.log('No date provided');
      return res.status(400).json({ error: 'Date is required' });
    }
    console.log('Parsed date:', date);

    // Get user from Clerk
    const user = await clerkClient.users.getUser(userId);
    console.log('Found user:', user.id);
    
    // Verify Google Calendar credentials
    console.log('Checking Google Calendar credentials...');
    console.log('Calendar ID:', process.env.GOOGLE_CALENDAR_ID);
    console.log('Has service account key:', !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

    // Create service account calendar client
    const calendar = google.calendar({
      version: 'v3',
      auth: new google.auth.GoogleAuth({
        credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
        scopes: ['https://www.googleapis.com/auth/calendar'],
      }),
    });

    console.log('Calendar client created');

    // Create event using service account
    const event = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        conferenceDataVersion: 1,
        requestBody: {
          summary: 'Growth Academy Consultation',
          description: `Consultation with ${req.body.email}\n\nNotes: ${req.body.notes}`,
          start: {
            dateTime: new Date(req.body.date).toISOString(),
            timeZone: 'UTC',
          },
          end: {
            dateTime: new Date(new Date(req.body.date).getTime() + 60 * 60 * 1000).toISOString(),
            timeZone: 'UTC',
          },
          attendees: [
            { email: req.body.email }
          ],
          conferenceData: {
            createRequest: {
              requestId: `${req.body.email}-${Date.now()}`,
              conferenceSolutionKey: { type: 'hangoutsMeet' }
            }
          },
          visibility: 'public',
          transparency: 'opaque'
        },
      });
      
      res.json({ 
        success: true, 
        meetLink: event.data.hangoutLink,
        eventId: event.data.id,
        calendarLink: event.data.htmlLink
      });
  } catch (error) {
    console.error('Meeting scheduling error:', {
      message: error.message,
      stack: error.stack,
      details: error.response?.data || error.details || 'No additional details'
    });
    res.status(500).json({ 
      error: 'Failed to schedule meeting',
      details: error.message 
    });
  }
}

module.exports = { scheduleMeeting }; 