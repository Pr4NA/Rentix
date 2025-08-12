const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

const passport = require("../passport.config") ;

// GET /allBikes
router.get('/', passport.authenticate("jwt", { session: false }), async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const bikes = await prisma.bike.findMany({
      where: {
        isPublish: true,
      },
    });
    res.status(200).json(bikes);
  } catch (error) {
    console.error('Error fetching bikes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ Route to get a single bike by ID
router.get('/:id', passport.authenticate("jwt", { session: false }), async (req, res) => {
  const bikeId = parseInt(req.params.id);
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (isNaN(bikeId)) {
    return res.status(400).json({ error: 'Invalid bike ID' });
  }

  try {
    const bike = await prisma.bike.findUnique({
      where: { id: bikeId },
    });

    if (!bike || !bike.isPublish) {
      return res.status(404).json({ error: 'Bike not found' });
    }

    res.status(200).json(bike);
  } catch (error) {
    console.error('Error fetching bike by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
