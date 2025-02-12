"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
exports.app = app;
console.log("hello");
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
// const app=express();
//bringing routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
app.use("/api/v1/user", user_routes_1.default);
const content_routes_1 = __importDefault(require("./routes/content.routes"));
app.use("/api/v1", content_routes_1.default);
