import Usuario from "../models/Usuario";
import { Request, Response } from "express";
import { generateToken } from "../utils/generateToken";
import bcrypt from "bcrypt";

/**
 * 
 * @param req interfaz Request que representa la peticion HTTP
 * @param res interfaz Response que representa la respuesta HTTP
 * @returns {void} Retorna un mensaje de exito o error al registrar un usuario
 * @description Esta funcion se encarga de registrar un nuevo usuario en la base de datos.
 * Verifica que los campos requeridos esten presentes y que el usuario no sea existente.
 * En caso de que el usuario no exista, se procede a hashear la contraseña y guardar el nuevo usuario.
 * Si el registro es exitoso, se retorna un mensaje de exito.
 */

export const registerUser = async (req: Request, res: Response): Promise<void> => {
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

/**
 * @param req interfaz Request que representa la peticion HTTP
 * @param res interfaz Response que representa la respuesta HTTP
 * @returns {void} Retorna una cookie con el token de acceso y un mensaje de exito o error al inciar sesion
 * @description Esta funcion se encarga de iniciar sesion de un usuario existente.
 * Verifica que los campos requeridos esten presentes y que el usuario exista.
 * Si el usuario existe, se compara la contraseña proporcionada con la almacenada en la base de datos.
 * Si la contraseña coincide, se genera un token de acceso y se retorna una cookie con el token.
 * Si el usuario no existe o la contraseña no coincide, se retorna un mensaje de error.
 */

export const loginUser = async (req: Request, res: Response): Promise<void> => {
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
    .json({ message: "login exitoso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
