import { useState } from "react";
export default function Form({ onAddItems }) {
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
