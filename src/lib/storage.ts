import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const BUCKET_NAME = env.SUPABASE_BUCKET_NAME;

type UploadAudioOptions = {
  buffer: Buffer;
  key: string;
  contentType?: string;
};

export async function uploadAudio({
  buffer,
  key,
  contentType = "audio/wav",
}: UploadAudioOptions): Promise<void> {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(key, buffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Failed to upload audio: ${error.message}`);
  }
}

export async function deleteAudio(key: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([key]);

  if (error) {
    throw new Error(`Failed to delete audio: ${error.message}`);
  }
}

export async function getSignedAudioUrl(key: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(key, 3600); // 1 hour

  if (error || !data?.signedUrl) {
    throw new Error(`Failed to get signed URL: ${error?.message ?? "Unknown error"}`);
  }

  return data.signedUrl;
}

export async function downloadAudio(key: string): Promise<Buffer> {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .download(key);

  if (error || !data) {
    throw new Error(`Failed to download audio: ${error?.message ?? "Unknown error"}`);
  }

  const arrayBuffer = await data.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
