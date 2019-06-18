var DateTime = require('luxon').DateTime

function isBefore(date, end) {
  end = parse(end)
  date = parse(date)
  return date == DateTime.min(end, date)
}

function isAfter(date, start) {
  start = parse(start)
  date = parse(date)
  return date == DateTime.max(start, date)
}

function isBetween(date, date1, date2) {
  date = parse(date)
  date1 = parse(date1)
  date2 = parse(date2)

  if (date.isValid && date1.isValid && date2.isValid) {
    // Determine start and end dates (to allow any order in args)
    var start = DateTime.min(date1, date2)
    var end = DateTime.max(date1, date2)

    return DateTime.max(start, date) == DateTime.min(date, end)
  } else {
    return false
  }
}

function parse(date, options) {
  options = options || {}

  var formats = [ "ISO", "SQL", "HTTP", "RFC2822" ],
      parsedDate

  // If a custom format has been set
  if (options.format) {
    parsedDate = DateTime.fromFormat(date, options.format)
    if (parsedDate.isValid) return parsedDate
    else return false
  }

  // Parse as epoc time in milliseconds
  if (options.millis && !isNaN(date)) {
    date = Number(date)
    formats.unshift('Millis')
  }

  // Is already a DateTime object
  if (typeof date == 'object') {
    if (date.toISO) return date
    else formats.unshift('Object')
  }

  // Parse string formats
  formats.forEach(function(format) {
    var func = DateTime['from'+format]
    if ((!parsedDate || !parsedDate.isValid) && func) {
      parsedDate = func(date, options)
    }
  })

  return parsedDate.isValid ? parsedDate : false
}

// Remove insignificant digits
function prettyPrint(date, options) {
  date = parse(date, options)

  if (options && options.zone) date = date.setZone(options.zone)

  if (date) {
    return date.toISO().replace('T', ' ').replace('.000',' ').replace(':00 ',' ')
  } else {
    return "Unparseable date string" 
  }
}

// Add time parsing and comparison to Luxon API
DateTime.parse = parse;
DateTime.isBefore = isBefore;
DateTime.isAfter = isAfter;
DateTime.isBetween = isBetween;
DateTime.prettyPrint = prettyPrint

module.exports = DateTime
