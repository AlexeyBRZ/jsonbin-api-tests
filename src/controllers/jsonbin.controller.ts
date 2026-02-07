import superagent from "superagent";
import { baseObject } from "../config/testData";

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
    .set("X-Master-Key", this.apiKey)
        return {
      body: res.body,
      status: res.status,
    };
  }
}

