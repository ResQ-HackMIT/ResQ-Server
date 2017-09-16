import * as crypto from "crypto";
import * as express from "express";
import * as bodyParser from "body-parser";
import { IUser, User, IFirstResponder, FirstResponder } from "./schema";

export const authRoutes = express.Router();

const USER_DEFAULT: Partial<IUser> = {
    "name": "Aaron Vontell",
    "medicalConditions": ["Obesity II", "Diabetes"],
    "allergies": ["Peanut Butter", "Cats"],
    "medications": ["Laxatives", "Penicillin"],
    "weight": 260,
    "height": 71,
    "age": 20,
    "kids": 0,
    "animals": 0,
    "spouse": false
};

authRoutes.route("/create/user").post(bodyParser.json(), async (request, response) => {
    const key = crypto.randomBytes(32).toString("hex");

    await new User({
        ...USER_DEFAULT,
        "name": request.body.name,
        "medicalConditions": request.body.medicalConditions,
        "allergies": request.body.allergies,
        "medications": request.body.medications,
        "weight": request.body.weight,
        "height": request.body.height,
        "age": request.body.age,
        "kids": request.body.kids,
        "animals": request.body.animals,
        "spouse": request.body.spouse,

        "authorizationKey": key
    }).save();

    response.status(201).json({
        "success": true,
        "authorizationKey": key
    });
});

const FIRST_RESPONDER_DEFAULT: Partial<IFirstResponder> = {
    "name": "Cooper Pellaton",
    "hasBoat": false,
    "hasCar": false,
    "physicality": 0
};

authRoutes.route("/create/firstresponder").post(bodyParser.json(), async (request, response) => {
    const key = crypto.randomBytes(32).toString("hex");

    await new FirstResponder({
        ...FIRST_RESPONDER_DEFAULT,
        "name": request.body.name,
        "hasBoat": request.body.hasBoat,
        "hasCar": request.body.hasCar,
        "physicality": request.body.physicality,

        "authorizationKey": key
    }).save();

    response.status(201).json({
        "success": true,
        "authorizationKey": key
    });
});