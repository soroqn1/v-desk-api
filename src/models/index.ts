import { Sequelize } from 'sequelize';
import initTask from './Task';
import initSession from './Session';
import initOption from './Option';
import initAnswer from './Answer';

// ПРЯМОЙ КОНФИГ - БЕЗ ИМПОРТОВ
const isProd = process.env.NODE_ENV === 'production';

const productionConfig = {
  dialect: 'mysql' as const,
  dialectOptions: {
    connectTimeout: 60000,
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

const developmentConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  dialect: 'mysql' as const
};

const sequelize = isProd && process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, productionConfig)
  : new Sequelize(
    developmentConfig.database || 'v_desk',
    developmentConfig.username || 'root',
    developmentConfig.password || '',
    developmentConfig
  );

const db: any = {
  sequelize,
  Sequelize,
};

// Инициализация моделей
db.Task = initTask(sequelize);
db.Session = initSession(sequelize);
db.Option = initOption(sequelize);
db.Answer = initAnswer(sequelize);

// Связи
db.Task.hasMany(db.Option, { foreignKey: 'taskId', as: 'options' });
db.Option.belongsTo(db.Task, { foreignKey: 'taskId' });
db.Task.hasMany(db.Answer, { foreignKey: 'taskId' });
db.Answer.belongsTo(db.Task, { foreignKey: 'taskId' });
db.Session.hasMany(db.Answer, { foreignKey: 'sessionId' });
db.Answer.belongsTo(db.Session, { foreignKey: 'sessionId' });
db.Option.hasMany(db.Answer, { foreignKey: 'optionId' });
db.Answer.belongsTo(db.Option, { foreignKey: 'optionId' });

export default db;