const express = require('express');
const { PrismaClient } = require('@prisma/client');
const passport = require("../passport.config");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { fromDate, toDate } = req.query;

  try {
    const conflictingBookings = await prisma.booking.findMany({
      where: {
        confirmBooking: true,
        OR: [
          {
            fromDate: {
              lte: new Date(toDate),
            },
            toDate: {
              gte: new Date(fromDate),
            },
          },
        ],
      },
      select: {
        bikeId: true,
      },
    });

    const unavailableBikeIds = conflictingBookings.map(b => b.bikeId);

    const availableBikes = await prisma.bike.findMany({
      where: {
        id: {
          notIn: unavailableBikeIds,
        },
      },
    });

    res.json(availableBikes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching available bikes" });
  }
});

module.exports = router;
