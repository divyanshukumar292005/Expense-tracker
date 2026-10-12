import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/expenses";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Database se expenses load karna
  const fetchExpenses = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Expenses load nahi hue");
      }

      const data = await response.json();
      setExpenses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Expenses load nahi hue. Backend check karo.");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Form clear karna
  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
    setEditingId(null);
  };

  // Add aur Update dono
  const handleSubmit = async () => {
    if (!title.trim() || amount === "" || Number(amount) < 0 || !date) {
      alert("Title, valid amount aur date bharo.");
      return;
    }

    setLoading(true);

    try {
      const expenseData = {
        title: title.trim(),
        amount: Number(amount),
        category,
        date,
      };

      const isEditing = editingId !== null;
      const url = isEditing
        ? `${API_URL}/${editingId}`
        : API_URL;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Save/update error:", response.status, errorText);
        alert(
          isEditing
            ? "Expense update nahi hua."
            : "Expense save nahi hua."
        );
        return;
      }

      // Database se actual latest data lena
      await fetchExpenses();
      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
      alert("Server se connection nahi ho raha.");
    } finally {
      setLoading(false);
    }
  };

  // Edit ke liye form mein data bharna
  const handleEdit = (expense) => {
    setTitle(expense.title ?? "");
    setAmount(String(expense.amount ?? ""));
    setCategory(expense.category || "Food");
    setDate(expense.date || "");
    setEditingId(expense._id);
  };

  // Database se expense delete karna
  const handleDelete = async (id) => {
    if (!id) {
      alert("Expense ID nahi mili.");
      return;
    }

    const confirmed = window.confirm(
      "Kya tum ye expense delete karna chahte ho?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Delete error:", response.status, errorText);
        alert("Expense delete nahi hua.");
        return;
      }

      // Database se dobara data load karna
      await fetchExpenses();

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Server se connection nahi ho raha.");
    }
  };

  const filteredExpenses = expenses.filter((expense) =>
    (expense.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalExpense = expenses.reduce(
    (total, expense) => total + Number(expense.amount || 0),
    0
  );

  return (
    <div className="app">
      <h1>Expense Tracker</h1>
      <p>Track your daily expenses</p>

      <div className="expense-container">
        <div className="total-expense">
          <p>Total Expense</p>
          <h2>₹{totalExpense}</h2>
        </div>

        <h2>{editingId ? "Edit Expense" : "Add New Expense"}</h2>

        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          min="0"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Education">Education</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading
            ? "Please wait..."
            : editingId
              ? "Update Expense"
              : "Add Expense"}
        </button>

        {editingId && (
          <button onClick={resetForm} disabled={loading}>
            Cancel Edit
          </button>
        )}

        <div className="expense-list">
          <input
            type="text"
            placeholder="Search expenses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <h2>Your Expenses</h2>

          {filteredExpenses.length === 0 && (
            <p className="empty-message">
              {search
                ? "No matching expenses found."
                : "No expense added yet."}
            </p>
          )}

          {filteredExpenses.map((expense) => (
            <div className="expense-item" key={expense._id}>
              <span>{expense.title}</span>
              <span>₹{expense.amount}</span>
              <span>{expense.category}</span>
              <span>{expense.date}</span>

              <button
                onClick={() => handleEdit(expense)}
                disabled={loading}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(expense._id)}
                disabled={loading}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;