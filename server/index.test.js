var api = require('./index.js');
var request = require('supertest');

describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./index');
  });

  it('responds to / with the index file', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/some/random/page')
      .expect(404, done);
  });
});

