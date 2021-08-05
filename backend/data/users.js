import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("aalole123", 10),
    isAdmin: true,
  },
  {
    name: "Wumi",
    email: "wumi@example.com",
    password: bcrypt.hashSync("aalole123", 10),
  },
  {
    name: "Shaw",
    email: "shaw@example.com",
    password: bcrypt.hashSync("aalole123", 10),
  },
  {
    name: "Linkon",
    email: "linkon@example.com",
    password: bcrypt.hashSync("aalole123", 10),
  },
];

export default users;
