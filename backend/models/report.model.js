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
    dateTime: {
      type: String,
      default: Date.now(),
    },
    itemTag: {
      type: String,
      required: true,
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
    dateTime: {
      type: String,
      default: Date.now(),
    },
    itemTag: {
      type: String,
      required: true,
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
