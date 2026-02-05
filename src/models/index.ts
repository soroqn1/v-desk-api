import { Sequelize } from 'sequelize';
import * as configData from '../config/config.js';
const allConfig = (configData as any).default || configData;
const env = (process.env.NODE_ENV || 'development') as string;
const config = allConfig[env];

import initTask from './Task';
import initSession from './Session';
import initOption from './Option';
import initAnswer from './Answer';

const sequelize = config.use_env_variable && process.env[config.use_env_variable]
  ? new Sequelize(process.env[config.use_env_variable] as string, config)
  : new Sequelize(config.database, config.username, config.password, config);
const db = {
  sequelize,
  Sequelize,
  Task: initTask(sequelize),
  Session: initSession(sequelize),
  Option: initOption(sequelize),
  Answer: initAnswer(sequelize),
};

db.Task.hasMany(db.Option, { foreignKey: 'taskId', as: 'options' });
db.Option.belongsTo(db.Task, { foreignKey: 'taskId' });

db.Task.hasMany(db.Answer, { foreignKey: 'taskId' });
db.Answer.belongsTo(db.Task, { foreignKey: 'taskId' });

db.Session.hasMany(db.Answer, { foreignKey: 'sessionId' });
db.Answer.belongsTo(db.Session, { foreignKey: 'sessionId' });

db.Option.hasMany(db.Answer, { foreignKey: 'optionId' });
db.Answer.belongsTo(db.Option, { foreignKey: 'optionId' });

export default db;