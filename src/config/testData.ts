export const baseObject = {
  name: "Alex",
  age: 30,
  role: "QA Engineer",
  active: true,
};

export const complObject = {
  user: {
    id: 101,
    name: "Alex",
    contacts: {
      email: "alex@test.com",
      phone: "+34600111222",
    },
  },
  subscription: {
    plan: "premium",
    expires: "2026-12-31",
  },
};

export const containsArrayObject = {
  project: "API Framework",
  tags: ["api", "testing", "jsonbin", "automation"],
  contributors: [
    { name: "Alex", role: "QA" },
    { name: "John", role: "Dev" },
  ],
};

export const hugeObject = {
  orderId: "ORD-998877",
  customer: {
    name: "Alex",
    address: {
      country: "Spain",
      city: "Malaga",
      zip: "29001",
    },
  },
  items: [
    { id: 1, name: "Keyboard", price: 50 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Monitor", price: 300 },
  ],
  payment: {
    method: "card",
    status: "paid",
  },
  history: [
    { status: "created", date: "2026-01-01" },
    { status: "paid", date: "2026-01-02" },
  ],
};

export const difDataTypesObject = {
  stringValue: "text",
  numberValue: 12345,
  floatValue: 12.56,
  booleanValue: false,
  nullValue: null,
  arrayValue: [1, 2, 3],
  objectValue: {
    nestedKey: "nestedValue",
  },
};

export const forPatchObject = {
  user: {
    contacts: {
      phone: "+34600999999",
    },
  },
  subscription: {
    plan: "basic",
  },
};

export const forPutObject = {
  status: "archived",
  reason: "No longer needed",
  updatedBy: "automation-test",
};

export const emptyObject = {};

//export const invalidObject = { name: Alex, age: }
