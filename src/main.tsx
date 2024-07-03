import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./MultiLang.ts";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </PrimeReactProvider>
  </React.StrictMode>
);
