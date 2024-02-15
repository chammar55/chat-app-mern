import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, resp) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  resp.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //Milliseconds  For how long token will stay in cookie
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development", // secure false if we are testing it in our local host
  });
};

export default generateTokenAndSetCookie;
