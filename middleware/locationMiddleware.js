const axios = require("axios");

// Helper to get client IP
function getClientIp(req) {
  const xForwardedFor = req.headers['x-forwarded-for'];
  const rawIp = xForwardedFor ? xForwardedFor.split(',')[0].trim() : req.socket.remoteAddress;

  // Handle localhost
  // if (rawIp === '::1' || rawIp === '127.0.0.1') {
  //   console.log('Local IP detected, simulating SG access');
  //   return '182.55.0.1'; // a Singapore IP for local testing
  // }

 
  return rawIp;
}

// Geo lookup using ip-api
async function checkGeoLocation(ip) {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    return response.data;
  } catch (error) {

    return null;
  }
}

// Middleware to restrict access to Singapore
async function locationMiddleware(req, res, next) {
  const ip = getClientIp(req);
  const geo = await checkGeoLocation(ip);

  if (geo && geo.countryCode === 'SG') {
    req.geo = geo;
    return next();
  } else {
    // console.log(`Blocked access from ${geo?.country || 'unknown'}`);
    return res.status(403).json({
      allowed: false,
      message: 'Access restricted to Singapore only.',
    });
  }
}

module.exports = { locationMiddleware };
