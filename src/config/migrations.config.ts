import { typeOrmConfig } from './database.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const migrationConfig: TypeOrmModuleOptions = Object.assign(typeOrmConfig, {
  migrationsRun: false,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
});

export = migrationConfig;
