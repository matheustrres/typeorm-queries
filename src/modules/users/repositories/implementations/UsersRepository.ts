import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    const userData = await this.repository.findOne(user_id, {
      relations: ['games']
    })

    return userData
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const query = `
      SELECT 
        *
      FROM 
        users
      ORDER BY 
        first_name
      ASC
    `

    return this.repository.query(query)
  }

  async findUserByFullName({ first_name, last_name, }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const query = `
      SELECT
        first_name,
        last_name,
        email
      FROM 
        users
      WHERE 
        LOWER(first_name) = $1 AND
        LOWER(last_name) = $2
    `,
      values = [first_name.toLowerCase(), last_name.toLowerCase()]

    return this.repository.query(query, values)
  }
}
