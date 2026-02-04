import { DataTypes, Model } from 'sequelize';
import { Sequelize } from 'sequelize';

export class Task extends Model {
  public id!: number;
  public instruction!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Task.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      instruction: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: true,
    }
  );

  return Task;
};