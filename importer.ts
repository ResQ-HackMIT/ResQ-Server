import * as fs from "fs";
import { IUser, User } from "./schema";

const csv = require("csv-parser");

(async () => {
    await User.collection.drop();

    let userDocs: Partial<IUser>[] = [];
    fs.createReadStream("data.csv", {encoding: "utf8"})
        .pipe(csv())
        .on("data", async (data: any) => {
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
                "locationProximity": parseInt(data.location, 10)
            });
        }).on("end", async () => {
            User.insertMany(userDocs);
            console.log(`Imported ${userDocs.length} documents`);
            process.exit(0);
        });
})();