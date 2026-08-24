import React from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2800,
        style: {
          background: "#111A2E",
          color: "#F8FAFC",
          border: "1px solid #24324D",
          borderRadius: "14px",
          boxShadow: "0 14px 35px rgba(0,0,0,.35)",
          fontFamily: "Poppins, sans-serif",
        },
        success: { iconTheme: { primary: "#22C55E", secondary: "#07111F" } },
        error: { iconTheme: { primary: "#EF4444", secondary: "#07111F" } },
      }}
    />
  );
}
