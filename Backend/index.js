/* eslint-disable no-undef */
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const crypto = require("crypto"); // Required for signature validation
const logInRouter = require("./routes/log-in");
const signUpRouter = require("./routes/sign-up");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./DB/db.config");
// const { verifyToken } = require("./routes/auth");
const bookingRoutes = require("./routes/booking");
const allBikeRouter = require("./routes/allBikes") ;
const passport = require('./passport.config');
const availableBikesRouter = require("./routes/availableBikeRouter") ;
const authRouter = require("./routes/auth") ;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "rana",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400000 },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order (JWT Protected)
app.post("/order", passport.authenticate("jwt", { session: false }), async (req, res) => {
    if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { amount, currency, receipt } = req.body;
    console.log("Received payment request from user:", req.user.sub); // from JWT

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
});

// Validate Razorpay Signature (JWT Protected)
app.post("/order/validate", passport.authenticate("jwt", { session: false }), async (req, res) => {
    if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ error: "Invalid signature, verification failed" });
  }

  try {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { confirmBooking: true },
    });

    return res.status(200).json({ message: "Payment verified and booking confirmed" });
  } catch (err) {
    console.error("Error updating booking:", err);
    return res.status(500).json({ error: "Booking confirmation failed" });
  }
});

app.use("/login", logInRouter);
app.use("/signup", signUpRouter);
app.use("/booking", bookingRoutes);
app.use("/allBikes", allBikeRouter) ;
app.use("/auth", authRouter) ;
app.use("/availableBikes", availableBikesRouter) ;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
