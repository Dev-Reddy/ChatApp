import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // Prevent XSS attacks
    sameSite: "none", // Required for cross-site cookies
    secure: true, // Must be true for SameSite: "none"
    domain: ".vercel.app", // Allow cookies across subdomains
  });

  return token;
};
