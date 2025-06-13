// create-structure.js
// Run with: node create-structure.js

const fs = require('fs');
const path = require('path');

// Utility to create folder if doesn't exist
function createFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log('Created folder:', folderPath);
  }
}

// Utility to create file with content
function createFile(filePath, content = '') {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log('Created file:', filePath);
  }
}

const baseDir = process.cwd();

const folders = [
  'config',
  'controllers',
  'models',
  'middlewares',
  'routes/api/v1',
  'seeders',
  'tests',
  'utils',
];

// Create all folders
folders.forEach(folder => createFolder(path.join(baseDir, folder)));

// --------------------
// Create sample files with boilerplate content

// 1. config/database.js - Sequelize setup
const configDatabase = `const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
`;

createFile(path.join(baseDir, 'config/database.js'), configDatabase);

// 2. config/index.js - central config loader
const configIndex = `require('dotenv').config();
const sequelize = require('./database');

module.exports = {
  sequelize,
};
`;

createFile(path.join(baseDir, 'config/index.js'), configIndex);

// 3. models/index.js - load models and sync
const modelsIndex = `const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const User = require('./User')(sequelize, DataTypes);
// Add other models here...

const syncDB = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = {
  User,
  syncDB,
};
`;

createFile(path.join(baseDir, 'models/index.js'), modelsIndex);

// 4. models/User.js - sample user model
const userModel = `module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'owner' },
  });

  return User;
};
`;

createFile(path.join(baseDir, 'models/User.js'), userModel);

// 5. middlewares/auth.js - JWT auth middleware
const authMiddleware = `const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized, token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
`;

createFile(path.join(baseDir, 'middlewares/auth.js'), authMiddleware);

// 6. controllers/api/v1/authController.js - basic auth controller
createFolder(path.join(baseDir, 'controllers/api/v1'));

const authController = `'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../../../models');

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, role });
    return res.status(201).json({ message: 'User registered', userId: user.id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
`;

createFile(path.join(baseDir, 'controllers/api/v1/authController.js'), authController);

// 7. routes/api/v1/auth.js - auth routes
const authRoutes = `const express = require('express');
const router = express.Router();

const authController = require('../../../controllers/api/v1/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
`;

createFile(path.join(baseDir, 'routes/api/v1/auth.js'), authRoutes);

// 8. routes/api/v1/index.js - api v1 router aggregator
const apiV1Index = `const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');

router.use('/auth', authRoutes);

// Add other routes below

module.exports = router;
`;

createFile(path.join(baseDir, 'routes/api/v1/index.js'), apiV1Index);

// 9. routes/index.js - main router entry
const routesIndex = `const express = require('express');
const router = express.Router();

const apiV1Routes = require('./api/v1');

router.use('/api/v1', apiV1Routes);

module.exports = router;
`;

createFile(path.join(baseDir, 'routes/index.js'), routesIndex);

// 10. seeders/seed.js - sample seed script
const seedScript = `const { User, syncDB } = require('../models');

async function seed() {
  await syncDB();
  const exists = await User.findOne({ where: { email: 'owner@example.com' } });
  if (!exists) {
    await User.create({ email: 'owner@example.com', password: 'password123', role: 'owner' });
    console.log('Seeded owner user');
  }
  process.exit(0);
}

seed();
`;

createFile(path.join(baseDir, 'seeders/seed.js'), seedScript);

// 11. app.js - main app entry
const appJs = `'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
`;

createFile(path.join(baseDir, 'app.js'), appJs);

// 12. .env.example file
const envExample = `DB_NAME=your_db_name
DB_USER=root
DB_PASS=
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
PORT=3000
`;

createFile(path.join(baseDir, '.env.example'), envExample);

// 13. package.json - basic with dependencies
const packageJson = `{
  "name": "business-management-backend",
  "version": "1.0.0",
  "description": "Business management backend with Codeial style folder structure",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "seed": "node seeders/seed.js",
    "test": "echo \\"No tests yet\\""
  },
  "dependencies": {
    "bcrypt": "^5.1.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mysql2": "^3.2.0",
    "sequelize": "^6.31.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
`;

createFile(path.join(baseDir, 'package.json'), packageJson);

console.log('\n✅ Project structure and boilerplate created. Run "npm install" and start coding!');
