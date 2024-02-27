import React, { useState } from 'react';

const App = () => {
  const dummyItems = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 15 },
    { id: 3, name: 'Item 3', price: 20 },
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [cart, setCart] = useState([]);

  const handleItemCheck = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const handleAddToCart = () => {
    const itemsToAdd = dummyItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    itemsToAdd.forEach((itemToAdd) => {
      const existingItem = cart.find((item) => item.id === itemToAdd.id);

      if (existingItem) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === itemToAdd.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart((prevCart) => [...prevCart, { ...itemToAdd, quantity: 1 }]);
      }
    });

    setSelectedItems([]);
  };

  const handleIncrease = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const getTotalCost = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div>
        <h2>Items</h2>
        <ul>
          {dummyItems.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                onChange={() => handleItemCheck(item.id)}
                checked={selectedItems.includes(item.id)}
              />
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <div>
        <h2>Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}{' '}
              <button onClick={() => handleIncrease(item.id)}>+</button>
              <button onClick={() => handleDecrease(item.id)}>-</button>
              <button onClick={() => handleRemove(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total Cost: ${getTotalCost()}</p>
      </div>
    </div>
  );
};

export default App;
