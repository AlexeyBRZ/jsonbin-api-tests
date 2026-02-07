import { jsonbinUrl } from "../config/constants";
import { JsonbinController } from "../controllers/jsonbin.controller";
import { JsonbinApiKey } from "../config/constants";
import { baseObject, emptyObject, hugeObject } from "../config/testData";

describe("Test jsonbin", () => {
  describe("tests of POST methods", () => {
    const jsonbin = new JsonbinController(jsonbinUrl, JsonbinApiKey);

    it.skip("set a simple object", async () => {
      const response = await jsonbin.createBin(baseObject);
      expect(response.body.metadata.id).toBeDefined();
      expect(response.status).toBe(200);
    });

    it("set a huge object", async () => {
      const response = await jsonbin.createHugeBin(hugeObject);
      expect(response.body.metadata.id).toBeDefined();
      expect(response.body.metadata.name).toBe("Huge Object");
      expect(response.status).toBe(200);
    });

    it("check 400 error with Post", async () => {
      try {
        await jsonbin.badRequestWithPost(baseObject);
        throw new Error("Custom Error");
      } catch (err: any) {
        expect(err.response?.status).toBe(400);
      }
    });

    it("check 401 code with Post", async () => {
      try {
        await jsonbin.anauthorizedWithPost(baseObject);
        throw new Error("Custom Error");
      } catch (err: any) {
        expect(err.status).toBe(401);
      }
    });
  });

    describe("tests of GET methods", () => {
    const jsonbin = new JsonbinController(jsonbinUrl, JsonbinApiKey);

    it('Get a huge object', async () => {
        const response = await jsonbin.getHugeObject('/69877104d0ea881f40a84e70');
        expect(response.status).toBe(200)
        expect(response.body.record.customer.address.zip).toEqual("29001")
    })

    
})
});
