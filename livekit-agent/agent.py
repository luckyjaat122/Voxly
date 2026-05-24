"""Voxly AI Voice Agent — LiveKit + Gemini + Vobiz SIP

A production-ready AI calling agent that handles inbound and outbound
phone calls using LiveKit's real-time infrastructure, Google Gemini
for conversational AI, and Vobiz SIP for telephony.

Stack (per-minute cost ~₹1.74):
  Vobiz SIP        ₹0.50/min
  Gemini audio in  ₹0.48/min
  Gemini audio out ₹0.76/min
  LiveKit          ₹0.00 (free tier)
"""

import logging
import os

from dotenv import load_dotenv
from livekit.agents import Agent, AgentServer, AgentSession, JobContext, cli
from livekit.plugins import google, silero

load_dotenv()

logger = logging.getLogger("voxly-agent")
logger.setLevel(logging.INFO)

AGENT_INSTRUCTIONS = """
You are Voxly, an AI voice assistant built for business calls.

PERSONALITY & TONE
- Speak naturally and professionally, like a trained human agent.
- Be warm but concise. Never ramble.
- Use short sentences. Pause naturally between thoughts.
- Mirror the caller's energy and formality.

CALL HANDLING
- Greet the caller: "Hi, this is Voxly, your AI assistant. How can I help you today?"
- Listen carefully. Let the caller finish before responding.
- If you don't understand, ask for clarification politely.
- Handle interruptions gracefully.

LEAD QUALIFICATION
- Gather: name, company, what they need.
- Ask qualifying questions: budget, timeline, decision authority.
- Qualified leads → offer to book a meeting or transfer to a human.
- Unqualified leads → provide helpful info and end politely.

APPOINTMENT BOOKING
- Confirm: date, time, timezone, and contact details.
- Repeat booking details back to the caller.

CLOSING
- Always end with a clear next step.
- Thank the caller by name when possible.
- "Thanks for calling! Have a great day."

RULES
- Never fabricate information.
- Never share pricing or make unauthorized commitments.
- Redirect sensitive topics to a human agent.
- Keep responses under 3 sentences when possible.
"""


def create_agent_session() -> AgentSession:
    """Create a configured AgentSession with Gemini realtime + Silero VAD."""
    return AgentSession(
        llm=google.realtime.RealtimeModel(
            model="gemini-2.0-flash-live-001",
            voice="Puck",
            temperature=0.7,
            api_key=os.getenv("GOOGLE_API_KEY"),
        ),
        vad=silero.VAD.load(
            min_speech_duration=0.1,
            min_silence_duration=0.4,
        ),
        turn_detection="server_vad",
        allow_interruptions=True,
        min_endpointing_delay=0.5,
    )


def create_agent() -> Agent:
    """Create the Voxly voice agent."""
    return Agent(instructions=AGENT_INSTRUCTIONS)


# ---------------------------------------------------------------------------
# LiveKit Agent Server
# ---------------------------------------------------------------------------

server = AgentServer()


@server.rtc_session()
async def entrypoint(ctx: JobContext):
    """Called when a participant (phone caller or web user) joins a room."""

    await ctx.connect()

    logger.info(
        "Room connected: room=%s identity=%s",
        ctx.room.name,
        ctx.local_participant_identity,
    )

    session = create_agent_session()
    agent = create_agent()

    await session.start(agent, room=ctx.room)

    logger.info("Agent started — waiting for caller audio…")


if __name__ == "__main__":
    cli.run_app(server)
