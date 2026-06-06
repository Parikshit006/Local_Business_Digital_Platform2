const mongoose = require('mongoose');
const Service = require('./models/Service');

async function checkLegacyDurations() {
  await mongoose.connect('mongodb://127.0.0.1:27017/localboost');
  console.log("Connected to MongoDB");

  // We are bypassing schema validation using lean() and raw query 
  // since Mongoose might cast or error on retrieval if strict is on.
  const services = await Service.find({}).lean();
  let invalidCount = 0;
  
  services.forEach(s => {
    if (typeof s.duration === 'number' || s.duration === '30' || !["hourly", "daily", "weekly", "monthly", "one-time"].includes(s.duration)) {
      console.log(`[!] Legacy Duration Found: Service ID ${s._id} has duration '${s.duration}'`);
      invalidCount++;
    }
  });

  if (invalidCount === 0) {
    console.log("No legacy numerical duration records found.");
  }
  
  process.exit(0);
}

checkLegacyDurations();
