import { DataTypes, Model, ForeignKey } from 'sequelize';
import { Sequelize } from 'sequelize';
import { Session } from './Session';
import { Task } from './Task';
import { Option } from './Option';

export class Answer extends Model {
  public id!: number;
  public sessionId!: ForeignKey<Session['id']>;
  public taskId!: ForeignKey<Task['id']>;
  public optionId!: ForeignKey<Option['id']>;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Answer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sessionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sessions',
          key: 'id',
        },
      },
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tasks',
          key: 'id',
        },
      },
      optionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'options',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Answer',
      tableName: 'answers',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['sessionId', 'taskId']
        }
      ]
    }
  );

  return Answer;
};