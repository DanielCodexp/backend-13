require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import { router } from "./api/router";
import { BaseError } from "./shared/classes/base-error";
import { ErrorHandler, buildErrorMessage } from "./shared/classes/error-handler";
import { logger } from "./shared/classes/logger";

//Inicialización del servidor
const app = express();
const port = process.env.PORT || 8080;
const errorHandler = new ErrorHandler(logger);

app.use(cors());
app.use(bodyParser.json({ limit: '70mb' }));
app.use(bodyParser.urlencoded({ limit: '70mb', extended: true }));
app.use("/api", router);
app.use(errorMiddleware);



app.listen(port, function () {
    console.log(`listening on http://localhost:${port}`);
});



async function errorMiddleware(err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof BaseError) {
        console.error('Error occurred:', err);
        res.status(err.httpCode).send(
            buildErrorMessage(err))
        return;
    }
    res.status(500).send(buildErrorMessage(err));
}
