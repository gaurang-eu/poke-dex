import * as ALL from './constants'

test('POKEMON_TYPES should be an object', () => {
  expect(typeof ALL.POKEMON_TYPES === 'object').toEqual(true)
})

test('LIST_LIMIT and INITIAL_OFFSET shuld be numbers', () => {
  expect(typeof ALL.LIST_LIMIT === 'number' && typeof ALL.INITIAL_OFFSET === 'number').toEqual(true)
})
