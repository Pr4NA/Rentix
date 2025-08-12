// auth.routes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const prisma = require("../DB/db.config");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    // console.log("Rana") ;
    const { credential } = req.body;

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { googleId: sub },
    });

    if (!user) {
      // Create user if not exists
      user = await prisma.user.create({
        data: {
          googleId: sub,
          email,
          username: name,
          picture,
        },
      });
    }

    // Create JWT (Passport will verify this later)
    const token = jwt.sign(
        { sub: user.googleId },
        "rana",
        { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

module.exports = router;
