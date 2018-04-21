const API_TYPE = '@@API'

const createApiAction = (type, query, variables) => ({
  [API_TYPE]: {
    type,
    data: {
      query,
      variables,
    }
  }
})

export {
  API_TYPE,
  createApiAction,
}
