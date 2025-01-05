import "./config/init.js";
import { app } from "./app.js";

console.log("BASE_URL", process.env.BASE_URL_DEV);
app();
