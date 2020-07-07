import * as serverDetails from '../index';
const { server } = serverDetails;

before((done) => {  
    console.log('Server running...');
    done();
})

export default server;