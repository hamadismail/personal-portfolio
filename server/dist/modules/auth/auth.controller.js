"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const loginWithEmailAndPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, token } = yield auth_service_1.AuthService.loginWithEmailAndPassword(req.body);
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        res.status(200).json({ user, accessToken: token });
    }
    catch (error) {
        res.status(404).json({ message: "Invalid Creadentials" });
    }
});
const logout = (req, res) => {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logged out successfully" });
};
const me = (req, res) => {
    const user = req.user;
    res.status(200).json({ user });
};
exports.AuthController = {
    loginWithEmailAndPassword,
    logout,
    me,
};
