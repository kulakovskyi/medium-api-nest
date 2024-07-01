import config from './ormconfig';

const ormseedconfig = {
  ...config,
  migrations: [__dirname + '/src/seeds/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/seeds',
  },
};

export default ormseedconfig;
