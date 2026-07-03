// =======================
// IMPORT IMAGES
// =======================

import balancerShaft from "../assets/Balancer Shaft.png";
import bracketEngine from "../assets/Bracket Engine.png";
import bracketExhPipe from "../assets/Bracket Exh Pipe.png";
import bracketFrAbs from "../assets/Bracket Fr Abs.png";
import bracketSpringFr from "../assets/Bracket Spring FR.png";
import bracketSpringRr from "../assets/Bracket Spring RR.png";
import brakeAssy from "../assets/Brake Assy.png";
import caseBearing from "../assets/Case Bearing.png";
import caseInterAxleDiff from "../assets/Case Inter Axle Diff.png";
import collarPc200 from "../assets/Collar pc 200.png";
import collarTrunnion from "../assets/Collar Trunnion.png";
import coverAxleHousing from "../assets/Cover Axle Housing.png";
import cylinderSleeve from "../assets/Cylinder Slevee.png";
import cylinderWheel from "../assets/Cylinder Wheel.png";
import discBrake from "../assets/Disc Brake.png";
import drumBrake from "../assets/Drum Brake.png";
import exhaustManifoldSet from "../assets/Exhaust Manifold Set.png";
import flyWheel from "../assets/Fly Wheel.png";
import frontGrill from "../assets/Front Grill.png";
import holderInjection from "../assets/Holder Injection.png";
import hookCab from "../assets/Hook Cab.png";
import hookFr from "../assets/Hook Fr.png";
import hubDrumAssy from "../assets/Hub & Drum Assy.png";
import hubAssy from "../assets/Hub Assy.png";
import hubWheel from "../assets/Hub Wheel.png";
import knuckleSteering from "../assets/Knuckle Steering.png";
import lowerRhLh from "../assets/Lower Rh & Lh.png";
import oilSeal from "../assets/OIL SEAL.png";
import plateShiftLock from "../assets/Plate Shift lock.png";
import pressurePlate from "../assets/Pressure Plate.png";
import pulleyCrankshaft from "../assets/Pulley Crankshaft.png";
import retainerCover from "../assets/Retainer Cover.png";
import rotorBrake from "../assets/Rotor Brake.png";
import seatTrunnion from "../assets/Seattrunion.png";
import axleassy from "../assets/axleassy.png";



// =======================
// PRODUCT DATA
// =======================

export const products = [
  {
    id: 1,  
    name: "Balancer Shaft",
    category: "Engine",
    image: balancerShaft,
    description: "Precision machined balancer shaft for engine balancing and vibration reduction.",
    applications: ["Automotive", "Commercial Vehicle"],
  },

  {
    id: 2,
    name: "Bracket Engine",
    category: "Bracket",
    image: bracketEngine,
    description: "High-strength engine mounting bracket.",
    applications: ["Truck", "Heavy Equipment"],
  },

  {
    id: 3,
    name: "Bracket Exhaust Pipe",
    category: "Bracket",
    image: bracketExhPipe,
    description: "Durable exhaust pipe support bracket.",
    applications: ["Automotive"],
  },

  {
    id: 4,
    name: "Bracket Front ABS",
    category: "Brake",
    image: bracketFrAbs,
    description: "ABS mounting bracket manufactured with precision machining.",
    applications: ["Passenger Vehicle"],
  },

  {
    id: 5,
    name: "Bracket Spring FR",
    category: "Suspension",
    image: bracketSpringFr,
    description: "Front suspension spring bracket.",
    applications: ["Commercial Vehicle"],
  },

  {
    id: 6,
    name: "Bracket Spring RR",
    category: "Suspension",
    image: bracketSpringRr,
    description: "Rear suspension spring bracket.",
    applications: ["Commercial Vehicle"],
  },

  {
    id: 7,
    name: "Brake Assembly",
    category: "Brake",
    image: brakeAssy,
    description: "Complete brake assembly manufactured under strict quality control.",
    applications: ["Truck", "Bus"],
  },

  {
    id: 8,
    name: "Case Bearing",
    category: "Transmission",
    image: caseBearing,
    description: "Precision bearing housing component.",
    applications: ["Industrial", "Automotive"],
  },

  {
    id: 9,
    name: "Case Inter Axle Differential",
    category: "Transmission",
    image: caseInterAxleDiff,
    description: "Inter axle differential housing.",
    applications: ["Heavy Duty Truck"],
  },

  {
    id: 10,
    name: "Collar PC200",
    category: "Heavy Equipment",
    image: collarPc200,
    description: "Precision collar for PC200 excavator.",
    applications: ["Mining", "Construction"],
  },

  {
    id: 11,
    name: "Collar Trunnion",
    category: "Heavy Equipment",
    image: collarTrunnion,
    description: "Heavy-duty trunnion collar.",
    applications: ["Heavy Equipment"],
  },

  {
    id: 12,
    name: "Cover Axle Housing",
    category: "Axle",
    image: coverAxleHousing,
    description: "Machined axle housing cover.",
    applications: ["Commercial Vehicle"],
  },

  {
    id: 13,
    name: "Cylinder Sleeve",
    category: "Engine",
    image: cylinderSleeve,
    description: "Engine cylinder sleeve with high wear resistance.",
    applications: ["Diesel Engine"],
  },

  {
    id: 14,
    name: "Cylinder Wheel",
    category: "Brake",
    image: cylinderWheel,
    description: "Brake wheel cylinder.",
    applications: ["Automotive"],
  },

  {
    id: 15,
    name: "Disc Brake",
    category: "Brake",
    image: discBrake,
    description: "High-performance brake disc.",
    applications: ["Passenger Vehicle"],
  },

  {
    id: 16,
    name: "Drum Brake",
    category: "Brake",
    image: drumBrake,
    description: "Durable drum brake assembly.",
    applications: ["Truck"],
  },

  {
    id: 17,
    name: "Exhaust Manifold Set",
    category: "Engine",
    image: exhaustManifoldSet,
    description: "Complete exhaust manifold assembly.",
    applications: ["Diesel Engine"],
  },

  {
    id: 18,
    name: "Fly Wheel",
    category: "Engine",
    image: flyWheel,
    description: "High precision flywheel.",
    applications: ["Automotive"],
  },

  {
    id: 19,
    name: "Front Grill",
    category: "Body",
    image: frontGrill,
    description: "Vehicle front grille component.",
    applications: ["Commercial Vehicle"],
  },

  {
    id: 20,
    name: "Holder Injection",
    category: "Engine",
    image: holderInjection,
    description: "Fuel injector holder.",
    applications: ["Diesel Engine"],
  },

  {
    id: 21,
    name: "Hook",
    category: "Cabin",
    image: hookCab,
    description: "Cab hook component.",
    applications: ["Truck"],
  },

  {
    id: 22,
    name: "Hook Cab",
    category: "Cabin",
    image: hookFr,
    description: "Front hook component.",
    applications: ["Truck"],
  },

  {
    id: 23,
    name: "Hub & Drum Assembly",
    category: "Brake",
    image: hubDrumAssy,
    description: "Hub and drum brake assembly.",
    applications: ["Commercial Vehicle"],
  },

  {
    id: 24,
    name: "Hub Assembly",
    category: "Axle",
    image: hubAssy,
    description: "Wheel hub assembly.",
    applications: ["Truck"],
  },

  {
    id: 25,
    name: "Hub Wheel",
    category: "Axle",
    image: hubWheel,
    description: "Precision machined wheel hub.",
    applications: ["Heavy Duty"],
  },

  {
    id: 26,
    name: "Knuckle Steering",
    category: "Steering",
    image: knuckleSteering,
    description: "Steering knuckle component.",
    applications: ["Commercial Vehicle"],
  },

  {
    id: 27,
    name: "Lower RH & LH",
    category: "Suspension",
    image: lowerRhLh,
    description: "Lower arm RH/LH.",
    applications: ["Passenger Vehicle"],
  },

  {
    id: 28,
    name: "Oil Seal",
    category: "Seal",
    image: oilSeal,
    description: "Industrial oil seal.",
    applications: ["Automotive", "Industrial"],
  },

  {
    id: 29,
    name: "Plate Shift Lock",
    category: "Transmission",
    image: plateShiftLock,
    description: "Shift lock plate.",
    applications: ["Transmission"],
  },

  {
    id: 30,
    name: "Pressure Plate",
    category: "Clutch",
    image: pressurePlate,
    description: "Clutch pressure plate.",
    applications: ["Passenger Vehicle"],
  },

  {
    id: 31,
    name: "Pulley Crankshaft",
    category: "Engine",
    image: pulleyCrankshaft,
    description: "Crankshaft pulley.",
    applications: ["Diesel Engine"],
  },

  {
    id: 32,
    name: "Retainer Cover",
    category: "Transmission",
    image: retainerCover,
    description: "Transmission retainer cover.",
    applications: ["Industrial"],
  },

  {
    id: 33,
    name: "Rotor Brake",
    category: "Brake",
    image: rotorBrake,
    description: "Brake rotor with precision machining.",
    applications: ["Passenger Vehicle"],
  },

  {
    id: 34,
    name: "Seat Trunnion",
    category: "Heavy Equipment",
    image: seatTrunnion,
    description: "Heavy-duty seat trunnion component.",
    applications: ["Mining", "Construction"],
  },
];


// =======================
// FILTER CATEGORIES
// =======================

export const categories = [
  "All",
  "Engine",
  "Brake",
  "Transmission",
  "Suspension",
  "Steering",
  "Axle",
  "Bracket",
  "Body",
  "Cabin",
  "Clutch",
  "Seal",
  "Heavy Equipment",
];