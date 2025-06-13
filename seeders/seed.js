const { User, syncDB } = require('../models');

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
