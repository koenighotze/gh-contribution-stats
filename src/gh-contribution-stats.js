require('dotenv').config()

const { analyzeContributions } = require('./analysis')
const { out } = require('./console')
const { fetchStats } = require('./github-api')
const users = require('./users-cwp.json')

const buildStatistics = async (loginName, from, to) => {
  return {
    loginName,
    from,
    to,
    data: analyzeContributions(await fetchStats(loginName, from, to)),
  }
}

const gatherStatistics = async (from, to) => {
  try {
    const results = await Promise.all(users.logins.map((login) => buildStatistics(login, from, to)))

    results.forEach(({ loginName, from, to, data }) => out(loginName, from, to, data))
  } catch ({ message }) {
    console.error(message)
  }
}

;(async function (from, to) {
  await gatherStatistics(from, to)
})(...process.argv.slice(2))
