import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            fontSize: 60,
            color: "white",
            background: "linear-gradient(to bottom right, #111827, #1f2937)",
            width: "100%",
            height: "100%",
            padding: "50px 200px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            {/* You can add your logo here if you want */}
            <span style={{ fontSize: 90, fontWeight: "bold", marginRight: 10 }}>
              Portfolio
            </span>
          </div>
          <div style={{ fontSize: 40, marginTop: 20, opacity: 0.8 }}>
            Full-Stack Developer & UI/UX Designer
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
