import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/AuthenticateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUsers = container.resolve(CreateUserService);
    const user = await createUsers.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}
