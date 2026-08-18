# ShieldHER 🛡️

ShieldHER is a personal safety web app designed to help protect women in
emergency situations. It listens for distress sounds and can instantly
alert emergency contacts with your live location.

## Features

- **SOS Button** — one tap opens your messaging app with a pre-filled
  emergency alert (message + Google Maps location link) ready to send to
  every saved contact.
- **Audio Guard** — uses the Web Audio API to monitor ambient sound
  locally in the browser. If it detects a sudden, sustained loud sound
  (e.g. screaming), it automatically triggers an SOS alert. Audio is
  never recorded or uploaded — analysis happens entirely on-device.
- **Location Sharing** — captures your current GPS location and includes
  a Google Maps link in the alert message sent to contacts.
- **Emergency Contacts** — add/remove trusted contacts, stored locally
  in your browser (`localStorage`).
- **Activity Log** — a local history of alerts and Audio Guard activity.

## Tech Stack

- HTML, CSS, JavaScript (vanilla, no frameworks or build step)
- Web Audio API (`AudioContext`, `AnalyserNode`) for sound detection
- Geolocation API for location capture
- `localStorage` for contacts and activity log

## File Structure

| File                  | Purpose                                      |
|-----------------------|-----------------------------------------------|
| `index.html`          | App structure/UI                              |
| `style.css`            | Styling and theme                             |
| `app.js`               | Wires up UI, contacts, SOS flow, activity log |
| `audio-detection.js`   | Microphone monitoring & distress detection    |
| `location-alert.js`    | Geolocation capture & alert message building  |

## Running Locally

Because the app uses microphone and geolocation permissions, it must be
served over HTTPS or `localhost` (opening the file directly won't work):

```bash
git clone https://github.com/PriyaDharshiniH123/ShieldHER.git
cd ShieldHER
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Live Demo

Enable GitHub Pages (Settings → Pages → deploy from `main` branch) to get
a public HTTPS link for testing on mobile.

## Disclaimer

This is a prototype/student project. Real SMS delivery isn't automatic —
tapping SOS opens your phone's messaging app pre-filled with the alert;
you (or your contact) still need to tap send. True silent auto-send would
require a backend + SMS gateway (e.g. Twilio), which is a possible future
addition.
