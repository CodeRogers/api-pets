import { Request, Response } from 'express';
import { Client } from '../entity/Client';
import { AppDataSource } from '../data-source';
import { Pet } from '../entity/Pet';

export default class PetsController {
  public async create(req: Request, res: Response) {
    const pet: Pet = AppDataSource.manager.create(Pet, req.body);
    try {
      await AppDataSource.manager.findOneByOrFail(Client, {
        id: pet.client_id,
      });
      await AppDataSource.manager.save(Pet, pet);
      return res.status(201).json(pet);
    } catch (error) {
      throw res.status(400).send({
        code: 400,
        status_code: 'BadRequest',
        message: `Problemas ao inserir Pet! Cliente não existe!`,
      });
    }
  }

  public async getAll(req: Request, res: Response) {
    const petRepository = AppDataSource.getRepository(Pet);
    const pets = await petRepository.find();
    return res.status(200).json(pets);
  }

  public async getOne(req: Request, res: Response) {
    const id = req.params.id as unknown as number;
    const petRepository = AppDataSource.getRepository(Pet);
    const pet = await petRepository.findOneBy({ id });
    if (!pet)
      throw res.status(404).send({
        code: 404,
        status_code: 'NotFound',
        message: `Pet com id: '${id}' não encontrado!`,
      });
    return res.status(200).json(pet);
  }

  public async getByTutor(req: Request, res: Response) {
    const id = req.params.id as unknown as number;
    const petRepository = AppDataSource.getRepository(Pet);
    try {
      const pets = await petRepository.findBy({ client_id: id });
      return res.status(200).json(pets);
    } catch (error) {
      throw res
        .status(404)
        .send({
          code: 404,
          status_code: 'NotFound',
          message: `Pet com id: '${id}' não encontrado!`,
        });
    }
  }

  public async update(req: Request, res: Response) {
    const id = req.params.id as unknown as number;
    const petRepository = AppDataSource.getRepository(Pet);
    const pet = await petRepository.findOneByOrFail({ id });
    petRepository.merge(pet, req.body);
    await petRepository.save(pet);
    return res.sendStatus(204);
  }

  public async delete(req: Request, res: Response) {
    const id = req.params.id as unknown as number;
    const petRepository = AppDataSource.getRepository(Pet);
    const pet = await petRepository.findOneByOrFail({ id });
    await petRepository.delete(pet);
    return res.sendStatus(204);
  }
}
