const consoleOut = (
  loginName,
  from,
  to,
  { commitContributionsByRepository, contributionCalendar, weeksWithoutContributions },
) => {
  console.log(`Contributions of ${loginName} from ${from} to ${to}`)
  console.table(commitContributionsByRepository)
  console.table(contributionCalendar)
  console.log('\n')
  console.log(`Total weeks without contribution: ${weeksWithoutContributions}`)
}

module.exports = {
  out: consoleOut,
}
