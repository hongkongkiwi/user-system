export const schemaAccountCreateBody = {
  $id: "accountCreateBody",
  type: "object",
  properties: {
    username: {
      anyOf: [
        { $ref: "prisma#/definitions/Account/properties/username" },
        { type: "null" }
      ]
    },
    pronoun: {
      anyOf: [
        { $ref: "prisma#/definitions/AccountHuman/properties/pronoun" },
        { type: "null" }
      ]
    },
    firstName: {
      anyOf: [
        { $ref: "prisma#/definitions/AccountHuman/properties/firstName" },
        { type: "null" }
      ]
    },
    middleName: {
      anyOf: [
        { $ref: "prisma#/definitions/AccountHuman/properties/middleName"},
        { type: "null" }
      ]
    },
    lastName: {
      anyOf: [
        { $ref: "prisma#/definitions/AccountHuman/properties/lastName" },
        { type: "null" }
      ]
    },
    preferredName: {
      anyOf: [
        { $ref: "prisma#/definitions/AccountHuman/properties/preferredName" },
        { type: "null" }
      ]
    },
    dateOfBirth: {
      anyOf: [
        { $ref: "prisma#/definitions/AccountHuman/properties/dateOfBirth" },
        { type: "null" }
      ]
    }
  }
}