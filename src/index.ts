import express, { Request, Response } from "express";
import route from "./routes/loginRoutes";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./controllers/LoginController";
import { controllerRouter } from "./controllers/decorators/controllers";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["lschkjghskc"] }));
app.use(route);
app.use(controllerRouter);
app.listen(3000, (): void => console.log("server started on port 3000"));
