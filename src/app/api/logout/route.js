import { NextResponse } from "next/server";
import { userAuth } from "@/middleware/Auth";

export async function POST(req) {
  const user = await userAuth(req);
  return NextResponse.json(
    { message: "Successfully logged out" },
    {
      status: 200,
      headers: {
        "Set-Cookie": `authToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`,
      },
    }
  );
}
