const util = require('util');
const exec = util.promisify(require('child_process').exec);

const DUMP_OUTPUT = '/dev/null 2>&1';
const ENVIRONMENT = 'NODE_ENV=test';

const DB_DROP = `${ENVIRONMENT} npx sequelize-cli db:drop > ${DUMP_OUTPUT}`;
const DB_CREATE = `${ENVIRONMENT} npx sequelize-cli db:create > ${DUMP_OUTPUT}`;
const DB_MIGRATE = `${ENVIRONMENT} npx sequelize-cli db:migrate > ${DUMP_OUTPUT}`;
const DB_SEED = `${ENVIRONMENT} npx sequelize-cli db:seed:all > ${DUMP_OUTPUT}`;

const RESET_DB_SCRIPT = `${DB_DROP} && ${DB_CREATE} && ${DB_MIGRATE} && ${DB_SEED}`;
const DB_RESET_TIMEOUT = 10000;

async function resetRace() {
  const resetPromise = exec(RESET_DB_SCRIPT).catch((error) => {
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
