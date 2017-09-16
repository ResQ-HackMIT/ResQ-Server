import * as express from "express";
import * as compression from "compression";

// Set up Express and its middleware
export let app = express();
app.use(compression());

// Throw and show a stack trace on an unhandled Promise rejection instead of logging an unhelpful warning
process.on("unhandledRejection", err => {
	throw err;
});


// Expected post sample:
// {
// 		"name": "Aaron Vontell",
// 		"medicalConditions": "Obesity II, Diabetes",
//     	"allergies": "Peanut Butter, Cats",
//     	"medications": "Laxatives, Penicillin",
// 		"weight": "260",
//     	"height": "5'11\"",
// 		"age": "20",
//     	"kids": "0",
//     	"animals": "0",
//     	"spouse": "false"
// }
// 
// Expected return:
//  {
// 	 	"success": "true"
//  }
app.route("/api/create-account").get((request, response) => {
	response.json({
		"success": "true"
	})
});

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
