import { ParametersError } from "../../shared/classes/api-errors";
import { BaseError } from "../../shared/classes/base-error";
import * as encryption from "./model";
import { HttpStatusCode } from "../../shared/models/http.model";
import fs from "fs";
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
    const encrypted = publicKey.encrypt(name, "RSAES-PKCS1-V1_5");
    const encryptedBase64 = forge.util.encode64(encrypted);
    return encryptedBase64;

  } catch (error) {
    throw new BaseError({ error: error, methodName: "encryptName", log: error });
  }
}

export async function decryptName(encryptedBase64: string): Promise<string> {
  try {
    console.log("encryptedBase64:", encryptedBase64);
    // Leer la llave privada
    const privateKeyPath = process.env.PRIVATEKEYPATH;
    const privateKeyPem = fs.readFileSync(privateKeyPath, "utf8");
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    // Decodificar base64 y desencriptar
    const encryptedBytes = forge.util.decode64(encryptedBase64);
    const decrypted = privateKey.decrypt(encryptedBytes, "RSAES-PKCS1-V1_5");

    return decrypted;

  } catch (error) {
    throw new BaseError({ error, methodName: "decryptName", log: error });
  }
}

