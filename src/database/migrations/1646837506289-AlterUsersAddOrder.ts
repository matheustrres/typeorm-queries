import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AlterUsersAddOrder1646837506289 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users',
      new TableColumn({
        name: 'orders',
        type: 'varchar[]'
      })
    )

    const foreignKey = new TableForeignKey({
      columnNames: ['id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'games',
      name: 'fk_order_games',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
    })

    await queryRunner.createForeignKey('users', foreignKey)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'orders')
  }
}
