const chaiHttp = require('chai-http');
const sinon = require('sinon');
const chai = require('chai');
const app = require('../api/app');

const {
  VALID_USER_TO_LOGIN, 
  VALID_USER_RESPONSE_FROM_DB,
} = require('./mocks/user.mock');

chai.use(chaiHttp);

const { expect } = chai;
const sandbox = sinon.createSandbox();
let chaiHttpResponse;

const LOGIN_ENDPOINT = '/user/login';

describe('Testing user routes', function () {
  afterEach(function () {
    sandbox.restore();
  });

  describe(`POST ${LOGIN_ENDPOINT}`, function () {
    it('Can login successfully', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post(LOGIN_ENDPOINT)
        .send(VALID_USER_TO_LOGIN);

      delete chaiHttpResponse.body.token;

      expect(chaiHttpResponse.body).to.be.deep.equal(VALID_USER_RESPONSE_FROM_DB);
    });
  });
  
  describe('POST /register', function () {
    
  });

  describe('GET /:role', function () {
    
  });

  describe('GET /', function () {
    
  });
});
