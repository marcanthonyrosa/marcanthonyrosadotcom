import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "60px 80px",
          background: "#06080f",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Purple glow top-center */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "150px",
            width: "900px",
            height: "520px",
            background:
              "radial-gradient(ellipse, rgba(124,92,252,0.22) 0%, rgba(79,142,247,0.10) 40%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Teal glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-60px",
            width: "400px",
            height: "300px",
            background:
              "radial-gradient(circle, rgba(6,200,180,0.12), transparent 70%)",
            display: "flex",
          }}
        />

        {/* Live eyebrow badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(124,92,252,0.12)",
            border: "1px solid rgba(124,92,252,0.35)",
            borderRadius: "24px",
            padding: "8px 18px 8px 12px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#a78bfa",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              color: "#a78bfa",
              fontWeight: "600",
              letterSpacing: "0.03em",
            }}
          >
            Live — Available Now
          </span>
        </div>

        {/* Main content row */}
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {/* Left: text */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "400",
                color: "#6b7599",
                letterSpacing: "-0.01em",
                marginBottom: "6px",
                display: "flex",
              }}
            >
              Introducing
            </div>

            <div
              style={{
                fontSize: "76px",
                fontWeight: "800",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "#a78bfa",
                marginBottom: "14px",
                display: "flex",
              }}
            >
              John McKeon Rosa
            </div>

            <div
              style={{
                fontSize: "26px",
                fontWeight: "300",
                color: "#6b7599",
                letterSpacing: "-0.01em",
                marginBottom: "22px",
                display: "flex",
              }}
            >
              Version 1.0
            </div>

            <div
              style={{
                fontSize: "19px",
                color: "#9099bb",
                lineHeight: 1.5,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>Three trimesters in the making.</span>
              <span style={{ color: "#f0f2f8", fontWeight: "500" }}>
                The most significant release of 2026.
              </span>
            </div>
          </div>

          {/* Right: baby emoji */}
          <div
            style={{
              fontSize: "140px",
              lineHeight: 1,
              paddingLeft: "40px",
              display: "flex",
              flexShrink: 0,
            }}
          >
            👶
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "flex",
            width: "100%",
            marginTop: "44px",
            paddingTop: "28px",
            borderTop: "1px solid #1e2540",
          }}
        >
          {[
            { num: "8.69", label: "lbs at launch" },
            { num: "40", label: "week dev cycle" },
            { num: "24/7", label: "uptime" },
            { num: "∞", label: "projected ROI" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: 1,
                borderRight: i < 3 ? "1px solid #1e2540" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "38px",
                  fontWeight: "800",
                  letterSpacing: "-0.03em",
                  color: "#a78bfa",
                  marginBottom: "6px",
                  display: "flex",
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7599",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  display: "flex",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position: "absolute",
            bottom: "36px",
            right: "80px",
            fontSize: "14px",
            color: "#2a3050",
            letterSpacing: "0.04em",
            display: "flex",
          }}
        >
          marcanthonyrosa.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
