var time = require('../')

test('parses a time', () => {
  expect(time.parse('1993-10-12 05:34:21')).toBeTruthy()
  expect(time.parse('1993-10-12 05:34:21').day).toBe(12)
  expect(time.parse('2018-04-25T22:15:21.796Z').day).toBe(25)
  expect(time.parse('1524694729228', { millis: true }).day).toBe(25)
  expect(time.parse("August 30 1982 America/Chicago", { format: "MMMM dd yyyy z" }).day).toBe(30)
  expect(time.parse("8 30 1982 10:32 PM -05:00", { format: "M dd yyyy hh:mm a ZZ" }).hour).toBe(22)
})

test('parses a time with a timezone', () => {
  expect(time.parse('1993-10-12 23:00', { zone: 'utc-6'}).toUTC().day).toBe(13) 
})

test('Pretty prints a date', () => {
  expect(time.prettyPrint('1993-10-12 23:00 Z', { zone: 'utc-5'})).toBe('1993-10-12 18:00 -05:00')
  expect(time.prettyPrint('1993-10-12 23:00', { zone: 'utc' })).toBe('1993-10-12 23:00 Z')

  const d = time.parse('1993-10-12 23:00 Z')
  expect(time.prettyPrint(d, { zone: 'utc'})).toBe('1993-10-12 23:00 Z')
  expect(time.prettyPrint(d, { zone: 'utc-5'})).toBe('1993-10-12 18:00 -05:00')
})

test('rejects an invalid time', () => {
  expect(time.parse('test')).toBeFalsy()
})

test('compares times', () => {
  expect(time.isAfter(new Date(), '1991-10-10')).toBe(true)
  expect(time.isBefore(new Date(), '2991-10-10')).toBe(true)
  expect(time.isBetween(new Date(), '1991-10-10', '2991-10-10')).toBe(true)
})

