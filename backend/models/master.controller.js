const db = require('../models');

const modelMap = {
  categories: db.category,
  countries: db.country,
  industries: db.industry,
  statuses: db.status
};

exports.getAll = async (req, res) => {
  const Model = modelMap[req.params.type];
  if (!Model) return res.status(400).send('Invalid type');
  const items = await Model.findAll();
  res.json(items);
};

exports.create = async (req, res) => {
  const Model = modelMap[req.params.type];
  if (!Model) return res.status(400).send('Invalid type');
  const item = await Model.create(req.body);
  res.json(item);
};

exports.update = async (req, res) => {
  const Model = modelMap[req.params.type];
  if (!Model) return res.status(400).send('Invalid type');
  await Model.update(req.body, { where: { id: req.params.id } });
  res.send('Updated');
};

exports.remove = async (req, res) => {
  const Model = modelMap[req.params.type];
  if (!Model) return res.status(400).send('Invalid type');
  await Model.destroy({ where: { id: req.params.id } });
  res.send('Deleted');
};
