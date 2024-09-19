const { User } = require("../../../models/user");
const jwt = require("jsonwebtoken");

describe("user.generateAuthToken", () => {
  it("should return a valid JWT", () => {
    const user = new User({ _id: 1, isAdmin: true });
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded).toMatchObject({ _id: 1, isAdmin: true });
  });
});
