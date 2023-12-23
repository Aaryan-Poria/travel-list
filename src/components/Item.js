export default function Item({ item, onDeleteItems, onToggleItems }) {
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
