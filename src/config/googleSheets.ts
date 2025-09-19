// src/config/googleSheets.ts
export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  inquiryType?: string;
  country?: string;
}

// Put your Apps Script Web App URL and a simple token in .env (see README below)
const WEBAPP_URL = process.env.REACT_APP_SHEETS_WEBAPP_URL || '';
const SECRET_TOKEN = process.env.REACT_APP_SHEETS_TOKEN || '';

if (!WEBAPP_URL) {
  console.warn('REACT_APP_SHEETS_WEBAPP_URL not set. appendToSheet will fail.');
}

/**
 * Append a contact row to Google Sheets via Apps Script Web App.
 * Throws on failure.
 */
export async function appendToSheet(payload: ContactPayload) {
  if (!WEBAPP_URL) {
    throw new Error('Web app URL not configured (REACT_APP_SHEETS_WEBAPP_URL).');
  }
  // Attach token
  const body = { ...payload, token: SECRET_TOKEN };

  // Primary: send JSON
  const res = await fetch(WEBAPP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  // Try to parse response
  let json;
  try {
    json = await res.json();
  } catch (e) {
    // If server returns non-JSON or empty, throw
    if (!res.ok) {
      throw new Error(`Sheets request failed: ${res.status} ${res.statusText}`);
    } else {
      // If OK but no JSON, assume success
      return;
    }
  }

  if (!res.ok || (json && json.status && json.status !== 'success')) {
    const msg = (json && json.message) || `Sheets append failed (status ${res.status})`;
    throw new Error(msg);
  }

  // success
  return json;
}
