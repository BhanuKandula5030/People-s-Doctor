const request = require("supertest");

const app = require("./app");
const aighteam1Mongodb1Service = require("./aighteam1.mongodb1.service");
let aighteam1_mongodb1_service = new aighteam1Mongodb1Service();
// describe("aighteam mongodb-1 testings suite", () => {
//   test("Getting all doctors from the mongodb", async (done) => {
//     expect(aighteam1_mongodb1_service.get_all_doctors())
//       .toHaveReturned()
//       .end((err, res) => {
//         if (err) return done(err);

//         return done();
//       });
//   });
// });

