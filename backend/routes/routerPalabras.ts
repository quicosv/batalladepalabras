import { Router } from "express";
import { getPalabra } from "../controllers/palabrasController";

export const routerPalabras = Router();
routerPalabras.get('/:palabra', getPalabra);