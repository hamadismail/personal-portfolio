"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const user_routes_1 = require("./modules/user/user.routes");
const blogs_routes_1 = require("./modules/blogs/blogs.routes");
const projects_routes_1 = require("./modules/projects/projects.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, compression_1.default)()); // Compresses response bodies for faster delivery
app.use(express_1.default.json()); // Parse incoming JSON requests
app.use((0, cookie_parser_1.default)()); // Parse cookies from incoming requests
app.use((0, cors_1.default)({
    origin: "https://hamad.vercel.app",
    credentials: true,
}));
app.use("/api/v1/auth", auth_routes_1.authRouter);
app.use("/api/v1/user", user_routes_1.userRouter);
app.use("/api/v1/blogs", blogs_routes_1.blogRouter);
app.use("/api/v1/projects", projects_routes_1.projectRouter);
// Default route for testing
app.get("/", (req, res) => {
    res.send("API is running");
});
// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});
exports.default = app;
