import { ImageResponse } from "next/og";
export const alt = "Vinicios Ferreira — QA Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        width: "100%",
        height: "100%",
        background: "#fff",
        color: "#0d0d0d",
        border: "16px solid #0d0d0d",
      }}
    >
      <div style={{ fontSize: 24, marginBottom: 30 }}>
        SOFTWARE ENGINEER IN TEST
      </div>
      <div style={{ fontSize: 84, fontWeight: 700 }}>Vinicios Ferreira</div>
      <div style={{ fontSize: 30, marginTop: 30 }}>
        Automação · Métricas de qualidade · Produtos digitais
      </div>
    </div>,
    size,
  );
}
