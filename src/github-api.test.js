const { v4: uuidv4 } = require('uuid')
describe('The github API', () => {
  let mockGql,
    mockSetHeader,
    mockRequest,
    fetchStats,
    loginName,
    from,
    to,
    GraphQLClient,
    originalGhAPIKey

  beforeAll(() => {
    originalGhAPIKey = process.env.GH_API_KEY
    process.env.GH_API_KEY = uuidv4()
  })

  beforeEach(() => {
    loginName = uuidv4()
    from = uuidv4()
    to = uuidv4()
    mockSetHeader = jest.fn()
    mockRequest = jest.fn()
    mockGql = jest.fn()
    jest.mock('graphql-request', () => ({
      GraphQLClient: jest.fn().mockImplementation(() => ({
        setHeader: mockSetHeader,
        request: mockRequest,
      })),
      gql: mockGql,
    }))

    GraphQLClient = require('graphql-request').GraphQLClient
    fetchStats = require('./github-api').fetchStats
  })

  afterAll(() => {
    process.env.GH_API_KEY = originalGhAPIKey
  })

  describe('fetching the statistics', () => {
    it('should call the API', async () => {
      await fetchStats(loginName, from, to)

      expect(GraphQLClient).toHaveBeenCalledWith('https://api.github.com/graphql')
      expect(mockRequest).toBeCalled()
    })

    it('should call pass the authentication token', async () => {
      await fetchStats(loginName, from, to)

      expect(mockSetHeader).toBeCalledWith('authorization', `Bearer ${process.env.GH_API_KEY}`)
    })

    it('should return the query-response', async () => {
      const expectedResponse = { foo: 'bar' }
      mockRequest.mockResolvedValue(expectedResponse)

      const result = await fetchStats(loginName, from, to)

      expect(result).toEqual(expectedResponse)
    })

    describe('and calling the API fails', () => {
      let expectedError

      beforeEach(() => {
        expectedError = new Error(`Bumm ${uuidv4()}`)
        mockRequest.mockRejectedValue(expectedError)
      })

      it('should throw an exception', async () => {
        await expect(fetchStats(loginName, from, to)).rejects.toThrow(expectedError)
      })
    })
  })
})
