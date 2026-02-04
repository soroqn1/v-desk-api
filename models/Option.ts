import { DataTypes, Model, ForeignKey } from 'sequelize';
import { Sequelize } from 'sequelize';
import { Task } from './Task';

export class Option extends Model {
  public id!: number;
  public taskId!: ForeignKey<Task['id']>;
  public text!: string;
  public isCorrect!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Option.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tasks',
          key: 'id',
        },
      },
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Option',
      tableName: 'options',
      timestamps: true,
    }
  );

  return Option;
};