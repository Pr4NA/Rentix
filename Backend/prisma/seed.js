// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bikes = [
  {
    brand: "Hero",
    name: "Glamour",
    pricePerDay: 199,
    available: true,
    description: "125 cc air-cooled engine, 10.53 PS @ 7500 rpm, 65 kmpl mileage.",
    image: "glamour.png",
    bikeFront: "glamourfront.avif",
    bikeRear: "glamourback.webp",
    bikeLeft: "glamourleft.avif",
    bikeRight: "glamourright.webp",
    city: "Dehradun"
  },
  {
    brand: "Hero",
    name: "Super Splendor",
    pricePerDay: 499,
    available: true,
    description: "Powerful and fuel-efficient commuter bike.",
    image: "supersplender.png",
    bikeFront: "default.jpg",
    bikeRear: "default.jpg",
    bikeLeft: "default.jpg",
    bikeRight: "default.jpg",
    city: "Rishikesh"
  },
  {
    brand: "Hero",
    name: "Splendor i Smart",
    pricePerDay: 499,
    available: true,
    description: "Smart technology with great mileage.",
    image: "ismart.avif",
    bikeFront: "default.jpg",
    bikeRear: "default.jpg",
    bikeLeft: "default.jpg",
    bikeRight: "default.jpg",
    city: "Dehradun"
  },
  {
    brand: "Honda",
    name: "Shine SP125",
    pricePerDay: 499,
    available: true,
    description: "Smooth engine with refined performance.",
    image: "shine.avif",
    bikeFront: "default.jpg",
    bikeRear: "default.jpg",
    bikeLeft: "default.jpg",
    bikeRight: "default.jpg",
    city: "Mussoorie"
  },
  {
    brand: "Bajaj",
    name: "Pulsar NS200",
    pricePerDay: 599,
    available: false,
    description: "Sporty and powerful for long rides.",
    image: "pulsar.avif",
    bikeFront: "default.jpg",
    bikeRear: "default.jpg",
    bikeLeft: "default.jpg",
    bikeRight: "default.jpg",
    city: "Rishikesh"
  },
  {
    brand: "TVS",
    name: "Apache RTR 160",
    pricePerDay: 450,
    available: true,
    description: "Track-inspired performance and design.",
    image: "apache.webp",
    bikeFront: "default.jpg",
    bikeRear: "default.jpg",
    bikeLeft: "default.jpg",
    bikeRight: "default.jpg",
    city: "Dehradun"
  },
  {
    brand: "KTM",
    name: "Duke 200",
    pricePerDay: 699,
    available: true,
    description: "Lightweight and performance-oriented.",
    image: "ktm.jpg",
    bikeFront: "default.jpg",
    bikeRear: "default.jpg",
    bikeLeft: "default.jpg",
    bikeRight: "default.jpg",
    city: "Haridwar"
  },
  {
    brand: "Royal Enfield",
    name: "Classic 350",
    pricePerDay: 749,
    available: true,
    description: "Iconic design, thumping ride.",
    image: "Bullet.jpg",
    bikeFront: "default.jpg",
    bikeRear: "default.jpg",
    bikeLeft: "default.jpg",
    bikeRight: "default.jpg",
    city: "Dehradun"
  },
  {
    brand: "Yamaha",
    name: "FZ-S",
    pricePerDay: 499,
    available: true,
    description: "Street-smart design with strong performance.",
    image: "yahama.avif",
    bikeFront: "default.jpg",
    bikeRear: "default.jpg",
    bikeLeft: "default.jpg",
    bikeRight: "default.jpg",
    city: "Mussoorie"
  },
  {
    brand: "Suzuki",
    name: "Gixxer SF",
    pricePerDay: 550,
    available: true,
    description: "Sporty full-faired bike with good handling.",
    image: "gixxer.avif",
    bikeFront: "default.jpg",
    bikeRear: "default.jpg",
    bikeLeft: "default.jpg",
    bikeRight: "default.jpg",
    city: "Haridwar"
  },
];

async function main() {
  console.log("Seeding database...");
  for (const bike of bikes) {
    await prisma.bike.create({ data: bike });
  }
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
