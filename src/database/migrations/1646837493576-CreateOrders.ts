import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrders1646837493576 implements MigrationInterface {
  name: 'CreateOrders1646837493576'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          { 
            name: 'id',
            type: 'uuid'
          },
          {
            name: 'game_id',
            type: 'uuid'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders')
  }
}
