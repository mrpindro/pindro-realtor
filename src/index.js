import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";
import { Provider } from "react-redux";
import { DataProvider } from "./context/DataProvider";
import { store } from "./store/store";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <DataProvider>
                <App />
            </DataProvider>
        </Provider>
    </React.StrictMode>
)