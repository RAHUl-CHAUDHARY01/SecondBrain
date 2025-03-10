"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
const app_1 = require("./app");
dotenv_1.default.config({
    path: "./.env"
});
// const app= express();
(0, db_1.default)()
    .then(() => {
    app_1.app.listen(process.env.PORT || 8000, () => {
        console.log(`mongodb connected in port ${process.env.PORT}`);
    });
    app_1.app.on("error", () => {
        console.log("application not able to talk to database");
    });
})
    .catch((err) => {
    console.log("error in mongodb connection");
    console.log(err);
});
