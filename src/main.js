const { gatherStatistics } = require('./gh-contribution-stats')

;(async function (from, to) {
  await gatherStatistics(from, to)
})(...process.argv.slice(2))
