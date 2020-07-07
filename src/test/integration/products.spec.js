import request from 'request-promise-native';
import chai from 'chai';

const PORT = process.env.PORT;

describe('Integration Test For Products Route', () => {
    it('Fetch all products returns the correct number of products', async () => {
        try {
            const expectedTotalProducts = 4;      
            return request({
                        method: 'GET',
                        uri: `http://localhost:${PORT}/api/v1/products/`,
                        json: true
                    })
                    .then(response => {
                        const { status, message, data } = response;

                        chai.expect(status).to.equal('Success');
                        chai.expect(message).to.equal('Successfully fetched all Products');
                        chai.expect(data.length).to.equal(expectedTotalProducts);
                    })
        }catch(e) {
            console.log('An error occurred: ', e);
        }

    })
});
