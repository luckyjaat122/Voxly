# Voxly Voice

AI-powered text-to-speech and voice cloning platform for personal use. Built with Next.js 16, React 19, and Chatterbox TTS.

## Features

- **Text-to-Speech** — Generate speech from text with adjustable creativity, variety, expression, and flow parameters
- **Zero-Shot Voice Cloning** — Upload or record a voice sample (10s minimum) and clone it instantly — no fine-tuning required
- **20 Built-in Voices** — Pre-seeded system voices across 12 categories and 5 locales
- **Waveform Audio Player** — WaveSurfer.js visualization with seek, play/pause, and download
- **Generation History** — Browse and replay past generations with preserved voice metadata
- **Voice Agent Ready** — API endpoint for integrating with your AI voice agent

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS, shadcn/ui
- **Backend**: tRPC, Prisma ORM
- **Auth**: Clerk (with Organizations)
- **Database**: PostgreSQL (Prisma Postgres or Supabase)
- **Storage**: Supabase Storage
- **TTS Engine**: [Chatterbox TTS API](https://github.com/travisvn/chatterbox-tts-api)
- **Deployment**: Railway

## Prerequisites

- Node.js 20.9 or later
- [Clerk](https://clerk.com) account (with Organizations enabled)
- PostgreSQL database ([Prisma Postgres](https://console.prisma.io) or [Supabase](https://supabase.com))
- [Supabase](https://supabase.com) project (for file storage)
- [Chatterbox TTS API](https://github.com/travisvn/chatterbox-tts-api) running (local Docker or cloud GPU)
- [Hugging Face](https://huggingface.co) account (for model weights)

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/luckyjaat122/Voxly.git
cd Voxly
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Fill in all values — see the Build Guide for where to find each one
```

### 3. Set up database

```bash
npx prisma migrate deploy
npx prisma db seed
```

### 4. Start Chatterbox TTS API

```bash
git clone https://github.com/travisvn/chatterbox-tts-api.git
cd chatterbox-tts-api
uv sync
uv run main.py
# API runs at http://localhost:4123
# Set CHATTERBOX_API_URL=http://localhost:4123 in .env
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Voice Agent API

```
POST /api/tts
{
  "text": "Hello, this is your AI agent speaking.",
  "voiceId": "your-voice-id",
  "settings": {
    "creativity": 0.3,
    "variety": 0.2,
    "expression": 0.5,
    "flow": 0.5
  }
}
```

## Deployment

Deploy to Railway:
1. Push to GitHub
2. Connect repo in Railway
3. Add all env variables
4. Railway auto-deploys

## License

Personal use. Based on the open-source [Resonance](https://github.com/code-with-antonio/resonance) project.
