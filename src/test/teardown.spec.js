import server from './setup.spec';

after((done) => {
    console.log('Shutting down server...')
    server.close(done);
})