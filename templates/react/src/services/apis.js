import reqwest from 'reqwest';

export const login = values => {
  return reqwest({ url: '/mock-api/login.json', method: 'get', values })
}

export const getCrowds = values => {
  return reqwest({ url: '/mock-api/crowd-list.json', method: 'get', values })
}