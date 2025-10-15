// controllers/itemController.js
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const data = {
  items: require('../model/items.json'),
  setItems(arr) { this.items = arr; }
};

const dataPath = path.join(__dirname, '..', 'model', 'items.json');

// helper: save current items to disk
async function saveItems() {
  const json = JSON.stringify(data.items, null, 2);
  await fsp.writeFile(dataPath, json, 'utf8'); // persists changes
}

// GET all
const getAllItems = (req, res) => {
  res.json(data.items);
};

// POST (create)
const createItem = async (req, res, next) => {
  try {
    const nextId = data.items?.length ? data.items[data.items.length - 1].id + 1 : 1;
    const newItem = {
      id: nextId,
      name: req.body.name,
      category: req.body.category,
      price: req.body.price
    };
    if (!newItem.name || !newItem.category || newItem.price === undefined) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    data.setItems([...data.items, newItem]);
    await saveItems();
    res.status(201).json(newItem);
  } catch (err) { next(err); }
};

// PUT (update)
const updateItem = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = data.items.find(i => i.id === id);
    if (!item) return res.status(400).json({ message: `Item ID ${id} not found` });

    if (req.body.name !== undefined) item.name = req.body.name;
    if (req.body.category !== undefined) item.category = req.body.category;
    if (req.body.price !== undefined) item.price = req.body.price;

    const sorted = [...data.items].sort((a, b) => a.id - b.id);
    data.setItems(sorted);
    await saveItems();
    res.json(item);
  } catch (err) { next(err); }
};

// DELETE
const deleteItem = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const exists = data.items.some(i => i.id === id);
    if (!exists) return res.status(400).json({ message: `Item ID ${id} not found` });

    data.setItems(data.items.filter(i => i.id !== id));
    await saveItems();
    res.json({ message: `Item ${id} deleted` });
  } catch (err) { next(err); }
};

const getItem = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = data.items.find(i => i.id === id);
  if (!item) return res.status(400).json({ message: `Item ID ${id} not found` });
  res.json(item);
};

module.exports = { getAllItems, createItem, updateItem, deleteItem, getItem };
