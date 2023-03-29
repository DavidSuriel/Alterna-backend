import { Router } from "express";
import { getAll, getByName, create, remove, update } from "./villian.controller";

export const villianRoute = Router();

villianRoute.get('/', getAll);

villianRoute.get('/:id', getByName);

villianRoute.post('/', create);

villianRoute.delete('/:id', remove);

villianRoute.put('/:id', update);