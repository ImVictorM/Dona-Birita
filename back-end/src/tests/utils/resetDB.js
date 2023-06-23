const util = require('util');
const { sequelize } = require('../../database/models');
const exec = util.promisify(require('child_process').exec);

async function resetDBData() {
  try {
    const modelNames = Object.keys(sequelize.models);

    await Promise.all(modelNames.map(async (modelName) => {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      const Model = sequelize.models[modelName];
      await Model.destroy({ truncate: { cascade: true } });
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }));
  } catch (error) {
    console.error(`Error resetting database: ${error}`);
    throw error;
  }
}

async function seedDB() {
  const ENVIRONMENT = 'NODE_ENV=test';
  const DB_SEED = `${ENVIRONMENT} npx sequelize-cli db:seed:all`;
  await exec(DB_SEED).catch((error) => {
    console.error(`Error resetting database: ${error}`);
    throw error;
  });
}

async function resetDB() {
  const MAX_DB_RESET_TIME = 10000;
  this.timeout(MAX_DB_RESET_TIME);

  try {
    await resetDBData();
    await seedDB();
  } catch (error) {
    console.error(`Error reseting the database: ${error}`);
    throw error;
  }
}

module.exports = {
  resetDB,
};
