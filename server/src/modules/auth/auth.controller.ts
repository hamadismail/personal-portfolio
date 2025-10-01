import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const loginWithEmailAndPassword = async (req: Request, res: Response) => {
  try {
    const { user, token } = await AuthService.loginWithEmailAndPassword(
      req.body
    );
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ user, accessToken: token });
  } catch (error: any) {
    if (error.message === "User not found!") {
      res.status(404).json({ message: error.message });
    } else if (error.message === "Password is incorrect!") {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const logout = (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logged out successfully" });
};

const me = (req: Request, res: Response) => {
  const user = (req as any).user;
  res.status(200).json({ user });
};

export const AuthController = {
  loginWithEmailAndPassword,
  logout,
  me,
};
