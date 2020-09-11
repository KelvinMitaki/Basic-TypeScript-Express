import express from "express";
import route from "./routes/loginRoutes";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import "./controllers/LoginController";
import "./controllers/RootController";
import { AppRouter } from "./AppRouter";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ["lschkjghskc"] }));
app.use(AppRouter.getInstance());
app.listen(3000, (): void => console.log("server started on port 3000"));
