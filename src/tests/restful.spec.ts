import { initialUrl } from "../config/constants";
import { RestfulController } from "../controllers/restful.controller";
import superagent from "superagent";

describe("Test restful", () => {
  describe("Categories", () => {
    const restful = new RestfulController(initialUrl);

    it("test of single object", async () => {
      const response = await restful.getSingleObject();
      const expectedObject = {
        id: "7",
        name: "Apple MacBook Pro 16",
        data: {
          year: 2019,
          price: 1849.99,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 TB",
        },
      };
      expect(response.body).toEqual(expectedObject);
    });

    it("test list of all items", async () => {
      const response = await restful.getListOfAllItems();
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(13);
    });

    it("test list of items by Ids", async () => {
      const response = await restful.getListOfItemsByIds();
      expect(response.status).toEqual(200);
    });

    it("get single object", async () => {
      const response = await restful.getSingleObject();
      expect(typeof response.body).toBe("object");
      expect(response.body.data.year).toEqual(2019);
      expect(response.body.name).toEqual("Apple MacBook Pro 16");
    });

    it("test of adding single object", async () => {
      const response = await restful.addSingleObject();
      expect(typeof response.body).toBe("object");
      expect(response.body.data.year).toEqual(2019);
      expect(response.status).toEqual(200);
    });

    it("test of Put request", async () => {
      const response = await restful.putNewDataToTheObject();
      expect(response.status).toEqual(200);
      expect(response.body.data.year).toEqual(2020);
    });

    it("test of patch", async () => {
      const response = await restful.patchToObject();
      expect(response.body.name).toEqual("Apple MacBook Pro 16 (Updated Name)");
    });

    it("test of object delete", async () => {
      const { dedeletedObject: response, id } = await restful.deleteObject();
      expect(response.body.message).toEqual(
        `Object with id = ${id} has been deleted.`,
      );
    });
  });
});
