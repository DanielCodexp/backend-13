import express from "express";
const router = express.Router();

import * as encryptionController from "./encryption/controller";
// Define routes for encryption
router.post("/encrypt-name", encryptionController.encryptNameController);
router.post("/decrypt-name", encryptionController.decryptNameController);

export { router };