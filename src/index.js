import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/index.js";
import session from "express-session";
import passport from 'passport';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import options from './docs/apidoc.js';

const app = express();
dotenv.config();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.set('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const specs = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/", router);

app.listen(process.env.PORT);
