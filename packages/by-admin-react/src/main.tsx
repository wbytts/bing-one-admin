// import '@unocss/reset/tailwind-compat.css'
import "virtual:uno.css";
import "./index.css";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const rootDOM = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootDOM);
root.render(<App />);
