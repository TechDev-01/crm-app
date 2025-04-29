import Usuario from "../models/Usuario";
import { Request, Response } from "express";
import { generateToken } from "../utils/generateToken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      // Verficacion sencilla
      res.status(400).json({ message: "Todos los campo son obligatorios" });
    }

    // Verificar si el usuario existe
    const userExist = await Usuario.findOne({ username }, { email });
    if (userExist) {
      res.status(400).json({ message: "El usuario ya existe" });
      return;
    }

    // Hasheo de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const newUser = new Usuario({
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();
    res.status(201).json({ message: "¡Usuario registrado correctamente!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email y contraseña son obligatorios" });
    return;
  }

  try {
    const user = await Usuario.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "El usuario no fue encontrado" });
      return;
    }

    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "La contraseña no coincide" });
      return;
    }

    // Genaracion del token
    const token = generateToken(user._id.toString(), user.username);

    res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .send("login exitoso");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
