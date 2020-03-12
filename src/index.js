import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import "./scss/main.scss";
require('dotenv').config();

ReactDOM.render(<App />, document.getElementById("root"));
