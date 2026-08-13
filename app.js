/**
 * location-alert.js
 * Handles capturing the user's current location and building/dispatching
 * an emergency alert message to saved contacts.
 */

const LocationAlert = (() => {
  let lastPosition = null;

  /** Ask the browser for the current GPS position. Returns a Promise. */
  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported on this device."));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          lastPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            timestamp: pos.timestamp,
          };
          resolve(lastPosition);
        },
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
      );
    });
  }

  function getLastPosition() {
    return lastPosition;
  }

  function mapsUrl(position) {
    if (!position) return "#";
    return `https://www.google.com/maps?q=${position.lat},${position.lng}`;
  }

  /** Build the human-readable alert text sent to a contact. */
  function buildAlertMessage(position, personName) {
    const who = personName ? personName : "Someone using ShieldHER";
    if (!position) {
      return `${who} triggered a ShieldHER SOS alert. Location was unavailable — please try calling them directly.`;
    }
    return `${who} triggered a ShieldHER SOS alert and may need help. Last known location: ${mapsUrl(
      position
    )} (accuracy ~${Math.round(position.accuracy)}m).`;
  }

  /**
   * "Send" an alert to one contact. Real SMS delivery needs a backend/SMS
   * gateway (e.g. Twilio) which this static front-end doesn't have, so we
   * open the device's own messaging app pre-filled with the alert — the
   * user just taps send. This works fully offline-safe and needs no API key.
   */
  function dispatchToContact(contact, message) {
    const phone = contact.phone.replace(/[^\d+]/g, "");
    const smsUrl = `sms:${phone}${
      /iPhone|iPad|iPod/.test(navigator.userAgent) ? "&" : "?"
    }body=${encodeURIComponent(message)}`;
    window.open(smsUrl, "_blank");
  }

  /** Fallback: copy the alert message to the clipboard. */
  async function copyMessage(message) {
    try {
      await navigator.clipboard.writeText(message);
      return true;
    } catch (e) {
      return false;
    }
  }

  return {
    getCurrentLocation,
    getLastPosition,
    mapsUrl,
    buildAlertMessage,
    dispatchToContact,
    copyMessage,
  };
})();
