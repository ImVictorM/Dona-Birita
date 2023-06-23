const chaiHttp = require('chai-http');
const chai = require('chai');

const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse;

const { ALL_PRODUCTS } = require('./mocks/product.mock');

const PRODUCT_ROOT = '/product';

describe('Testing product routes', function () {
  describe(`GET ${PRODUCT_ROOT}`, function () {
    it('Can get all products successfully', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .get(PRODUCT_ROOT);

      expect(chaiHttpResponse.body).to.be.deep.equal(ALL_PRODUCTS);
      expect(chaiHttpResponse.status).to.be.eq(200);
    });
  });
});
