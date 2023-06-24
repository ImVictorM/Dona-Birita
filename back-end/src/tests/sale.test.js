const chaiHttp = require('chai-http');
const chai = require('chai');

const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse;

const {
  ID_2_SALE,
  NEW_SALE_TO_REGISTER,
  RESPONSE_NEW_SALE_TO_REGISTER,
  ID_2_SELLER_AND_ID_3_CUSTOMER_SALE,
  NEW_STATUS,
} = require('./mocks/sale.mock');

const SALE_ROOT = '/sale';

describe('Testing sale routes', function () {
  describe(`GET ${SALE_ROOT}/:id`, function () {
    it('Can get a sale by - id: 2', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .get(`${SALE_ROOT}/2`);

      expect(chaiHttpResponse.body).to.deep.include(ID_2_SALE);
      expect(chaiHttpResponse.body).to.include.keys(['saleDate']);
      expect(Number.isNaN(Date(chaiHttpResponse.body.saleDate))).to.be.equal(false);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe(`GET ${SALE_ROOT}/:role/:id`, function () {
    it('Can get all sales for a seller - id: 2', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .get(`${SALE_ROOT}/seller/2`);

      expect(chaiHttpResponse.status).to.be.equal(200);

      for (let index = 0; index < chaiHttpResponse.body.length - 1; index += 1) {
        const element = chaiHttpResponse.body[index];
        expect(element).to.contain.keys(['saleDate']);
        expect(Number.isNaN(Date(element.saleDate))).to.be.equal(false);
        expect(element).to.deep.include(ID_2_SELLER_AND_ID_3_CUSTOMER_SALE[index]);
      }
    });

    it('Can get all sales for a customer - id: 3', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .get(`${SALE_ROOT}/customer/3`);

      expect(chaiHttpResponse.status).to.be.equal(200);

      for (let index = 0; index < chaiHttpResponse.body.length - 1; index += 1) {
        const element = chaiHttpResponse.body[index];
        expect(element).to.contain.keys(['saleDate']);
        expect(Number.isNaN(Date(element.saleDate))).to.be.equal(false);
        expect(element).to.deep.include(ID_2_SELLER_AND_ID_3_CUSTOMER_SALE[index]);
      }
    });

    it('Returns null when the user role is not valid', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .get(`${SALE_ROOT}/mechanic/3`);

      expect(chaiHttpResponse.status).to.be.eq(200);
      expect(chaiHttpResponse.body).to.be.eq(null);
    });
  });

  describe(`PATCH ${SALE_ROOT}/:id`, function () {
    it('Can update the status of a sale - id: 2', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .patch(`${SALE_ROOT}/2`)
        .send(NEW_STATUS);

      expect(chaiHttpResponse.status).to.be.equal(204);
      expect(chaiHttpResponse.body).to.be.deep.equal({});

      chaiHttpResponse = await chai
        .request(app)
        .get(`${SALE_ROOT}/2`);

      expect(chaiHttpResponse.body.status).to.be.equal(NEW_STATUS.status);
    });
  });

  describe(`POST ${SALE_ROOT}`, function () {
    it('Can register a new sale', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .post(SALE_ROOT)
        .send(NEW_SALE_TO_REGISTER);

      expect(chaiHttpResponse.body).to.contain.keys(['id']);
      expect(chaiHttpResponse.body).not.to.contain.keys(['products']);
      expect(chaiHttpResponse.body).to.deep.contain(RESPONSE_NEW_SALE_TO_REGISTER);
      expect(chaiHttpResponse.status).to.be.equal(201);
    });
  });
});
