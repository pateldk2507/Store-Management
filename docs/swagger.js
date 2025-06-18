const auth = require('./auth.swagger.json');
const business = require('./business.swagger.json');
const employees = require('./employees.swagger.json');
const schedule = require('./schedule.swagger.json');
const categories = require('./category.swagger.json');
const closing_duties = require('./closingduties.swagger.json');
const emp_closing = require('./empclosing.swagger.json')

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
    ...categories.tags,
    ...closing_duties.tags,
    ...emp_closing.tags,
    ...schedule.tags
  ],
  paths: {
    ...auth.paths,
    ...business.paths,
    ...employees.paths,
    ...categories.paths,
    ...closing_duties.paths,
    ...emp_closing.paths,
    ...schedule.paths
  },
  components: {
    schemas: {
      ...(auth.components?.schemas || {}),
      ...(business.components?.schemas || {}),
      ...(employees.components?.schemas || {}),
      ...(categories.components?.schemas || {}),
      ...(closing_duties.components?.schemas || {}),
      ...(emp_closing.components?.schemas || {}),
      ...(schedule.components?.schemas || {})
    },
    securitySchemes: {
      ...(auth.components?.securitySchemes || {}),
      ...(business.components?.securitySchemes || {}),
      ...(employees.components?.securitySchemes || {}),
      ...(categories.components?.securitySchemes || {}),
      ...(closing_duties.components?.securitySchemes || {}),
      ...(emp_closing.components?.securitySchemes || {}),
      ...(schedule.components?.securitySchemes || {})
    }
  }
};