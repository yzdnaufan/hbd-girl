export const generateFingerprint = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '14px Arial';
  ctx.fillText('Fingerprint test', 2, 2);
  
  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    languages: navigator.languages?.join(',') || '',
    platform: navigator.platform,
    cookieEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screenResolution: `${screen.width}x${screen.height}`,
    screenColorDepth: screen.colorDepth,
    canvasFingerprint: canvas.toDataURL(),
    webgl: getWebGLFingerprint(),
    touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    mediaDevices: getMediaDevicesInfo()
  };
  
  // Create a hash of the fingerprint
  return hashFingerprint(fingerprint);
};

const getWebGLFingerprint = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'not-supported';
    
    const renderer = gl.getParameter(gl.RENDERER);
    const vendor = gl.getParameter(gl.VENDOR);
    return `${vendor}-${renderer}`;
  } catch (e) {
    return 'error', e.message;
  }
};

const getMediaDevicesInfo = async () => {
  try {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.length.toString();
    }
    return 'not-supported';
  } catch (e) {
    return 'error', e.message;
  }
};

const hashFingerprint = (fingerprint) => {
  const str = JSON.stringify(fingerprint);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString();
};