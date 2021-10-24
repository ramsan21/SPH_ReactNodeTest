const request = require("supertest");

const { app, server } = require("./server");

describe("TEST server.js", () => {
  afterAll(async () => {
    server.close();
  });

  it("GET /items route , should return items", async () => {
    return request(app)
      .get("/api/items")
      .expect(200)
      .then((res: any) => {
        expect(res.body.length).toBeGreaterThanOrEqual(1);
      });
  });

  it("GET /item/:title , should return item where title exist", async () => {
    return request(app)
      .get(`/api/item/Dead letters`)
      .expect(200)
      .then((res: any) => {
        expect(res.body).toBeTruthy();
      });
  });

  it("GET /item/:title , should return item where title doesn't exist", async () => {
    return request(app)
      .get(`/api/item/404 not found`)
      .expect(200)
      .then((res: any) => {
        expect(res.body).toEqual({});
      });
  });
});
