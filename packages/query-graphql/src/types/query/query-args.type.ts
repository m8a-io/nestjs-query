import { AbstractClass, Class } from '@m8a/nestjs-query-core'

import { removeUndefinedValues } from '../../common'
import { getQueryOptions } from '../../decorators'
import { PagingStrategies } from './paging'
import {
  createCursorQueryArgsType,
  createNonePagingQueryArgsType,
  createOffsetQueryArgs,
  CursorQueryArgsTypeOpts,
  DEFAULT_QUERY_OPTS,
  NonePagingQueryArgsTypeOpts,
  OffsetQueryArgsTypeOpts,
  QueryArgsTypeOpts,
  StaticQueryType
} from './query-args'

const getMergedQueryOpts = <DTO>(DTOClass: Class<DTO> | AbstractClass<DTO>, opts?: QueryArgsTypeOpts<DTO>): QueryArgsTypeOpts<DTO> => {
  const decoratorOpts = getQueryOptions(DTOClass as Class<DTO>)
  return {
    ...DEFAULT_QUERY_OPTS,
    pagingStrategy: PagingStrategies.CURSOR,
    ...removeUndefinedValues(decoratorOpts ?? {}),
    ...removeUndefinedValues(opts ?? {})
  }
}

// tests if the object is a QueryArgs Class
// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export const isStaticQueryArgsType = <DTO>(obj: any): obj is StaticQueryType<DTO, PagingStrategies> =>
  typeof obj === 'function' && 'PageType' in obj && 'SortType' in obj && 'FilterType' in obj

export function QueryArgsType<DTO>(
  DTOClass: Class<DTO> | AbstractClass<DTO>,
  opts: OffsetQueryArgsTypeOpts<DTO>
): StaticQueryType<DTO, PagingStrategies.OFFSET>
export function QueryArgsType<DTO>(
  DTOClass: Class<DTO> | AbstractClass<DTO>,
  opts: NonePagingQueryArgsTypeOpts<DTO>
): StaticQueryType<DTO, PagingStrategies.NONE>
export function QueryArgsType<DTO>(
  DTOClass: Class<DTO> | AbstractClass<DTO>,
  opts: CursorQueryArgsTypeOpts<DTO>
): StaticQueryType<DTO, PagingStrategies.CURSOR>
export function QueryArgsType<DTO>(DTOClass: Class<DTO> | AbstractClass<DTO>, opts?: QueryArgsTypeOpts<DTO>): StaticQueryType<DTO, PagingStrategies>
export function QueryArgsType<DTO>(DTOClass: Class<DTO> | AbstractClass<DTO>, opts?: QueryArgsTypeOpts<DTO>): StaticQueryType<DTO, PagingStrategies> {
  // override any options from the DTO with the options passed in
  const mergedOpts = getMergedQueryOpts(DTOClass, opts)
  if (mergedOpts.pagingStrategy === PagingStrategies.OFFSET) {
    return createOffsetQueryArgs(DTOClass as Class<DTO>, mergedOpts)
  }

  if (mergedOpts.pagingStrategy === PagingStrategies.NONE) {
    return createNonePagingQueryArgsType(DTOClass as Class<DTO>, mergedOpts)
  }

  return createCursorQueryArgsType(DTOClass as Class<DTO>, mergedOpts)
}
