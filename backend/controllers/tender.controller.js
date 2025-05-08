const db = require('../models');

exports.getAll = async (req, res) => {
  const tenders = await db.tender.findAll({ include: [db.user, db.category, db.country, db.industry, db.status] });
  res.json(tenders);
};

exports.create = async (req, res) => {
  const tender = await db.tender.create(req.body);
  res.json(tender);
};
