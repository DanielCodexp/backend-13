
import express, { NextFunction } from "express";
import * as encryptionService from "./service";
import { ApiResponse } from "../../shared/models/api-response.model";
import { HttpStatusCode } from "../../shared/models/http.model";

export async function encryptNameController(req: express.Request, res: express.Response, next: NextFunction)   {
    try{
        const name = req.body.name;
        let serviceResponse = await encryptionService.encryptName(name);
        res.status(200).send(<ApiResponse>{ status: HttpStatusCode.OK, message: "All Good!", data: serviceResponse });
    } catch (error) {
        next(error);
    }
    
}