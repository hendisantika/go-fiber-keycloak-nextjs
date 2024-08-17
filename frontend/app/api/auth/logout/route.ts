import { getServerSession } from "next-auth";
import { getIdToken } from "../../../../utils/sessionTokenAccessor";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (session) {
        const idToken = await getIdToken();

        // this will log out the user on Keycloak side
        var url = `${
            process.env.END_SESSION_URL
        }?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(
            process.env.NEXTAUTH_URL as string
        )}`;

        try {
            const resp = await fetch(url, { method: "GET" });
        } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err }, { status: 500 });
        }
    }
    return NextResponse.json({ data: "ok" }, { status: 200 });
}
