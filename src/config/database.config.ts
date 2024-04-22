import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import * as dotenv from 'dotenv';
import * as chalk from 'chalk';
import { DataSource } from 'typeorm';

dotenv.config();

export function dbEnvironmentValidation() {
  if (
    !(
      process.env.POSTGRES_USER &&
      process.env.POSTGRES_PASSWORD &&
      process.env.POSTGRES_DATABASE
    )
  ) {
    console.log(
      chalk.bgRed.white.bold(
        'Postgres Username, Password or DB Name not provided!\nExiting...',
      ),
    );
    process.exit(1);
  }
}
export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD, 
    database: process.env.POSTGRES_DATABASE,
    entities: [
      User
     ],
    migrations: [],
    autoLoadEntities: true,
    synchronize: false,
    logging: process.env.NODE_ENV === 'development' ? ['error'] : null,
    logger: 'simple-console',
    // extra: {
    //   max: +process.env.POSTGRES_MAXIMUM_CONNECTIONS,
    //   min: +process.env.POSTGRES_MINIMUM_CONNECTIONS,
    //   idleTimeoutMillis: +process.env.POSTGRES_IDLE_TIMEOUT_MILIS,
    //   connectionTimeoutMillis: +process.env.POSTGRES_CONNECTIONS_TIMEOUT_MILLIS,
    //   idle: +process.env.POSTGRES_IDLE,
    //   statement_timeout: +process.env.POSTGRES_STATEMENT_TIMEOUT,
    // },
  }),
};

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [__dirname + '/../entities/*{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
