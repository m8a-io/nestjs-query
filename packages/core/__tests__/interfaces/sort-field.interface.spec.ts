import { SortDirection, SortNulls } from '@m8a/nestjs-query-core'

describe('SortField', () => {
  it('should define SortDirection', () => {
    expect(SortDirection).toBeDefined()
  })
  it('should define SortNulls', () => {
    expect(SortNulls).toBeDefined()
  })
})
