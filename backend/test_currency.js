const mongoose = require('mongoose');
const Service = require('./models/Service');

async function testCurrency() {
  await mongoose.connect('mongodb://127.0.0.1:27017/localboost');
  console.log("Connected to MongoDB");

  const services = [
    {
      title: { en: "Test Service INR", mr: "टेस्ट" },
      shortDescription: { en: "INR Service", mr: "टेस्ट" },
      longDescription: { en: "INR Service Long", mr: "टेस्ट" },
      price: 1500,
      currency: "INR",
      duration: "monthly",
      features: [{ en: "F1", mr: "F1" }]
    },
    {
      title: { en: "Test Service USD", mr: "टेस्ट" },
      shortDescription: { en: "USD Service", mr: "टेस्ट" },
      longDescription: { en: "USD Service Long", mr: "टेस्ट" },
      price: 99,
      currency: "USD",
      duration: "monthly",
      features: [{ en: "F1", mr: "F1" }]
    },
    {
      title: { en: "Test Service EUR", mr: "टेस्ट" },
      shortDescription: { en: "EUR Service", mr: "टेस्ट" },
      longDescription: { en: "EUR Service Long", mr: "टेस्ट" },
      price: 120,
      currency: "EUR",
      duration: "monthly",
      features: [{ en: "F1", mr: "F1" }]
    }
  ];

  for (const s of services) {
    await Service.create(s);
  }

  console.log("Test services created!");
  process.exit(0);
}

testCurrency().catch(e => {
  console.error("Test failed:", e);
  process.exit(1);
});
