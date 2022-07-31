import ReactDOM from "react-dom/client";

import App from "./App";

import ContextWrapper from "./Context/ContextWrapper";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ContextWrapper>
    <App />
  </ContextWrapper>
);
