import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Client } from '../entity/Client';
export default class ClientsController {

  public async create(req: Request, res: Response): Promise<Response> {
    const clientRepository = AppDataSource.getRepository(Client);
    const client = clientRepository.create(req.body);
    await clientRepository.save(client);
    return res.status(201).json(client);
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const clientRepository = AppDataSource.getRepository(Client);
    const clients = await clientRepository.find();
    return res.status(200).json(clients);
  }

  public async getOne(req: Request, res: Response) {
    const id = req.params.id as unknown as number;
    const clientRepository = AppDataSource.getRepository(Client);
    const client = await clientRepository.findOneBy({ id });
    if (!client) {
      return res.status(404).send({
        code: 404,
        status_code: 'NotFound',
        message: `Cliente com id: '${id}' não encontrado!`,
      });
    }
    return res.status(200).json(client);
  }

  public async update(req: Request, res: Response) {
    const id = req.params.id as unknown as number;
    const clientRepository = AppDataSource.getRepository(Client);
    const client = await clientRepository.findOneByOrFail({ id });
    clientRepository.merge(client, req.body);
    await clientRepository.save(client);
    return res.sendStatus(204);
  }

  public async delete(req: Request, res: Response) {
    const id = req.params.id as unknown as number;
    const clientRepository = AppDataSource.getRepository(Client);
    const client = await clientRepository.findOneByOrFail({ id });
    await clientRepository.delete(client);
    return res.sendStatus(204);
  }
}
