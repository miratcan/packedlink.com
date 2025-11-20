import type { PublishPayload, PublishResponse } from "@/store/listBuilder";
import { clientEnv } from "./env";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function mockPublishList(payload: PublishPayload): Promise<PublishResponse> {
  await wait(600);
  const slug = payload.title
    ? payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24)
    : "liste";
  const hash = `${slug}-${Math.random().toString(36).slice(2, 8)}`;
  const publicUrl = `${clientEnv.appBaseUrl.replace(/\/$/, "")}/l/${hash}`;
  const manageUrl = `${clientEnv.appBaseUrl.replace(/\/$/, "")}/manage/${hash}?token=demo`;

  return {
    publicUrl,
    manageUrl,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
  };
}
