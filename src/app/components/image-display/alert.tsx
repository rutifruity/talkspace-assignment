import React from "react";
import { Alert } from "@mui/material";

export default function AlertComponent({ error }: { error: string }) {
  return (
    <Alert severity="error" style={{ marginTop: "20px" }}>
      {error}
    </Alert>
  );
}
