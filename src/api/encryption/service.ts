import { ParametersError } from "../../shared/classes/api-errors";
import { BaseError } from "../../shared/classes/base-error";
import * as encryption from "./model";
import { HttpStatusCode } from "../../shared/models/http.model";
import fs from "fs";
import path from "path";
import forge from "node-forge";

export async function encryptName(name: string): Promise<string> {
  try {
    // Validación
     const { error } = encryption.encryptionSchema.validate({ name });
     if (error) {
       throw new ParametersError("Invalid parameters", 'encryptName', HttpStatusCode.BAD_REQUEST);
     }

    // Cargar llave pública
    const publicKeyPath = process.env.PUBLICKEYPATH;
    const publicKeyPem = fs.readFileSync(publicKeyPath, "utf8");
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

    // Encriptar
    const encrypted = process.env.PRIVATEKEYPATH;
    const encryptedBase64 = forge.util.encode64(encrypted);

    return encryptedBase64;

  } catch (error) {
    throw new BaseError({ error: error, methodName: "encryptName", log: error });
  }
}
