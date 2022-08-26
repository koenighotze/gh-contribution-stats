const analyzeContributions = (contribution) => {
  const { commitContributionsByRepository, contributionCalendar } =
    contribution.user.contributionsCollection

  const commits = commitContributionsByRepository.map(({ contributions, repository }) => ({
    Repository: repository.name,
    Contributions: contributions.totalCount,
  }))

  let weeksWithoutContributions = 0
  const contributions = contributionCalendar.weeks.map(({ firstDay, contributionDays }) => {
    const sum = contributionDays.reduce((agg, elem) => agg + elem.contributionCount, 0)

    weeksWithoutContributions += sum === 0 ? 1 : 0

    return {
      Day: firstDay,
      Contributions: sum,
    }
  })

  return {
    commitContributionsByRepository: commits,
    contributionCalendar: contributions,
    weeksWithoutContributions,
  }
}

module.exports = {
  analyzeContributions,
}
