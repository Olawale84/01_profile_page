import { ImageResponse } from "next/og";

export const alt = "Olawale Onasanya — Web Designer";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#171717",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "60px 80px",
                    position: "relative",
                }}
            >
                {/* Top accent bar */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 6,
                        background: "#f97316",
                    }}
                />

                {/* Orange dot */}
                <div
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: "#f97316",
                        marginBottom: 32,
                    }}
                />

                {/* Name */}
                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: 1.1,
                        textAlign: "center",
                        marginBottom: 12,
                    }}
                >
                    Olawale Onasanya
                </div>

                {/* Title */}
                <div
                    style={{
                        fontSize: 32,
                        color: "#f97316",
                        fontWeight: 500,
                        textAlign: "center",
                        marginBottom: 40,
                    }}
                >
                    Web Designer
                </div>

                {/* Divider */}
                <div
                    style={{
                        width: 120,
                        height: 2,
                        background: "#f97316",
                        marginBottom: 40,
                    }}
                />

                {/* Tagline */}
                <div
                    style={{
                        fontSize: 24,
                        color: "#d4d4d4",
                        textAlign: "center",
                        maxWidth: 800,
                        lineHeight: 1.5,
                    }}
                >
                    Clean, strategic, and user-focused websites that turn ideas into impactful digital experiences.
                </div>

                {/* Domain */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 40,
                        fontSize: 20,
                        color: "#737373",
                    }}
                >
                    olawale.design
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
