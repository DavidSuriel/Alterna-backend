import { Request, Response } from "express";
import { AppDataSource } from "../../datasource";
import { Villian } from "../models/villian.entity";


const villianRepository = AppDataSource.getRepository(Villian);

export const getAll = async (req: Request, res: Response) => {

    const villians = await villianRepository.find();

    return res.json(villians);

};      

export const getByName = async (req: Request, res: Response) => {
    const { id } = req.params;
    const villian = await villianRepository.findOneBy({ id: Number.parseInt(id) });

    if (!villian) {
        return res.status(404).json({ message: 'Super Villian Not Found' });
    }

    res.json(villian);
};

export const create = async (req: Request, res: Response) => {
    const { nombre, alte } = req.body;
    const oldhero = await villianRepository.findOneBy({ alte } );
    if (oldhero) {
        return res.status(400).json({ message: `The Villian ${alte} already exist` });
    }
    const newvillian = await villianRepository.save({ nombre, alte });
    res.status(201).json(newvillian);
};

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const oldVillian = await villianRepository.findOneBy({ id: Number.parseInt(id) });

    if (!oldVillian) {
        return res.status(404).json({ message: `Villian with id: ${id} not found`})
    }

    const deletedVillian = await villianRepository.delete({ id: Number.parseInt(id) });

    res.json({affectedRows: deletedVillian,});
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { alte, nombre} = req.body;

    const villianById = await villianRepository.findOneBy({ id: Number.parseInt(id) });

    if (!villianById) {
        return res.status(404).json({message: `Villian with id ${id} not found`})
    }

    if (alte) {
        const oldVillian = await villianRepository.findOneBy({ alte });

        if (oldVillian && oldVillian.id !== Number.parseInt(id)) {
            return res.status(400).json({message: `Villian ${alte} already exists` })
        }
    }

    const updatedVillian = villianRepository.create({
        id: villianById.id,
        alte: alte ? alte : villianById.alte,
        nombre: nombre ? nombre : villianById.nombre,
    });

    await villianRepository.save(updatedVillian);

    res.json(updatedVillian);
}