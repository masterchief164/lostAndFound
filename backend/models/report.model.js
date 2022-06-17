const mongoose = require('../bin/mongoose.util');

const lostSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    roll: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    reportedOn: {
      type: Number,
      default: Date.now(),
    },
    type: {
      type: String,
      default: 'lost',
    },
  },
  { timestamps: { created_at: 'created' } },
  { timestamps: { updated_at: 'updated' } },
);

const foundSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    roll: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    reportedOn: {
      type: Number,
      default: Date.now(),
    },
    type: {
      type: String,
      default: 'found',
    },
  },
  { timestamps: { created_at: 'created' } },
  { timestamps: { updated_at: 'updated' } },
);

const lostModel = mongoose.model('lostItems', lostSchema);

const foundModel = mongoose.model('foundItems', foundSchema);

module.exports = {
  lostModel, foundModel, lostSchema, foundSchema,
};
