import { Request, Response } from "express";
import { AppDataSource } from "../../datasource";
import { Heroe } from "../models/heroe.entity";


const heroRepository = AppDataSource.getRepository(Heroe);

export const getAll = async (req: Request, res: Response) => {

    const heroes = await heroRepository.find();

    return res.json(heroes);

};      

export const getByName = async (req: Request, res: Response) => {
    const { id } = req.params;
    const heroe = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!heroe) {
        return res.status(404).json({ message: 'Super Hero Not Found' });
    }

    res.json(heroe);
};

export const create = async (req: Request, res: Response) => {
    const { nombre, alte } = req.body;
    const oldhero = await heroRepository.findOneBy({ alte } );
    if (oldhero) {
        return res.status(400).json({ message: `The hero ${alte} already exist` });
    }
    const newHero = await heroRepository.save({ nombre, alte });
    res.status(201).json(newHero);
};

export const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const oldHero = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!oldHero) {
        return res.status(404).json({ message: `Hero with id: ${id} not found`})
    }

    const deletedHero = await heroRepository.delete({ id: Number.parseInt(id) });

    res.json({affectedRows: deletedHero,});
}

export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { alte, nombre} = req.body;

    const heroById = await heroRepository.findOneBy({ id: Number.parseInt(id) });

    if (!heroById) {
        return res.status(404).json({message: `Hero with id ${id} not found`})
    }

    if (alte) {
        const oldHero = await heroRepository.findOneBy({ alte });

        if (oldHero && oldHero.id !== Number.parseInt(id)) {
            return res.status(400).json({message: `Hero ${alte} already exists` })
        }
    }

    const updatedHero = heroRepository.create({
        id: heroById.id,
        alte: alte ? alte : heroById.alte,
        nombre: nombre ? nombre : heroById.nombre,
    });

    await heroRepository.save(updatedHero);

    res.json(updatedHero);
}