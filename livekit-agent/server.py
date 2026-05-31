"""Web server — serves the Voxly voice agent UI and issues LiveKit tokens."""

import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from livekit.api import AccessToken, VideoGrants

load_dotenv()

app = FastAPI(title="Voxly Voice Agent")


@app.get("/", response_class=HTMLResponse)
async def index():
    with open(os.path.join(os.path.dirname(__file__), "static", "index.html")) as f:
        return f.read()


@app.get("/api/token")
async def get_token(identity: str = "web-user"):
    """Generate a LiveKit access token for the web client."""
    api_key = os.getenv("LIVEKIT_API_KEY")
    api_secret = os.getenv("LIVEKIT_API_SECRET")

    if not api_key or not api_secret:
        raise HTTPException(
            status_code=503,
            detail="LIVEKIT_API_KEY and LIVEKIT_API_SECRET must be set in .env",
        )

    token = AccessToken(api_key, api_secret).with_identity(identity).with_grants(
        VideoGrants(
            room_join=True,
            room="voxly-agent-room",
            can_publish=True,
            can_subscribe=True,
        )
    )

    return {
        "token": token.to_jwt(),
        "url": os.getenv("LIVEKIT_URL", ""),
        "room": "voxly-agent-room",
    }


@app.get("/api/status")
async def status():
    """Check which credentials are configured."""
    return {
        "livekit_url": bool(os.getenv("LIVEKIT_URL")),
        "livekit_api_key": bool(os.getenv("LIVEKIT_API_KEY")),
        "livekit_api_secret": bool(os.getenv("LIVEKIT_API_SECRET")),
        "google_api_key": bool(os.getenv("GOOGLE_API_KEY")),
        "vobiz_sip_host": bool(os.getenv("VOBIZ_SIP_HOST")),
    }


app.mount("/static", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "static")), name="static")
