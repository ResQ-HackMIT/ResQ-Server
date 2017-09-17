import * as mongoose from "mongoose";

(mongoose as any).Promise = global.Promise;
mongoose.connect("mongodb://localhost/resq", {
    useMongoClient: true
} as mongoose.ConnectionOptions);

export interface ILocation {
    lat: number;
    long: number;
}
export interface IUser {
    _id: mongoose.Types.ObjectId;
    name: string;
    medicalConditions: number;
    allergies: number;
    medications: number;
    weight: number;
    height: number;
    age: number;
    kids: number;
    animals: number;
    spouse: boolean;
    hasTransportation: boolean;

    evacuate: boolean;
    location: ILocation[];
    locationProximity: number;
    authorizationKey: string;
}

export const User = mongoose.model<IUser & mongoose.Document>("User", new mongoose.Schema({
    name: String,
    medicalConditions: Number,
    allergies: Number,
    medications: Number,
    weight: Number,
    height: Number,
    age: Number,
    kids: Number,
    animals: Number,
    spouse: Boolean,
    hasTransportation: Boolean,

    evacuate: Boolean,
    location: [{
        lat: Number,
        long: Number
    }],
    locationProximity: Number,
    authorizationKey: String
}));

export interface IFirstResponder {
    name: string;
    hasBoat: boolean;
    hasCar: boolean;
    physicality: number;
}

export const FirstResponder = mongoose.model<IFirstResponder & mongoose.Document>("FirstResponder", new mongoose.Schema({
    name: String,
    hasBoat: Boolean,
    hasCar: Boolean,
    physicality: Number
}));