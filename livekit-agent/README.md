# Voxly — AI Voice Calling Agent

LiveKit + Google Gemini + Vobiz SIP voice agent for inbound & outbound phone calls.

## Cost Breakdown

| Component        | Calculation                     | Per-minute cost |
| ---------------- | ------------------------------- | --------------- |
| Vobiz SIP        | Your stated rate                | ₹0.50           |
| Gemini audio in  | 1,920 tokens × $3.00/1M × ₹84  | ₹0.48           |
| Gemini audio out | 750 tokens × $12.00/1M × ₹84   | ₹0.76           |
| LiveKit          | Within free tier                | ₹0.00           |
| **Total**        |                                 | **~₹1.74/min**  |

## Quick Start

### 1. Install dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your actual API keys
```

### 3. Provision SIP trunks (one-time)

```bash
python sip_config.py
# Copy the outbound trunk ID into your .env as VOBIZ_SIP_TRUNK_ID
```

### 4. Run the agent

```bash
# Development mode (auto-reload, verbose logs)
python agent.py dev

# Production mode
python agent.py start
```

### 5. Make an outbound call

```bash
python outbound_call.py +919876543210
```

## Architecture

```
Phone ←→ Vobiz SIP ←→ LiveKit Cloud ←→ Agent (this code) ←→ Gemini API
                                                              (audio in/out)
```

- **LiveKit Cloud** — Real-time media routing (WebRTC/SIP). Free tier.
- **Google Gemini** — `gemini-2.0-flash-live-001` multimodal model with native audio I/O.
- **Vobiz SIP** — Telephony provider for PSTN connectivity.
- **Silero VAD** — Local voice-activity detection for turn handling.

## Files

| File               | Description                                     |
| ------------------ | ----------------------------------------------- |
| `agent.py`         | Main voice agent (entrypoint)                   |
| `outbound_call.py` | CLI helper to dial out via SIP                  |
| `sip_config.py`    | One-time SIP trunk provisioning                 |
| `.env.example`     | Environment variable template                   |
| `Dockerfile`       | Container build for deployment                  |
| `requirements.txt` | Python dependencies                             |

## Deployment

### Docker

```bash
docker build -t voxly-agent .
docker run --env-file .env voxly-agent start
```

### LiveKit Cloud (recommended)

1. Push your Docker image to a registry (Docker Hub, GCR, ECR, etc.)
2. Go to [LiveKit Cloud](https://cloud.livekit.io/) → Agents → Deploy
3. Point it at your image with the env vars configured

### Railway / Render / Fly.io

Any container platform works. Set the env vars from `.env.example` and use:
```
python agent.py start
```

## Environment Variables

| Variable              | Required | Description                          |
| --------------------- | -------- | ------------------------------------ |
| `LIVEKIT_URL`         | Yes      | LiveKit Cloud WebSocket URL          |
| `LIVEKIT_API_KEY`     | Yes      | LiveKit API key                      |
| `LIVEKIT_API_SECRET`  | Yes      | LiveKit API secret                   |
| `GOOGLE_API_KEY`      | Yes      | Google Gemini API key                |
| `VOBIZ_SIP_HOST`      | Yes      | Vobiz SIP server hostname           |
| `VOBIZ_SIP_USERNAME`  | Yes      | Vobiz SIP auth username             |
| `VOBIZ_SIP_PASSWORD`  | Yes      | Vobiz SIP auth password             |
| `VOBIZ_SIP_TRANSPORT` | No       | `udp` (default), `tcp`, or `tls`     |
| `VOBIZ_DID_NUMBERS`   | No       | Comma-separated DID numbers          |
| `VOBIZ_SIP_TRUNK_ID`  | Yes*     | Set after running `sip_config.py`    |
