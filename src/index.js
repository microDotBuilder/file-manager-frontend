/* eslint-disable no-undef */
import { app } from "./app.js";
import "./config/init.js";

console.log("BASE_URL", process.env.BASE_URL_DEV);
app();
