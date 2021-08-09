module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['upload.wikimedia.org', 'i.ibb.co']
  },
  env: {
    MONGODB_CLIENT: process.env.MONGODB_CLIENT,
  }
}
