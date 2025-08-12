const express = require('express');
const { PrismaClient } = require('@prisma/client');
const passport = require("../passport.config");

const router = express.Router();
const prisma = new PrismaClient();

router.post('/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id: bikeId } = req.params; // ✅ Correct destructuring and rename

  try {
    const {
      name,
      gender,
      dob,
      email,
      mobile,
      aadharcardnumber,
      drivinglicensenumber,
      fromDate,
      toDate,
    } = req.body;

    const userId = req.user.id;

    console.log("Received booking data:", {
      userId,
      bikeId,
      name,
      gender,
      dob,
      email,
      mobile,
      aadharcardnumber,
      drivinglicensenumber,
      fromDate,
      toDate,
    });

    const booking = await prisma.booking.create({
      data: {
        userId,
        bikeId: parseInt(bikeId), // ✅ Important: convert to integer
        name,
        gender,
        dob: new Date(dob),
        email,
        mobile,
        aadharcardnumber,
        drivinglicensenumber,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        confirmBooking: false,
      },
    });

    res.status(201).json({
      success: true,
      message: "Booking created",
      bookingId: booking.id,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create booking",
      details: error.message,
    });
  }
});

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const userId = req.user.id;

  try {
    const bookings = await prisma.booking.findMany({
  where: {
    userId,
    confirmBooking: true, // only include confirmed bookings
  },
  include: {
    bike: true, // include full bike info (name, image, etc.)
  },
  orderBy: {
    createdAt: 'desc',
  },
});

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      details: error.message,
    });
  }
});

module.exports = router;
