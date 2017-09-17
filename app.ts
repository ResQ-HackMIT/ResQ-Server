import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";

// Set up Express and its middleware
export let app = express();
app.use(compression());

// Throw and show a stack trace on an unhandled Promise rejection instead of logging an unhelpful warning
process.on("unhandledRejection", err => {
	throw err;
});


const apiRouter = express.Router();

import { authRoutes } from "./auth";
apiRouter.use("/auth", authRoutes);

import { User, triageUsers } from "./schema";
apiRouter.route("/location").post(bodyParser.json(), async (request, response) => {
    let user = await User.findOne({ "authorizationKey": request.headers.authorization });
    if (!user) {
        response.status(400).json({
            "error": "Invalid authorization header"
        });
        return;
    }
    
    user.location.push({
        "lat": request.body.lat,
        "long": request.body.long
    });
    await user.save();

    response.status(201).json({
        "success": true
    });
});

apiRouter.route("/triage").get(async (request, response) => {
    response.json(await triageUsers());
});
apiRouter.route("/evacuationtime").get(async (request, response) => {
    let user = await User.findOne({ "authorizationKey": request.headers.authorization });
    if (!user) {
        response.status(400).json({
            "error": "Invalid authorization header"
        });
        return;
    }

    let triagedUsers = await triageUsers();
    let position = triagedUsers.findIndex(triagedUser => user!.name === triagedUser.name);

    const NUMBER_OF_SAFE_DAYS = 10;
    response.json({
        "position": position,
        "total": triagedUsers.length,
        "estimate": Math.floor(position / triagedUsers.length * NUMBER_OF_SAFE_DAYS) // Starts at 0th day
    });
});

app.use("/api", apiRouter);

app.route("/version").get((request, response) => {
	response.json({
		"version": "0.0.1",
		"node": process.version
	});
});

const PORT = 80;
app.listen(PORT, () => {
	console.log(`ResQ server started on port ${PORT}`);
});
