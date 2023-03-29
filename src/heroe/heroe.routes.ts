import { Router } from "express";
import { getAll, getByName, create, remove, update } from "./heroe.controller";

export const heroeRoute = Router();

heroeRoute.get('/', getAll);

heroeRoute.get('/:id', getByName);

heroeRoute.post('/', create);

heroeRoute.delete('/:id', remove);

heroeRoute.put('/:id', update);
