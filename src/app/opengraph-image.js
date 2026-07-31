import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#141414",
        color: "#F5F5F5",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#3EFFC2",
          marginBottom: 24,
        }}
      >
        Saim Kaskar
      </div>
      <div style={{ display: "flex", fontSize: 72, fontWeight: 600 }}>
        Full-Stack AI Engineer
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 32,
          color: "#A0A0A0",
          marginTop: 24,
        }}
      >
        Dublin, Ireland · saimjs.com
      </div>
    </div>,
    { ...size },
  );
}
