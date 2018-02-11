const API = {
  development: {
    endpoint: 'http://localhost:3001/api/v1/'
  },
  production: {
    endpoint: 'http://localhost:3001/api/v1/'
  },
  test: {
    endpoint: 'http://localhost:3001/api/v1/'
  }
}[process.env.REACT_APP_STAGE];

export default API;
