const requestWithSupertest = require("supertest");
const jest = require("jest");

import router, { route } from "./routes/index";
import app from "./app";

describe('User Endpoints', () => {
    it('GET /user/:id should show a user', async () => {
        const res = await requestWithSupertest.get('/users/3')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('user3')
    });

  });

  describe("when the username and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {username: "username"},
        {password: "password"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

  describe("GET /doctor/all should show all doctors", () => {
    test("should respond with a status code of 400", async () => {
        const res = await requestWithSupertest.get('/doctor/all');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('doctors')
    })
  })
