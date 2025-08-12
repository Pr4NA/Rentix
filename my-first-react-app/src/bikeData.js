import bullet from './Bullet.jpg' ;
import ktm from './ktm.jpg' ;
import glamour from './glamour.png' ;
import supersplender from './supersplender.png' ;
import ismart from './ismart.avif' ;
import shine from './shine.avif' ;
import pulsar from './pulsar.avif' ;
import apache from './apache.webp' ;
import yahama from './yahama.avif' ;
import gixxer from './gixxer.avif' ;
import glamourFront from './glamourfront.avif'
import glamourRear from './glamourback.webp'
import glamourLeft from './glamourleft.avif'
import glamourRight from './glamourright.webp'


const bikeData = [
  {
  id: 1,
  image: glamour,
  brand: "Hero",
  name: "Glamour",
  pricePerDay: 199,
  available: true,
  description: "The Hero Glamour is powered by a 125 cc air-cooled engine which produces 10.53 PS @ 7500 rpm of power. It has a fuel tank of 10 L and a claimed mileage of 65 kmpl. The Hero Glamour starts at Rs 84,698 and goes up to Rs 91,198 (ex-showroom, Delhi). It is available in four variants.",
  bikeFront: glamourFront,
  bikeRear: glamourRear,
  bikeLeft: glamourLeft,
  bikeRight: glamourRight
}
,
  {
    id: 2,
    image: supersplender,
    brand: "Hero",
    name: "Super Splendor",
    pricePerDay: 499,
    available: true
  },
  {
    id: 3,
    image: ismart,
    brand: "Hero",
    name: "Splendor i Smart",
    pricePerDay: 499,
    available: true
  },
  {
    id: 4,
    image: shine,
    brand: "Honda",
    name: "Shine SP125",
    pricePerDay: 499,
    available: true
  },
  {
    id: 5,
    image: pulsar,
    brand: "Bajaj",
    name: "Pulsar NS200",
    pricePerDay: 599,
    available: false
  },
  {
    id: 6,
    image: apache,
    brand: "TVS",
    name: "Apache RTR 160",
    pricePerDay: 450,
    available: true
  },
  {
    id: 7,
    image: ktm,
    brand: "KTM",
    name: "Duke 200",
    pricePerDay: 699,
    available: true
  },
  {
    id: 8,
    image: bullet,
    brand: "Royal Enfield",
    name: "Classic 350",
    pricePerDay: 749,
    available: true
  },
  {
    id: 9,
    image: yahama,
    brand: "Yamaha",
    name: "FZ-S",
    pricePerDay: 499,
    available: true
  },
  {
    id: 10,
    image: gixxer,
    brand: "Suzuki",
    name: "Gixxer SF",
    pricePerDay: 550,
    available: true
  }
];

export default bikeData;
