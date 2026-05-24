"""Outbound call helper — dial a phone number via Vobiz SIP trunk.

Usage:
  python outbound_call.py +919876543210

This creates a LiveKit room, dispatches the AI agent into it,
and dials the phone number through the configured Vobiz SIP trunk.
"""

import asyncio
import os
import sys

from dotenv import load_dotenv
from livekit import api

load_dotenv()


async def make_call(phone_number: str) -> None:
    """Create a room and dial out via SIP."""

    lk = api.LiveKitAPI(
        url=os.environ["LIVEKIT_URL"],
        api_key=os.environ["LIVEKIT_API_KEY"],
        api_secret=os.environ["LIVEKIT_API_SECRET"],
    )

    trunk_id = os.environ["VOBIZ_SIP_TRUNK_ID"]

    room_name = f"outbound-{phone_number.replace('+', '')}"

    room = await lk.room.create_room(api.CreateRoomRequest(name=room_name))
    print(f"Room created: {room.name} (sid={room.sid})")

    sip_participant = await lk.sip.create_sip_participant(
        api.CreateSIPParticipantRequest(
            sip_trunk_id=trunk_id,
            sip_call_to=phone_number,
            room_name=room_name,
            participant_identity=f"phone-{phone_number}",
            participant_name="Phone Caller",
        )
    )
    print(f"SIP participant created: {sip_participant.participant_id}")
    print(f"Call status: {sip_participant.call_status}")
    print(f"Dial: {phone_number} via trunk {trunk_id}")

    await lk.aclose()


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python outbound_call.py <phone_number>")
        print("Example: python outbound_call.py +919876543210")
        sys.exit(1)

    phone = sys.argv[1]
    if not phone.startswith("+"):
        print("Phone number must start with + (E.164 format)")
        sys.exit(1)

    asyncio.run(make_call(phone))


if __name__ == "__main__":
    main()
