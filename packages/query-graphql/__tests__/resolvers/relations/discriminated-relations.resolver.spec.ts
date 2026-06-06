import { Injectable, Provider } from '@nestjs/common'
import { Field, GraphQLSchemaBuilderModule, GraphQLSchemaFactory, ID, InterfaceType, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { Test } from '@nestjs/testing'
import { Class, DeepPartial, Filter, NoOpQueryService, QueryService } from '@ptc-org/nestjs-query-core'
import { printSchema } from 'graphql'

import { Authorizer, CRUDResolver, CursorConnection, FilterableField, getAuthorizerToken } from '../../../src'

describe('Discriminated Relations Resolver', () => {
  const generateSchemaWithProviders = async (resolvers: Class<any>[], providers: Provider[]): Promise<string> => {
    const moduleRef = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
      providers: [...resolvers, ...providers]
    }).compile()
    const sf = moduleRef.get(GraphQLSchemaFactory)
    const schema = await sf.create(resolvers)
    return printSchema(schema)
  }

  @InterfaceType()
  abstract class TestBaseDTO {
    @FilterableField(() => ID)
    id!: string
  }

  @ObjectType('TestRelation')
  @CursorConnection('bases', () => TestBaseDTO)
  class TestRelationDTO {
    @FilterableField(() => ID)
    id!: string

    @FilterableField()
    name!: string
  }

  @ObjectType({ implements: () => [TestBaseDTO] })
  @CursorConnection('relations', () => TestRelationDTO, { update: { enabled: true } })
  class TestConcreteDTO extends TestBaseDTO {
    @FilterableField()
    concreteField!: string
  }

  @QueryService(TestConcreteDTO)
  class TestConcreteService extends NoOpQueryService<TestConcreteDTO, DeepPartial<TestConcreteDTO>, DeepPartial<TestConcreteDTO>> {}

  @Injectable()
  class TestConcreteDTOAuthorizer implements Authorizer<TestConcreteDTO> {
    authorize(): Promise<Filter<TestConcreteDTO>> {
      return Promise.resolve({})
    }

    authorizeRelation<Relation>(): Promise<Filter<Relation>> {
      return Promise.resolve({})
    }
  }

  const expectResolverSDL = async () => {
    @Resolver(() => TestConcreteDTO)
    class TestResolver extends CRUDResolver(TestConcreteDTO, {
      create: {},
      update: {},
      delete: {}
    }) {
      constructor(service: TestConcreteService) {
        super(service)
      }
    }

    const schema = await generateSchemaWithProviders(
      [TestResolver],
      [TestConcreteService, { provide: getAuthorizerToken(TestConcreteDTO), useClass: TestConcreteDTOAuthorizer }]
    )
    expect(schema).toMatchSnapshot()
  }

  it('should generate add and set mutations for discriminated DTOs', () => expectResolverSDL())
})