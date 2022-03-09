import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AlterGamesAddGenre1646835525567 implements MigrationInterface {
  name: 'AlterGamesAddGenre1646835525567'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('games', 
      new TableColumn({
        name: 'genre',
        type: 'varchar[]'
      })
    )

    const foreignKey = new TableForeignKey({
      columnNames: ['id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'games',
      name: 'fk_games_genre',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    })

    await queryRunner.createForeignKey('games', foreignKey)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('games', 'genre')
  }

}
