import ky from 'ky'

const client = ky.extend({
  prefixUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  hooks: {
    beforeRequest: [(request) => {}], // Those will run for every request
    afterResponse: [(response) => {}], // Those will run for every response
  },
})

export default client
