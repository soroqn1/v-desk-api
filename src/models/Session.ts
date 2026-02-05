import { DataTypes, Model } from 'sequelize';
import { Sequelize } from 'sequelize';

export class Session extends Model {
  public id!: number;
  public token!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Session.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Session',
      tableName: 'sessions',
      timestamps: true,
    }
  );

  return Session;
};