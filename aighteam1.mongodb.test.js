const mongoose = require("mongoose");

const Doctor = require("./models/doctor");
const Info = require("./models/info");

describe("User Endpoints", () => {
  test("GET /posts", async () => {
    const post = await Doctor.create(
      {
        name: "jest title 1",
        department: "jest department 1",
        rating: 5,
        specialites: "jesting, testing",
        description: "nothing much",
      },
      (err, doctor) => {
        if (err) {
          throw err;
        }
        expect(doctor._id).toBe(post.id);
        expect(doctor.name).toBe(post.name);
        expect(doctor.description).toBe(post.description);
      }
    );
  });

  test("GET /posts", async () => {
    const post = await Info.create(
      {
        name: "jest info name",
        email: "jest info email",
        insuranceProvider: "jest info insurance",
        address: "jest info address",
        period: "jest info period",
        facing: "jest info facing",
      },
      (err, info) => {
        if (err) {
          throw err;
        }
        expect(info._id).toBe(post.id);
        expect(info.email).toBe(post.email);
        expect(info.address).toBe(post.address);
      }
    );
  });
});
