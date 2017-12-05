const request = require('supertest');
const app = require('../../app');
const User = require('../models/user');

USERNAME = 'testtesttest123';
PASSWORD = 'P4s$W0rD4w350M3';
FULL_NAME = 'AWESOME NAME';


describe('User API', () => {
    beforeAll((done) => {
        User.remove({ username: USERNAME }, function(err) {
            if (err) throw err;
            done();
        });
    })
    test('should GET /api', function() {
        return request(app)
            .get('/api')
            .expect(200);
    });

    test('should NOT GET authenticated USER', () => {
        return request(app)
            .get('/api/user')
            .expect(401);
    });

    test('should CREATE USER', (done) => {
        request(app)
            .post('/api/register')
            .send({
                username: USERNAME,
                password: PASSWORD,
                full_name: FULL_NAME
            })
            .end(function(err, response) {
                expect(response.statusCode).toBe(200);
                expect(response.id).not.toBeNull;
                done();
            });
    });

    test('should AUTHENTICATE USER', (done) => {
        request(app)
            .post('/api/authenticate')
            .send({
                username: USERNAME,
                password: PASSWORD
            })
            .end(function(err, response) {
                expect(response.statusCode).toBe(200);
                expect(response.token).not.toBeNull;
                done();
            });

    });
});



describe('User UI', () => {
    test('should GET /login', function() {
        return request(app)
            .get('/login')
            .expect(200)
            .end(function(err, res) {
                expect(res.redirects.length).toBe(0);
                expect(res.type).toEqual('text/html');
                done();
            });
    });

    test('should GET /signup', () => {
        return request(app)
            .get('/signup')
            .expect(200)
            .end(function(err, res) {
                expect(res.redirects.length).toBe(0);
                expect(res.type).toEqual('text/html');
                done();
            });
    });

    test('should GET /landpage', (done) => {
        return request(app)
            .get('/landpage')
            .expect(200)
            .end(function(err, res) {
                expect(res.redirects.length).toBe(0);
                expect(res.type).toEqual('text/html');
                done();
            });
    });

    test('should GET /dashboard', (done) => {
        return request(app)
            .get('/login')
            .expect(200)
            .end(function(err, res) {
                expect(res.redirects.length).toBe(0);
                expect(res.type).toEqual('text/html');
                done();
            });

    });
});