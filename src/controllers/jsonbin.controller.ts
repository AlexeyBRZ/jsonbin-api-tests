import superagent from "superagent";

export class JsonbinController {
  private baseUrl: string;
  private apiKey: string;

  constructor(baselUrl: string, apiKey: string) {
    this.baseUrl = baselUrl;
    this.apiKey = apiKey;
  }

  async createBin(data: object) {
    const res = await superagent
      .post(`${this.baseUrl}/b`)
      .set("Content-Type", "application/json")
      .set("X-Master-Key", this.apiKey)
      .send(data);
    return {
      body: res.body,
      status: res.status,
    };
  }

  async createHugeBin(data: object) {
    const res = await superagent
      .post(`${this.baseUrl}/b`)
      .set("Content-Type", "application/json")
      .set("X-Master-Key", this.apiKey)
      .set("X-Bin-Name", "Huge Object")
      // .set("X-Collection-Id", "69876c87d0ea881f40a847b7")
      .send(data);
    return {
      body: res.body,
      status: res.status,
    };
  }

  async createEmptyBin(data: object) {
    const res = await superagent
      .post(`${this.baseUrl}/b`)
      .set("Content-Type", "application/json")
      .set("X-Master-Key", this.apiKey)
      .set("X-Bin-Name", "Empty Object")
      // .set("X-Collection-Id", "69876c87d0ea881f40a847b7")
      .send(data);
    return {
      body: res.body,
      status: res.status,
    };
  }

  async createSpecialDataBin(data: object) {
    const res = await superagent
      .post(`${this.baseUrl}/b`)
      .set("Content-Type", "application/json")
      .set("X-Master-Key", this.apiKey)
      .set("X-Bin-Name", "Special Bin")
      // .set("X-Collection-Id", "69876c87d0ea881f40a847b7")
      .send(data);
    return {
      body: res.body,
      status: res.status,
    };
  }

  async badRequestWithPost(data: object) {
    const res = await superagent
      .post(`${this.baseUrl}/b`)
      .set("X-Master-Key", this.apiKey)
      .send();
    return {
      status: res.status,
    };
  }

  async anauthorizedWithPost(data: object) {
    const res = await superagent
      .post(`${this.baseUrl}/b`)
      .set("Content-Type", "application/json")
      .set("X-Master-Key", "ApiKey")
      .set("X-Collaction-Id", "test")
      .send(data);
    return {
      status: res.status,
    };
  }

  async getHugeObject(binId: string) {
    const res = await superagent
      .get(`${this.baseUrl}/b` + binId)
      .set("X-Master-Key", this.apiKey);
    return {
      body: res.body,
      status: res.status,
    };
  }

  async getUnauthWithGet(binId: string) {
    const res = await superagent
      .get(`${this.baseUrl}/b` + binId)
      .set("X-Master-Key", "ApiKey");
    return {
      body: res.body,
      status: res.status,
    };
  }

  async getListOfBinsOfCertainCollection(collectionId: String) {
    const res = await superagent
      .get(`${this.baseUrl}/c/${collectionId}/bins`)
      .set("X-Master-Key", this.apiKey);
    return {
      body: res.body,
      status: res.status,
    };
  }

  async getLatestBin(binId: string) {
    const res = await superagent
      .get(`${this.baseUrl}/b/${binId}/latest`)
      .set("X-Master-Key", this.apiKey);
    return {
      body: res.body,
      status: res.status,
    };
  }

  async putDataToObject(
    binThatShouldBeUpdatedId: object,
    newBinObject: object,
  ) {
    const res1 = await superagent
      .post(`${this.baseUrl}/b`)
      .set("Content-Type", "application/json")
      .set("X-Master-Key", this.apiKey)
      .set("X-Bin-Name", "Special Object")
      .send(binThatShouldBeUpdatedId);
    const id = res1.body.metadata.id;
    const res = await superagent
      .put(`${this.baseUrl}/b/${id}`)
      .set("Content-Type", "application/json")
      .set("X-Master-Key", this.apiKey)
      .send(newBinObject);
    return {
      body: res.body,
      status: res.status,
    };
  }

  async deleteObject(data: object) {
    const res1 = await superagent
      .post(`${this.baseUrl}/b`)
      .set("Content-Type", "application/json")
      .set("X-Master-Key", this.apiKey)
      .set("X-Bin-Name", "Object to delete")
      .send(data);
    const id = res1.body.metadata.id;
    const res = await superagent
      .delete(`${this.baseUrl}/b/${id}`)
      .set("Content-Type", "application/json")
      .set("X-Master-Key", this.apiKey)
    return {
      body: res.body,
      status: res.status,
    };
  }
}
