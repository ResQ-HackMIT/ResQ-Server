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

export interface IIncident {
    status: "Clear" | "Approaching" | "In progress" | "Aftermath"
    title: string;
    description: string;
}

export const Incident = mongoose.model<IIncident & mongoose.Document>("Incident", new mongoose.Schema({
    status: String,
    title: String,
    description: String
}));

export async function triageAaron(): Promise<IUser> {
    let user = await User.findOne({"name":"Aaron Vontell"});
    return user;
}

export async function triageUsers(): Promise<IUser[]> {
    let users = await User.find();

    function calculateWeightedScore(user: IUser): number {
        return (
            -0.51873650182023323 * user.medicalConditions +
            0.033982876503696642 * user.medications +
            0.0058550860572328259 * user.age +
            0.49268896036443988 * user.kids +
            0.24194013280847518 * user.animals +
            -0.082317790819586206 * (user.spouse ? 1 : 0) +
            -0.4992769279377694 * (user.hasTransportation ? 1 : 0) +
            -2.0409025443303404 * user.locationProximity
        );
    }
    return users.sort((a, b) => calculateWeightedScore(b) - calculateWeightedScore(a));
}