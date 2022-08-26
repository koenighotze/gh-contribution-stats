const { GraphQLClient, gql } = require('graphql-request')
const GH_API_KEY = process.env.GH_API_KEY
const fetchStats = async (loginName, from, to) => {
  const query = gql`{
        user(login: "${loginName}") {
            login
            name
            contributionsCollection(
                from: "${from}T00:00:00Z"
                to: "${to}T00:00:00Z"
            ) {
                commitContributionsByRepository(maxRepositories: 25) {
                    contributions {
                        totalCount
                    }
                    repository {
                        name
                    }
                }
                contributionCalendar {
                    weeks {
                        firstDay
                        contributionDays {
                            contributionCount
                        }
                    }
                    totalContributions
                }
            }
        }
    }`
  const client = new GraphQLClient('https://api.github.com/graphql')
  client.setHeader('authorization', `Bearer ${GH_API_KEY}`)
  return await client.request(query)
}

module.exports = {
  fetchStats,
}
