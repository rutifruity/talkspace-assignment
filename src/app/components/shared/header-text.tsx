import { Typography } from "@mui/material";
import React from "react";

export default function HeaderText({ text }: { text: string }) {
  return (
    <Typography variant="h4" marginBottom="20px">
      {text}
    </Typography>
  );
}
