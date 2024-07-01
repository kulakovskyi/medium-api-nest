import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'dpg-cq1bu4mehbks73f8ie9g-a.frankfurt-postgres.render.com',
  port: 5432,
  username: 'medium_db_user',
  password: 'WBWaBP3BAStzcDfGTnlPeogOkenSEAwX',
  database: 'medium_db',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};

export default config;
