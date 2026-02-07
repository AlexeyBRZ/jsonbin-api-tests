import superagent from "superagent";

const testObject: Object = {
  id: 6,
  name: "Apple MacBook Pro 16",
  data: {
    year: 2019,
    price: 2049.99,
    "CPU model": "Intel Core i9",
    "Hard disk size": "1 TB",
    color: "silver",
  },
};

const newTestObject: Object = {
  id: "7",
  name: "Apple MacBook Pro 16",
  data: {
    year: 2020,
    price: 1849.99,
    "CPU model": "Intel Core i9",
    "Hard disk size": "1 TB",
  },
};
export class RestfulController {
  private objectsUrl: string;

  constructor(initialUrl: string) {
    this.objectsUrl = initialUrl + "/objects";
  }

  async getListOfAllItems() {
    const url = this.objectsUrl;
    return superagent.get(url);
  }

  async getListOfItemsByIds() {
    const url = this.objectsUrl + "/?id=4&id=7&id=10";
    return superagent.get(url);
  }

  async getSingleObject() {
    const url = this.objectsUrl + "/7";
    return superagent.get(url);
  }

  async addSingleObject() {
    const url = this.objectsUrl;
    return superagent.post(url).send(testObject);
  }

  async putNewDataToTheObject() {
    const url = this.objectsUrl;
    const newObjectByPost = await superagent.post(url).send(testObject);
    const id = newObjectByPost.body.id;
    const updatedObject = await superagent
      .put(`${url}/${id}`)
      .send(newTestObject);
    return updatedObject;
  }

  async patchToObject() {
    const url = this.objectsUrl;
    const obJectTobePatchet = await superagent.post(url).send(newTestObject);
    const id = obJectTobePatchet.body.id;
    const patchedObject = await superagent
      .patch(`${url}/${id}`)
      .send({ name: "Apple MacBook Pro 16 (Updated Name)" });
    return patchedObject;
  }

  async deleteObject() {
    const url = this.objectsUrl;
    const objectToBeDeleted = await superagent.post(url).send(testObject);
    const id = objectToBeDeleted.body.id;
    const dedeletedObject = await superagent.del(`${url}/${id}`);
    return { dedeletedObject, id };
  }
}
