import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]); // Lifted Up from Form to pass to Packing List

  function handleItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    // We can delete items by their ids
    setItems((item) => items.filter((item) => item.id !== id));
  }

  function handleToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    if (items.length === 0) return;
    const confirmed = window.confirm(
      "Are you sure you want to delete all items? "
    );
    if (items.length === 0) setItems([]);
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggle}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form({ onAddItems }) {
  // Controlled Elements, to handle the submit event in REACT itself
  // i.e to get the value out of the form
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  /*
   const [items, setItems] = useState([]); 

   // These were actually needed by the PackingList component for rendering
  // So, we LIFT UP STATE to App (closet common parent)

   function handleItems(item) {
    setItems((items) => [...items, item]);
  }

  we also need to pass the setter function obviously
  */

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e)

    if (!description) return; // Handle empty submission

    // Generate the item to be added
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    // handleItems(newItem);
    onAddItems(newItem);

    // Reseting the values

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))} // The vaalue is coming from <option value={}}
      >
        {
          // Make the drop-down using an array
          Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))
        }
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItems, onToggleItems, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  // We will create a new sorted array from original array
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  else if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  else
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">SORT BY INPUT ORDER</option>
          <option value="description">SORT BY DESCRIPTION</option>
          <option value="packed">SORT BY PACKED STATUS</option>
        </select>
        <button onClick={() => onClearList()}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItems, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onClick={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button style={{ color: "red" }} onClick={() => onDeleteItems(item.id)}>
        {/* We had to do onDeleteItems(item.id) as it React passes the EVENT. Also, () => to prevent React calling at once */}
        X
      </button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <em className="stats">Start adding items to your packing list 🚀</em>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  let percentPacked = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentPacked === 100
          ? `You got everything! Ready to go 🔥`
          : `You have ${numItems} items in your list, and you have already packed
        ${numPacked} (${percentPacked}%) 🚀`}
      </em>
    </footer>
  );
}
