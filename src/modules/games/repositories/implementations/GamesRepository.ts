import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const queryBuild = this.repository
      .createQueryBuilder('games')
      .where('LOWER(title) like :title', {
        title: `%${param
            .toLowerCase()
            .trim()
            .replace(/\s{2,}/g, ' ')
        }%`
      })
      .getMany()

    return queryBuild
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const query = `SELECT COUNT(*) FROM games`
  
    return this.repository.query(query)
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const queryBuilder = await getRepository(User)
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.games', 'games')
      .where('games.id = :id', { id })
      .getMany()

    return queryBuilder
  }
}
