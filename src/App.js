import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import Routes from "./pages/routes";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </CssBaseline>
    </Provider>
  );
};

export default App;
