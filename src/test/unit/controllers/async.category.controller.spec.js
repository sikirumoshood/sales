/* eslint-env mocha */
import rewire from 'rewire';
import sinon from 'sinon';
import chai from 'chai';

import db from '../../../app/utils/database';
import Categories from '../../../app/controllers/category.controller';
import CategoryValidationService from '../../../app/services/category.validation.service.controller';
import CategoryService from '../../../app/services/category.service';
import * as responseUtils from '../../../app/utils/responses';

// // Import server
// import * as serverDetails from '../../../index';

const categoryModule = rewire('../../../app/controllers/async.category.controller');

let sandbox;

describe('Unit Test for category controller', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });


    it('validateCategoryRequest method should fail because body is empty', () => {
        const req = {
            body: {} // Simulate error
        };
        const validateCategoryRequest = categoryModule.__get__('validateCategoryRequest');
        validateCategoryRequest(req, (error) => {
            chai.expect(error).to.not.equal(null);
        });
    });

    it('validateCategoryRequest method should fail because body does not contain name', () => {
        const req = {
            body: {
                price: 2000
            } // Simulate error
        };
        const validateCategoryRequest = categoryModule.__get__('validateCategoryRequest');
        validateCategoryRequest(req, (error) => {
            const expectedError = {
                "name": "\"name\" is required",
                "price": "\"price\" is not allowed"
            }

            chai.expect(error).to.not.equal(null);
            chai.expect(error).to.be.a('object');
            chai.expect(error).to.eql(expectedError);

        });
    });

    it('validateCategoryRequest method should pass, conditions satisfied', () => {
        const req = {
            body: {
                name: 'Foot Wear'
            } // Simulate error
        };
        const validateCategoryRequest = categoryModule.__get__('validateCategoryRequest');
        validateCategoryRequest(req, (error, rbody) => {
            chai.expect(error).to.equal(null);
            chai.expect(rbody).to.eql(req.body);
        });
    });

    it('storeNewCategory method should fail, db error', (done) => {
        const body = {
                name: 'Foot Wear'
            };

        sandbox.stub(db, 'oneOrNone').returns(Promise.reject());

        const storeNewCategory = categoryModule.__get__('storeNewCategory');
        storeNewCategory(body, (error, res) => {
            try{
                chai.expect(error).to.equal('Unable to create a new category')
                done();
            }catch(e){
                console.log('Error handled');
                done(e);
            }
        });
    });

    it('storeNewCategory method should pass, conditions satisfied', (done) => {
        const body = {
                name: 'Foot Wear'
            };

        const category = {
            name: 'Foot Wear',
            id: 8,
            created_at: '2020-01-01',
            updated_at: '2020-01-01'
        }

        sandbox.stub(db, 'oneOrNone').returns(Promise.resolve(category));

        const storeNewCategory = categoryModule.__get__('storeNewCategory');
        storeNewCategory(body, (error, res) => {
            try{
                chai.expect(error).to.equal(null);
                chai.expect(res).to.eql(category);
                done();

            }catch(e){
                console.log('Error handled');
                done(e);
            }
        });
    });

    it('Async / Await : storeNewCategory method should pass, conditions satisfied', async () => {
        try{
           const req = {
               body: {
                   name: 'Foot Wear'
               }
           }    

           const res = {

           };

           const category = {
                name: 'Foot Wear',
                id: 8,
                created_at: '2020-01-01',
                updated_at: '2020-01-01'
            }

           sandbox.stub(CategoryValidationService, 'validateNewCategory').returns(req.body);

           sandbox.stub(CategoryService, 'storeNewCategory').returns(Promise.resolve({
               success: true,
               data: category
           }));

           sandbox.stub(responseUtils, 'successResponse').returns('Category added successfully');

            return Categories.storeNewCategory(req, res)
                        .then((response) => {
                            chai.expect(response).to.equal('Category added successfully');
                        });

        }catch(e){
            
        }
    });

    it('Async / Await : storeNewCategory method should fail, db error', async () => {
        try{
           const req = {
               body: {
                   name: 'Foot Wear'
               }
           }    

           // Mock
           const res = {
                status(){
                    return this;
                },
                json(errorData){
                    return errorData
                }

           };

           sandbox.stub(CategoryValidationService, 'validateNewCategory').returns(req.body);

           sandbox.stub(CategoryService, 'storeNewCategory').returns(Promise.resolve({
               success: false,
               data: null
           }));

           return Categories.storeNewCategory(req, res).then(response => {
                chai.expect(response.status).to.equal('Error');
                chai.expect(response.message).to.equal('We are unable to add a new category at the moment, please try again!');  
           })

        }catch(e){
            
        }
    });
});
