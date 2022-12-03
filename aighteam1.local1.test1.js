const request = require("supertest");

// const app = require("./app");
const aighteam1Local1Service = require("./aighteam1.local1.service");

describe("aigteam1 local-1 testings suite", () => {
  test("GET /", (done) => {
    request(app)
      .get("/testRoute1")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});


