import jwt from "jsonwebtoken";

const generatedAccessToken = async (userId) => {
  const token = await jwt.sign({ id: userId }, 
    process.env.JWT_SECRET_ACCESS_TOKEN, {
    expiresIn: "5h",
  });
  return token;
};

export default generatedAccessToken;
