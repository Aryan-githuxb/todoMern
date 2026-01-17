import List from "../models/List.js";

export const getLists = async (req, res) => {
  const lists = await List.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(lists);
};

export const createList = async (req, res) => {
  const { title, type } = req.body;
  const list = await List.create({ user: req.userId, title, type, items: [] });
  res.json(list);
};

export const updateList = async (req, res) => {
  const list = await List.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true });
  res.json(list);
};

export const deleteList = async (req, res) => {
  await List.deleteOne({ _id: req.params.id, user: req.userId });
  res.json({ message: "Deleted" });
};