import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { SanctionsProvider } from "./context/SanctionsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SanctionsProvider>
        <App />
      </SanctionsProvider>
    </BrowserRouter>
  </StrictMode>,
);
