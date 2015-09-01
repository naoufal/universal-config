export default {
  AWS: {
    accessKey: process.env.AWS_ACCESS_KEY || 'foo',
    secretKey: process.env.AWS_SECRET_KEY
  },
  MAILCHIMP: {
    username: process.env.MAILCHIMP_USERNAME,
    password: process.env.MAILCHIMP_PASSWORD
  }
}

