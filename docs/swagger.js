const auth = require('./auth.swagger.json');
const business = require('./business.swagger.json');
const employees = require('./employees.swagger.json');
const schedule = require('./schedule.swagger.json');

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Business Manager API",
    version: "1.0.0"
  },
  tags: [
    ...auth.tags,
    ...business.tags,
    ...employees.tags,
    ...schedule.tags
  ],
  paths: {
    ...auth.paths,
    ...business.paths,
    ...employees.paths,
    ...schedule.paths
  },
  components: {
    schemas: {
      ...(auth.components?.schemas || {}),
      ...(business.components?.schemas || {}),
      ...(employees.components?.schemas || {}),
      ...(schedule.components?.schemas || {})
    },
    securitySchemes: {
      ...(auth.components?.securitySchemes || {}),
      ...(business.components?.securitySchemes || {}),
      ...(employees.components?.securitySchemes || {}),
      ...(schedule.components?.securitySchemes || {})
    }
  }
};