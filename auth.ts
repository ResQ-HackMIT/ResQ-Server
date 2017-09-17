import * as crypto from "crypto";
import * as express from "express";
import * as bodyParser from "body-parser";
import {
    IUser,
    User,
    IFirstResponder,
    FirstResponder,
} from "./schema";

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
    "spouse": false,
    "transportation": false,
    "evacuate": true
};

// Recieve: Expects to recieve a full person object as a request.
// Return: the sucess of the update operation and a new secret key.
authRoutes.route("/update-user").post(bodyParser.json(), async (request, response) => {
    const key = crypto.randomBytes(32).toString("hex");

    // Use the name to search for the old entry.
    var toUpdate = new User({
        "name": request.body.name
    }).findOne();

    // If anything in the request changed, we just set the new value.
    toUpdate.set({
        "medicalConditions": request.body.medicalConditions || USER_DEFAULT.medicalConditions,
        "allergies": request.body.allergies || USER_DEFAULT.allergies,
        "medications": request.body.medications || USER_DEFAULT.medications,
        "weight": request.body.weight || USER_DEFAULT.weight,
        "height": request.body.height || USER_DEFAULT.height,
        "age": request.body.age || USER_DEFAULT.age,
        "kids": request.body.kids || USER_DEFAULT.kids,
        "animals": request.body.animals || USER_DEFAULT.animals,
        "spouse": request.body.spouse || USER_DEFAULT.spouse,
        "transportation": request.body.transportation || USER_DEFAULT.transportation,
        "evacuate": request.body.evacuate || USER_DEFAULT.evacuate,

        "location": [],
        "authorizationKey": key
    });

    response.status(201).json({
        "success": true,
        "authorizationKey": key
    });
});

authRoutes.route("/user").post(bodyParser.json(), async (request, response) => {
    const key = crypto.randomBytes(32).toString("hex");

    await new User({
        "name": request.body.name || USER_DEFAULT.name,
        "medicalConditions": request.body.medicalConditions || USER_DEFAULT.medicalConditions,
        "allergies": request.body.allergies || USER_DEFAULT.allergies,
        "medications": request.body.medications || USER_DEFAULT.medications,
        "weight": request.body.weight || USER_DEFAULT.weight,
        "height": request.body.height || USER_DEFAULT.height,
        "age": request.body.age || USER_DEFAULT.age,
        "kids": request.body.kids || USER_DEFAULT.kids,
        "animals": request.body.animals || USER_DEFAULT.animals,
        "spouse": request.body.spouse || USER_DEFAULT.spouse,
        "transportation": request.body.transportation || USER_DEFAULT.transportation,
        "evacuate": request.body.evacuate || USER_DEFAULT.evacuate,

        "locations": [],
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

authRoutes.route("/firstresponder").post(bodyParser.json(), async (request, response) => {
    const key = crypto.randomBytes(32).toString("hex");

    await new FirstResponder({
        "name": request.body.name || FIRST_RESPONDER_DEFAULT.name,
        "hasBoat": request.body.hasBoat || FIRST_RESPONDER_DEFAULT.hasBoat,
        "hasCar": request.body.hasCar || FIRST_RESPONDER_DEFAULT.hasCar,
        "physicality": request.body.physicality || FIRST_RESPONDER_DEFAULT.physicality,

        "authorizationKey": key
    }).save();

    response.status(201).json({
        "success": true,
        "authorizationKey": key
    });
});