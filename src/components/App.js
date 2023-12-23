import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form.js";
import PackingList from "./PackingList.js";
import Stats from "./Stats.js";

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
