import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//import App from './App.jsx'
import Game from "./components/pages/App";

//get the html element that will be the container for all of this JSX code
const container = document.getElementById("root");
//then create a wraper for the JSX code to be contained within inside the root
const root = createRoot(container);
//then render the JSX modules within that wrapper
root.render(
  <StrictMode>
    <Game />
  </StrictMode>
);
