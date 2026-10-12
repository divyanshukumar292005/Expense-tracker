const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config()
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Expense Tracker Backend is running!");
});
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((error) => console.log("MongoDB Connection Error:", error.message));

const Expense = require("./Expense");

app.get("/api/expenses", async(req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.post("/api/expenses", async(req, res) => {
    try {
        const newExpense = new Expense({
            title: req.body.title,
            amount: req.body.amount,
            category: req.body.category,
            date: req.body.date
        });

        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.put("/api/expenses/:id", async(req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id, {
                title: req.body.title,
                amount: req.body.amount,
                category: req.body.category,
                date: req.body.date
            }, { new: true, runValidators: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.delete("/api/expenses/:id", async(req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const PORT = process.env.Port || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
