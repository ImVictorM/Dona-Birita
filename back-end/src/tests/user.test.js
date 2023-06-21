const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../api/app');

const {
  VALID_USER_TO_LOGIN, 
  VALID_USER_RESPONSE_FROM_DB,
  INVALID_USER_TO_LOGIN,
  VALID_USER_AND_INVALID_PASSWORD,
} = require('./mocks/user.mock');

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse;

const LOGIN_ENDPOINT = '/user/login';

describe('Testing user routes', function () {
  describe(`POST ${LOGIN_ENDPOINT}`, function () {
    it('Can login successfully', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post(LOGIN_ENDPOINT)
        .send(VALID_USER_TO_LOGIN);

      delete chaiHttpResponse.body.token;

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(VALID_USER_RESPONSE_FROM_DB);
    });

    it('Can\'t login with a not registered user', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post(LOGIN_ENDPOINT)
        .send(INVALID_USER_TO_LOGIN);
      
      expect(chaiHttpResponse.status).to.be.equal(404);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'User not Found' });
    });

    it('Can\'t login with a wrong password', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post(LOGIN_ENDPOINT)
        .send(VALID_USER_AND_INVALID_PASSWORD);
      
      expect(chaiHttpResponse.status).to.be.equal(400);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid User' });
    });
  });
  
  describe('POST /register', function () {
    
  });

  describe('GET /:role', function () {
    
  });

  describe('GET /', function () {
    
  });
});
