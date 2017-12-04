const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/pointless-button-api-test');

const User = require('../models/User.js');
const server = 'http://localhost:3000';

const chai = require('chai');
const expect = chai.expect;
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const users = [];

describe('[POST] /api/account/register', () => {
    beforeEach((done) => {
        User.remove({}, (err) => {
            if (err) console.log(err);
            done();
        });
    });

    describe('Cannot register without proper values', () => {
        it('should fail without values', (done) => {
            chai.request(server)
            .post('/api/account/register')
            .end((err, res) => {
                if (err) {
                    if (err.status !== 422) console.log(err);
                }
                expect(res.status).to.equal(422);
                expect(res.body).to.not.have.own.property('_id');
                done();
            });
        });
        it('should fail with empty values', (done) => {
            chai.request(server)
            .post('/api/account/register')
            .field('email', '')
            .field('username', '')
            .field('password', '')
            .field('confirmPassword', '')
            .end((err, res) => {
                if (err) {
                    if (err.status !== 422) console.log(err);
                }
                expect(res.status).to.equal(422);
                expect(res.body).to.not.have.own.property('_id');
                done();
            });
        });

        it('should fail without an email', (done) => {
            chai.request(server)
            .post('/api/account/register')
            .field('email', '')
            .field('username', 'pooper')
            .field('password', 'pooperdooper')
            .field('confirmPassword', 'pooperdooper')
            .end((err, res) => {
                if (err) {
                    if (err.status !== 422) console.log(err);
                }
                expect(res.status).to.equal(422);
                expect(res.body).to.not.have.own.property('_id');
                done();
            });
        });

        it('should fail without a username', (done) => {
            chai.request(server)
            .post('/api/account/register')
            .field('email', 'pooper@dooper.com')
            .field('username', '')
            .field('password', 'pooperdooper')
            .field('confirmPassword', 'pooperdooper')
            .end((err, res) => {
                if (err) {
                    if (err.status !== 422) console.log(err);
                }
                expect(res.status).to.equal(422);
                expect(res.body).to.not.have.own.property('_id');
                done();
            });
        });

        it('should fail without a password', (done) => {
            chai.request(server)
            .post('/api/account/register')
            .field('email', 'pooper@dooper.com')
            .field('username', 'pooper')
            .field('password', '')
            .field('confirmPassword', '')
            .end((err, res) => {
                if (err) {
                    if (err.status !== 422) console.log(err);
                }
                expect(res.status).to.equal(422);
                expect(res.body).to.not.have.own.property('_id');
                done();
            });
        });
        it('should fail without a confirmPassword', (done) => {
            chai.request(server)
            .post('/api/account/register')
            .field('email', '')
            .field('username', 'pooper')
            .field('password', 'pooperdooper')
            .field('confirmPassword', '')
            .end((err, res) => {
                if (err) {
                    if (err.status !== 422) console.log(err);
                }
                expect(res.status).to.equal(422);
                expect(res.body).to.not.have.own.property('_id');
                done();
            });
        });
        it('should fail with an incorrect password check value.', (done) => {
            chai.request(server)
            .post('/api/account/register')
            .field('email', 'pooper@dooper.com')
            .field('username', 'pooper')
            .field('password', 'pooperdooper')
            .field('confirmPassword', '')
            .end((err, res) => {
                if (err) {
                    if (err.status !== 422) console.log(err);
                }
                expect(res.status).to.equal(422);
                expect(res.body).to.not.have.own.property('_id');
                done();
            });
        });
    });

    describe('Should register with proper values', () => {
        beforeEach((done) => {
            User.remove({}, (err) => {
                if (err) console.log(err);
                done();
            });
        });

        it('should return a valid user confirmation', (done) => {
            done();
        });
    });
});
