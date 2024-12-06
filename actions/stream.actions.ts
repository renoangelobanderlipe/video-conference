"use server"
"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
    const user = await currentUser();

    if (!user) throw new Error("Unauthenticated");
    if (!STREAM_API_KEY) throw new Error("No API Key");
    if (!STREAM_API_SECRET) throw new Error("No API Secret");

    const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.generateUserToken({
        user_id: user.id,
        validity_in_seconds: expirationTime,
        iat: issuedAt
    });

    return token;
}
