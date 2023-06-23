const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('../api/app');

const {
  VALID_USER_TO_LOGIN, 
  VALID_USER_RESPONSE_FROM_DB,
  INVALID_USER_TO_LOGIN,
  VALID_USER_AND_INVALID_PASSWORD,
  VALID_USER_TO_REGISTER,
  VALID_USER_REGISTER_RESPONSE,
  INVALID_EMAIL_USER_TO_REGISTER,
  INVALID_NAME_USER_TO_REGISTER,
  ALL_SELLERS,
  ALL_CUSTOMERS,
  ALL_ADMS,
  ALL_USERS_DIFFERENT_THAN_ADM,
} = require('./mocks/user.mock');

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse;

const USER_ROOT = '/user';
const LOGIN_ENDPOINT = '/user/login';
const REGISTER_ENDPOINT = '/user/register';

describe('Testing user routes', function () {
  describe('GET /:role', function () {
    it('Can get all customers', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .get(`${USER_ROOT}/customer`);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(ALL_CUSTOMERS);
    });

    it('Can get all sellers', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .get(`${USER_ROOT}/seller`);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(ALL_SELLERS);
    });

    it('Can get all administrators', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .get(`${USER_ROOT}/administrator`);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(ALL_ADMS);
    });
  });

  describe(`GET ${USER_ROOT}`, function () {
    it('Can get all users different than administrator', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .get(USER_ROOT);

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(ALL_USERS_DIFFERENT_THAN_ADM);
    });
  });

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
  
  describe(`POST ${REGISTER_ENDPOINT}`, function () {
    it('Can register a new user successfully', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post(REGISTER_ENDPOINT)
        .send(VALID_USER_TO_REGISTER);

      expect(chaiHttpResponse.body).to.include.keys(['id', 'token']);
      expect(chaiHttpResponse.body).not.to.include.keys(['password']);
      expect(chaiHttpResponse.body).to.deep.include(VALID_USER_REGISTER_RESPONSE);
      expect(chaiHttpResponse.status).to.be.equal(201);
    });

    it('Can\'t register a user with duplicated name', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post(REGISTER_ENDPOINT)
        .send(INVALID_NAME_USER_TO_REGISTER);

        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'User already exists' });
        expect(chaiHttpResponse.status).to.be.equal(409);
    });

    it('Can\'t register a user with duplicated email', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post(REGISTER_ENDPOINT)
        .send(INVALID_EMAIL_USER_TO_REGISTER);

        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'User already exists' });
        expect(chaiHttpResponse.status).to.be.equal(409);
    });
  });
});
