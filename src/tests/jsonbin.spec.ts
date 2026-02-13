import { collectionId, hugeObjectId, jsonbinUrl } from "../config/constants";
import { JsonbinController } from "../controllers/jsonbin.controller";
import { JsonbinApiKey } from "../config/constants";
import {
  baseObject,
  complObject,
  containsArrayObject,
  difDataTypesObject,
  hugeObject,
} from "../config/testData";

describe("Test jsonbin", () => {
  describe("tests of POST methods", () => {
    const jsonbin = new JsonbinController(jsonbinUrl, JsonbinApiKey);

    it("set a simple object", async () => {
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

    it("check 400 code if set a wrong collection", async () => {
      try {
        await jsonbin.createBinWithWrongCollection(complObject);
        throw new Error("Custom Error");
      } catch (err: any) {
        expect(err.status).toBe(400);
      }
    });
  });

  describe("tests of GET methods", () => {
    const jsonbin = new JsonbinController(jsonbinUrl, JsonbinApiKey);

    it("Get a huge object", async () => {
      const response = await jsonbin.getHugeObject("/69877104d0ea881f40a84e70");
      expect(response.status).toBe(200);
      expect(response.body.record.customer.address.zip).toEqual("29001");
    });

    it("Get a bad request with wrong binId", async () => {
      try {
        await jsonbin.getHugeObject("/wrongId");
        throw new Error("Custom Error");
      } catch (err: any) {
        expect(err.status).toBe(400);
      }
    });

    it("Get 401 code with wrong ApiKey", async () => {
      try {
        await jsonbin.getUnauthWithGet(hugeObjectId);
        throw new Error("Custom Error");
      } catch (err: any) {
        expect(err.status).toBe(401);
      }
    });

    it("Get list of bins of certain collection", async () => {
      const response =
        await jsonbin.getListOfBinsOfCertainCollection(collectionId);
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("Get latest bin", async () => {
      const response = await jsonbin.getLatestBin("69875e03ae596e708f1898d4");
      expect(response.status).toBe(200);
    });
  });

  describe("tests of PUT methods", () => {
    const jsonbin = new JsonbinController(jsonbinUrl, JsonbinApiKey);

    it("set object with different data", async () => {
      const response = await jsonbin.createSpecialDataBin(difDataTypesObject);
      expect(response.body.metadata.id).toBeDefined();
      expect(response.body.metadata.name).toBe("Special Bin");
      expect(response.status).toBe(200);
    });

    it("put new data to the Object", async () => {
      const response = await jsonbin.putDataToObject(
        baseObject,
        difDataTypesObject,
      );
      expect(response.body.record.stringValue).toBe("text");
    });

    it("receive Bad request with put", async () => {
      try {
        await jsonbin.putDataToWrongObject(baseObject, containsArrayObject);
        throw new Error("Custom Error");
      } catch (err: any) {
        expect(err.status).toBe(400);
      }
    });

    it("receive unauthorized with put", async () => {
      try {
        await jsonbin.putWithInvalidApiKey(baseObject, containsArrayObject);
        throw new Error("Custom Error");
      } catch (err: any) {
        expect(err.status).toBe(401);
      }
    });

    it("receive bad request with Put if content-type not set", async () => {
      try {
        await jsonbin.putWithoutContentType(baseObject, containsArrayObject);
        throw new Error("Custom Error");
      } catch (err: any) {
        expect(err.status).toBe(400);
      }
    });
  });

  describe("tests of Del methods", () => {
    const jsonbin = new JsonbinController(jsonbinUrl, JsonbinApiKey);

    it("delete created Object", async () => {
      const response = await jsonbin.deleteObject(containsArrayObject);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Bin deleted successfully");
    });

    it("receive bad request with del due to wron bin", async () => {
      try {
        await jsonbin.deleteObjectThatNotExists(baseObject);
        throw new Error("Custom Error");
      } catch (err: any) {
        expect(err.status).toBe(400);
      }
    });

    it("receive unathorized with del", async () => {
      try {
        await jsonbin.deleteWithWrongApiKey(baseObject);
        throw new Error("Custom Error");
      } catch (err: any) {
        expect(err.response?.status).toBe(401);
      }
    });

    it("receive unathorized with del if contentType not set", async () => {
      try {
        await jsonbin.deleteObjectWithWrongContentType(baseObject);
        throw new Error("Custom Error");
      } catch (err: any) {
        expect(err.response?.status).toBe(401);
      }
    });

    it("delete bin from collection", async () => {
      const response =
        await jsonbin.deleteObjectFromCollection(containsArrayObject);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Bin deleted successfully");
    });
  });
});
