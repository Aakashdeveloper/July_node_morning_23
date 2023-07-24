let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

describe('Testing using api', () => { 
    it('Should return 200 for users',(done) => {
        chai.request('http://127.0.0.1:7710')
        .get('/users')
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
        .catch((err) => {
            throw er
        })
    })
 })