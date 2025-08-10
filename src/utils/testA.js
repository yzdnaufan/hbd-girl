import { generateFingerprint } from './fp.js';

export const logVisit = async () => {
  try {
    const fingerprint = generateFingerprint();
    
    const visitData = {
      fingerprint: fingerprint,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };

    const response = await fetch('https://logging-hbd-production.up.railway.app/api/activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Visit logged:', result);
    return result;
  } catch (error) {
    console.error('Failed to log visit:', error);
  }
};