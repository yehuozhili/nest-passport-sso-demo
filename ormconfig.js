module.exports = [
  {
    name: 'default',
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: false,
    synchronize: true,
    entities: ['dist/src/**/*.entity.{ts,js}'],
    migrations: ['src/migration/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
];
