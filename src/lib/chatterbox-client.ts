import { env } from "./env";

interface GenerateSpeechOptions {
  text: string;
  voiceBuffer: Buffer;
  voiceFilename?: string;
  exaggeration?: number;
  cfgWeight?: number;
  temperature?: number;
}

export async function generateSpeech({
  text,
  voiceBuffer,
  voiceFilename = "voice.wav",
  exaggeration = 0.5,
  cfgWeight = 0.5,
  temperature = 0.8,
}: GenerateSpeechOptions): Promise<ArrayBuffer> {
  const formData = new FormData();
  formData.append("input", text);

  const voiceBlob = new Blob([new Uint8Array(voiceBuffer)], { type: "audio/wav" });
  formData.append("voice_file", voiceBlob, voiceFilename);

  formData.append("response_format", "wav");
  formData.append("exaggeration", String(exaggeration));
  formData.append("cfg_weight", String(cfgWeight));
  formData.append("temperature", String(temperature));

  const response = await fetch(
    `${env.CHATTERBOX_API_URL}/audio/speech/upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.CHATTERBOX_API_KEY}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`Chatterbox API error (${response.status}): ${errorText}`);
  }

  return response.arrayBuffer();
}
