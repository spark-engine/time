# Spark Engine Time

This adds simple parsing, pretty printing, and comparison functions to [luxon](https://github.com/moment/luxon) (A library for working with dates and times in JS).

### `parse(date, options)`

This will automatically parse any string which matches the date formats ISO, SQL, HTTP, RFC2822. It can parse epoc time in milliseconds by passing `{ millis: true }` in the options hash.

options:
  - `millis`, Boolean: parse the date as epoc time in milliseconds.
  - `format`, String: set a specific format for parsing the date string. See custom formatting below.

Returns: a Luxon [DateTime object](https://moment.github.io/luxon/docs/class/src/datetime.js~DateTime.html) (or false if it cannot be parsed).
Luxon has many wonderful features, seriously check out that link.

### `isBefore(time1, time2)`

This parses both times and returns `true` if time1 comes before time2.

### `isAfter(time1, time2)`

This parses both times and returns `true` if time1 comes after time2.

### `isBetween(time, start, end)` 

This parses all three times and returns `true` if time comes between start and end.

### `prettyPrint(date, options)`

This works just like `parse` except that it converts dates to nicely formatted strings (omiting insignificant digits and formatting markers).

You can optionall pass a timezone or a formatting option.

- `zone: 'local'` - which zone to render the string. Accepts: an IANA zone supported by the host environment, a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a luxon's Zone class. Defaults to local.
- `millis: true` - Parse the date as epoc time in milliseconds.


## Custom Formatting

You may define a custom format for parsing dates using the `format` option. For example:

```javascript
time.parse("08 30 1982", { format: "MM dd yyyy" })
time.parse("8 30 1982 10:32 PM -05:00", { format: "M dd yyyy hh:mm a ZZ" })
time.parse("August 30 1982 America/Chicago", { format: "MMMM dd yyyy z" })
```

For a full list of options, refer to the [table of tokens](https://moment.github.io/luxon/docs/manual/parsing.html#table-of-tokens) in the Luxon
documentation.
