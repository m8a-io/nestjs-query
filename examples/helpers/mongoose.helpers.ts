import { MongooseModuleOptions } from '@nestjs/mongoose'

export const mongooseConfig = (db: string, overrides?: Partial<MongooseModuleOptions>): MongooseModuleOptions => ({
  //  old code
  //  uri: `mongodb://localhost/${db}`,
  uri: `mongodb://testUser:owfwoeijhweoihjwefweoijh2342345!@mongo-db-rs0.m8a-mongodb.svc.cluster.local:27017/test?authSource=test`,
  ...overrides
})
