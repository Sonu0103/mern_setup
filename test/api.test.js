// for sending request
const request = require("supertest");

// server main file (index.js)
const app = require("../index");

// testing token
const token = "";

// make test collections
describe("Api Test Collection", () => {
  // test case 1(/test)
  it("GET /test | Response text", async () => {
    // making api request to /test
    const response = await request(app).get("/test");

    // our response should have 200 status code
    expect(response.statusCode).toBe(200);

    // expect text
    expect(response.text).toEqual("Test Api is working...!");
  });
  // get allproduct
  it("GET Products | Fetch all products ", async () => {
    const response = await request(app).get("/api/product/get_all_products");
    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.message).toEqual("Products fetched successfully");
  });
  //Register api (post)
  it("Post /api/user/create | Response with message", async () => {
    const response = await request(app).post("/api/user/create").send({
      firstName: "john",
      lastName: "cena",
      email: "john@gmail.com",
      password: "123",
    });
    // if already exists
    if (!response.body.success) {
      expect(response.body.message).toEqual("User Already Exists!");
    } else {
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toEqual("user created sucessfully");
    }
  });
});
