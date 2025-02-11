// import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from "react-router-dom";
// import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <BrowserRouter basename="/oncase_challenge_frontend"> */}
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    {/* </BrowserRouter> */}
  </StrictMode>,
)