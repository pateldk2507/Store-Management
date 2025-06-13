const auth = require('./auth.swagger.json');
const business = require('./business.swagger.json');

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Business Manager API",
    version: "1.0.0"
  },
  tags: [
    ...auth.tags,
    ...business.tags
  ],
  paths: {
    ...auth.paths,
    ...business.paths
  },
  components: {
    schemas: {
      ...(auth.components?.schemas || {}),
      ...(business.components?.schemas || {})
    },
    securitySchemes: {
      ...(auth.components?.securitySchemes || {}),
      ...(business.components?.securitySchemes || {})
    }
  }
};