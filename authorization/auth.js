import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admins from "../../../models/admins.js";
import CustomerPermissions from "../../../models/customer-permissions.js";
import Permissions from "../../../models/permissions.js";
import Customers from "../../../models/customers.js";

const saltRounds = 10;
const JWT_SECRET = "e-com-admin";
const JWT_SECRET_CUSTOMER = "e-com-costumer";
// This function takes a password and returns a promise that resolves with the hashed password.
export async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

// This function takes a password and a hashed password and returns a promise that resolves with a boolean indicating whether the password matches the hashed password.
export async function checkPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// This function takes a user object and returns a JWT token.
export function generateToken(user) {
  const { id, email } = user;
  return jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "24h" });
}

// This function takes a user object and returns a JWT token.
export function generateCustomerToken(user) {
  const { id, email } = user;
  return jwt.sign({ id, email }, JWT_SECRET_CUSTOMER, { expiresIn: "24h" });
}

// This function takes a token and returns the decoded payload.
export async function verifyToken(token) {
  try {
    const { id, email } = jwt.verify(token, JWT_SECRET);
    const user = await Admins.findOne({
      where: {
        id: id,
        email: email,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
}

// This function takes a token and returns the decoded payload.
export async function verifyCustomerToken(token) {
  try {
    const { id, email } = jwt.verify(token, JWT_SECRET_CUSTOMER);
    const user = await Customers.findOne({
      where: {
        id: id,
        email: email,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
}
// This function takes a token and returns the decoded payload.
export async function checkPermission(req_user, permission_name) {
  try {
    const find_Permission = await Permissions.findOne({
      where: { name: permission_name },
    });
    const user = await req_user; // Assuming user is an object with an id property
    const user_id = user.id; // Access the id property of the resolved user object
    if (user_id == null) {
      return false;
    }
    if (find_Permission == null) {
      return false;
    }
    const customerPermission = await CustomerPermissions.findOne({
      where: {
        customer_id: user_id,
        permission_id: find_Permission.id,
      },
    });
    if (customerPermission === null) {
      return false;
    }
  } catch {
    console.log("Error in Check Permission");
    return false;
  }
  return true;
}
export default {
  hashPassword,
  checkPassword,
  generateToken,
  verifyToken,
  verifyCustomerToken,
  checkPermission,
};
