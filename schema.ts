import * as mongoose from "mongoose";

(mongoose as any).Promise = global.Promise;
mongoose.connect("mongodb://localhost/resq", {
        useMongoClient: true
    }
    as mongoose.ConnectionOptions);

export interface IUser {
    _id: mongoose.Types.ObjectId;
    name: string;
    medicalConditions: string[];
    allergies: string[];
    medications: string[];
    weight: number;
    height: number;
    age: number;
    kids: number;
    animals: number;
    spouse: boolean;

    authorizationKey: string;
}

export interface ILocation {
    userAuthKey: string;
    lat: number;
    long: number;
}

export const Location = mongoose.model < ILocation & mongoose.Document > ("Location", new mongoose.Schema({
    userAuthKey: String,
    lat: Number,
    long: Number
}));

export const User = mongoose.model < IUser & mongoose.Document > ("User", new mongoose.Schema({
    name: String,
    medicalConditions: [String],
    allergies: [String],
    medications: [String],
    weight: Number,
    height: Number,
    age: Number,
    kids: Number,
    animals: Number,
    spouse: Boolean,

    authorizationKey: String
}));

export interface IFirstResponder {
    name: string;
    hasBoat: boolean;
    hasCar: boolean;
    physicality: number;
}

export const FirstResponder = mongoose.model < IFirstResponder & mongoose.Document > ("FirstResponder", new mongoose.Schema({
    name: String,
    hasBoat: Boolean,
    hasCar: Boolean,
    physicality: Number
}));