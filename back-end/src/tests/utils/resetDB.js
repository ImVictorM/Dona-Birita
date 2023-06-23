const util = require('util');
const exec = util.promisify(require('child_process').exec);

const DB_CREATE = 'npx sequelize-cli db:drop && npx sequelize-cli db:create';
const DB_MIGRATE = 'npx sequelize-cli db:migrate';
const DB_SEED = 'npx sequelize-cli db:seed:all';

const RESET_DB_SCRIPT = `NODE_ENV=test ${DB_CREATE} && ${DB_MIGRATE} && ${DB_SEED}`;
const DB_RESET_TIMEOUT = 10000;

async function resetRace() {
  const resetPromise = exec(RESET_DB_SCRIPT).then(({ stdout }) => {
    console.log(`Database reset: ${stdout}`);
  }).catch((error) => {
    console.error(`Error resetting database: ${error}`);
    throw error;
  });

  const timeoutToResetDB = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      reject(new Error('Database reset timed out.'));
    }, DB_RESET_TIMEOUT);
  });

  await Promise.race([resetPromise, timeoutToResetDB]);
}

async function resetDB() {
  this.timeout(DB_RESET_TIMEOUT);

  try {
    await resetRace();
  } catch (error) {
    console.error(`Error in before hook: ${error}`);
    throw error;
  }
}

module.exports = {
  resetDB,
};
