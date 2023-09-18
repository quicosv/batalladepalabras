import { Router } from "express";
import { existePalabra } from "../controllers/palabrasController";

export const routerPalabras = Router();
routerPalabras.get("/:palabra", existePalabra);
