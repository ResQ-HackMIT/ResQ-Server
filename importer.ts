import * as crypto from "crypto";
import * as fs from "fs";
import * as geolib from "geolib";
import { IUser, User } from "./schema";

const csv = require("csv-parser");

(async () => {
    await User.collection.drop();

    // At Houston's airport
    const center: geolib.PositionAsDecimal = { latitude: 29.9494083, longitude: -95.4385523 };

    let userDocs: Partial<IUser>[] = [];
    fs.createReadStream("data.csv", {encoding: "utf8"})
        .pipe(csv())
        .on("data", async (data: any) => {
            let locationProximity: number = parseInt(data.location, 10);
            let location = geolib.computeDestinationPoint(center, Math.random() * locationProximity * 1000 + 500 * locationProximity, Math.random() * 360);

            userDocs.push({
                "name": data.name,
                "medicalConditions": parseInt(data.medicalConditions, 10),
                "allergies": parseInt(data.allergies, 10),
                "medications": parseInt(data.medications, 10),
                "weight": parseInt(data.weight, 10),
                "height": parseInt(data.height, 10),
                "age": parseInt(data.age, 10),
                "kids": parseInt(data.kids, 10),
                "animals": parseInt(data.animals, 10),
                "spouse": data.spouse === "1",
                "hasTransportation": data.hasTransportation === "1",
                "locationProximity": parseInt(data.location, 10),
                "location": [{
                    "lat": location.latitude,
                    "long": location.longitude
                }],

                "authorizationKey": crypto.randomBytes(32).toString("hex")
            });
        }).on("end", async () => {
            await User.insertMany(userDocs);
            console.log(`Imported ${userDocs.length} documents`);
            process.exit(0);
        });
})();