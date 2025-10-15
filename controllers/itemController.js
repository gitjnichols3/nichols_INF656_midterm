const data = {
    items: require('../model/items.json'),
    setItems: function (data) 
        { this.items = data; 

        },
};

// Get all items
const getAllItems = (req, res) => {
    res.json(data.items);
};

// Create a new item
const createItem = (req, res) => {
    const newItem = { 
        id: data.items?.length ? data.items[data.items.length - 1].id + 1 : 1,
        name: req.body.name,
        category:   req.body.category,
        price:  req.body.price,
    };

    if (!newItem.name || !newItem.category || !newItem.price === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    data.setItems([...data.items, newItem]);
    res.status(201).json(newItem);
};

// Update an item
const updateItem = (req, res) => {
    const item = data.items.find(i => i.id === parseInt(req.body.id)); 
    if (!item) {
        return res.status(400).json({ message: `Item ID ${req.body.id} not found` });
    }
    if (req.body.name) item.name = req.body.name;
    if (req.body.category) item.category = req.body.category;
    if (req.body.price) item.price = req.body.price;

    const filteredArray = data.items.filter(i => i.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, item];
    data.setItems(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    res.json(item); // should this be data.items? 
}

// Delete an item
const deleteItem = (req, res) => {
    const item = data.items.find(i => i.id === parseInt(req.body.id));
    if (!item) {
        return res.status(400).json({ message: `Item ID ${req.body.id} not found` });
    }
    const filteredArray = data.items.filter(i => i.id !== parseInt(req.body.id));
    data.setItems([...filteredArray]);
    res.json(data.items);
};

// Get a specific item
const getItem = (req, res) => {
    const item = data.items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(400).json({ message: `Item ID ${req.params.id} not found` });
    }
    res.json(item);
};

module.exports = {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
    getItem
};