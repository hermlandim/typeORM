import "reflect-metadata";
import "dotenv/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm"; // Vai fazer conexão com o banco de dados

const setDataSourceConfig = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
  const migrationsPath: string = path.join(
    __dirname,
    "./migrations/**.{js,ts}"
  );

  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true, // sincroniza o banco de dados com as entidades // true: olha o banco de dados e zera o banco de dados e cria novamente as entidades // usa-se o synchronize em testes, jamais usa-se em produção onde é setado como false
      entities: [entitiesPath],
    };
  }

  return {
    type: "postgres",
    host: process.env.PGHOST,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT),
    database: process.env.DB,
    synchronize: false,
    logging: true, // mostra todos os logs de querys executadas no banco de dados ou servidor
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
};

const dataSourceConfig = setDataSourceConfig();

export default new DataSource(dataSourceConfig);
