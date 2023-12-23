export default function Stats({ items }) {
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
