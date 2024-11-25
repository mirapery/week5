const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Full-time, Part-time, Contract
  description: { type: String, required: true },
  company: {
    name: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
  },
  location: { type: String, required: true }, // e.g., City, State, or Remote
  salary: { type: Number, required: true }, // e.g., Annual or hourly salary
  postedDate: { type: Date, default: Date.now }, // Date the job was posted
});

//add virtual field id
jobSchema.set("toJSON", {
  virtuals: true,                     // Include virtual fields defined in the scema in the JSOn representation
  transform: (doc, ret) => {          // Modify the document before it is serialized (doc = mongoose document, ret = JS object)
    ret.id = ret._id;                 // Add an 'id' field that mirrors the value of '_id'
    return ret;                       // Return the modified object
  },
});
// Explanation:
// The purpose of this code snippet is to define how documents should be transformed when they are serialized into JSON format (=toJSON)

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
