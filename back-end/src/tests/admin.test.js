const chaiHttp = require('chai-http');
const chai = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const app = require('../api/app');
const { resetDB } = require('./utils/resetDB');

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse;

const ADMIN_ROOT = '/admin';
const ADMIN_REGISTER_ENDPOINT = `${ADMIN_ROOT}/user/register`;

const { 
  USER_TO_REGISTER, 
  REGISTERED_USER_RESPONSE, 
} = require('./mocks/admin.mock');

describe('Testing admin routes', function () {
  after(resetDB);

  afterEach(function () {
    sinon.restore();
  });

  describe('POST /admin/user/register', function () {
    it('Can\'t register without adm authorization', async function () {
      sinon.stub(jwt, 'verify').returns({
        dataValues: { role: 'customer' },
      });

      chaiHttpResponse = await chai
        .request(app)
        .post(ADMIN_REGISTER_ENDPOINT)
        .send(USER_TO_REGISTER);

      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Forbidden' });
      expect(chaiHttpResponse.status).to.be.equal(403);
    });

    it('Can register users with adm authorization', async function () {
      sinon.stub(jwt, 'verify').returns({
        dataValues: { role: 'administrator' },
      });

      chaiHttpResponse = await chai
        .request(app)
        .post(ADMIN_REGISTER_ENDPOINT)
        .send(USER_TO_REGISTER);

      expect(chaiHttpResponse.body).to.contain.keys(['token', 'id']);
      expect(chaiHttpResponse.body).not.to.contain.keys(['password']);
      expect(chaiHttpResponse.body).to.deep.include(REGISTERED_USER_RESPONSE);
      expect(chaiHttpResponse.status).to.be.equal(201);
    });
  });

  describe('DELETE /admin/user/:id', function () {
    it('Can remove an existing user', async function () {
      sinon.stub(jwt, 'verify').returns({
        dataValues: { role: 'administrator' },
      });

      chaiHttpResponse = await chai
        .request(app)
        .delete('/admin/user/3');

      expect(chaiHttpResponse.status).to.be.equal(204);
      expect(chaiHttpResponse.body).to.be.deep.equal({});
    });
  });
});
