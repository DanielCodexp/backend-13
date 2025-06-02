import express from "express";
const router = express.Router();

import * as encryptionController from "./encryption/controller";

router.post("/encrypt-name", encryptionController.encryptNameController);


export { router };