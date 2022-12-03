const request = require("supertest");
const app = require("./app");
const testApp = require("./testApp");

describe("User Endpoints", () => {
  it("intial checking of Landing page status", async () => {
    const res = await request(app).get("/");
    expect(res.status).toEqual(200);
    // expect(res.type).toEqual(expect.stringContaining("json"));
    // expect(res.body).toHaveProperty("users");
  });

  it("GET /user should show all doctors", async () => {
    const res = await request(testApp).get("/sendJson");
    expect(res.type).toEqual(expect.stringContaining("json"));
    // console.log(res);
    // expect(res.body).toHaveProperty("users");
  });

});

describe("Checking all Doctors database", () => {
  // it("checking if the labeled id was sent", async () => {
  //   let res = await request(testApp).get("/doctor/all");
  //   expect(res.body).toHaveProperty("firstDoctor")
  // })

  // it("checking one value of the property of one doctor", async () => {
  //   let res = await request(testApp).get("/doctor/all");
  //   expect(res.body.firstDoctor["_id"]).toBeDefined();
  // })
})
