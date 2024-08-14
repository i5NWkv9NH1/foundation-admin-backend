// src/data-source.ts
import { ConfigService } from '@nestjs/config'
import { DataSource, DataSourceOptions } from 'typeorm'

// Create an instance of the TypeOrmConfigService
const getDataSourceOptions = (): DataSourceOptions => {
  const configService = new ConfigService()
  return {
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DB'),
    migrations: ['src/migrations/*{.ts,.js}'],
    synchronize: true
  }
}

export const AppDataSource = new DataSource(getDataSourceOptions())
