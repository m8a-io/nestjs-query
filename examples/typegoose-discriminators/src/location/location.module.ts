import { Module } from '@nestjs/common'
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql'
import { NestjsQueryTypegooseModule } from '@ptc-org/nestjs-query-typegoose'
import { LocationEntity } from './entities/location.entity'
import { LocationDTO } from './dto/location.dto';
import { LocationInputDTO } from './dto/location-input.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([LocationEntity])],
      services: [],
      resolvers: [
        {
          DTOClass: LocationDTO,
          EntityClass: LocationEntity,
          CreateDTOClass: LocationInputDTO
        }
      ]
    })
  ],
  providers: []
})
export class LocationModule {}
