"""Vobiz SIP trunk provisioning — creates inbound & outbound trunks on LiveKit.

Run once to register your Vobiz SIP credentials with LiveKit Cloud:
  python sip_config.py

Requires LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET, and
VOBIZ_SIP_* variables to be set (see .env.example).
"""

import asyncio
import json
import os

from dotenv import load_dotenv
from livekit import api

load_dotenv()


async def provision_sip() -> None:
    lk = api.LiveKitAPI(
        url=os.environ["LIVEKIT_URL"],
        api_key=os.environ["LIVEKIT_API_KEY"],
        api_secret=os.environ["LIVEKIT_API_SECRET"],
    )

    sip_host = os.environ["VOBIZ_SIP_HOST"]
    sip_username = os.environ.get("VOBIZ_SIP_USERNAME", "")
    sip_password = os.environ.get("VOBIZ_SIP_PASSWORD", "")
    sip_transport = os.environ.get("VOBIZ_SIP_TRANSPORT", "udp").upper()

    transport_map = {
        "UDP": api.SIP_TRANSPORT_UDP,
        "TCP": api.SIP_TRANSPORT_TCP,
        "TLS": api.SIP_TRANSPORT_TLS,
    }
    transport = transport_map.get(sip_transport, api.SIP_TRANSPORT_AUTO)

    # ── Outbound trunk (agent → phone) ──────────────────────────────
    outbound = await lk.sip.create_sip_outbound_trunk(
        api.CreateSIPOutboundTrunkRequest(
            trunk=api.SIPOutboundTrunkInfo(
                name="Vobiz Outbound",
                address=sip_host,
                auth_username=sip_username,
                auth_password=sip_password,
                transport=transport,
            )
        )
    )
    print(f"Outbound trunk created: {outbound.sip_trunk_id}")

    # ── Inbound trunk (phone → agent) ──────────────────────────────
    inbound = await lk.sip.create_sip_inbound_trunk(
        api.CreateSIPInboundTrunkRequest(
            trunk=api.SIPInboundTrunkInfo(
                name="Vobiz Inbound",
                numbers=os.environ.get("VOBIZ_DID_NUMBERS", "").split(","),
                auth_username=sip_username,
                auth_password=sip_password,
            )
        )
    )
    print(f"Inbound trunk created: {inbound.sip_trunk_id}")

    # ── Dispatch rule (route inbound calls to the agent) ────────────
    dispatch = await lk.sip.create_sip_dispatch_rule(
        api.CreateSIPDispatchRuleRequest(
            rule=api.SIPDispatchRule(
                dispatch_rule_individual=api.SIPDispatchRuleIndividual(
                    room_prefix="inbound-",
                )
            ),
            trunk_ids=[inbound.sip_trunk_id],
        )
    )
    print(f"Dispatch rule created: {dispatch.sip_dispatch_rule_id}")

    # ── Save trunk IDs for later use ────────────────────────────────
    config = {
        "outbound_trunk_id": outbound.sip_trunk_id,
        "inbound_trunk_id": inbound.sip_trunk_id,
        "dispatch_rule_id": dispatch.sip_dispatch_rule_id,
    }
    with open("sip_trunks.json", "w") as f:
        json.dump(config, f, indent=2)

    print(f"\nTrunk IDs saved to sip_trunks.json")
    print(f"Set VOBIZ_SIP_TRUNK_ID={outbound.sip_trunk_id} in your .env")

    await lk.aclose()


if __name__ == "__main__":
    asyncio.run(provision_sip())
