import React, { useState } from 'react';
import { FiShoppingCart, FiX, FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

const CartDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Product 1', rating: 4, price: 29.99, sizes: ['S', 'M', 'L'], quantity: 1, image: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Product 2', rating: 5, price: 39.99, sizes: ['M', 'L'], quantity: 2, image: 'https://via.placeholder.com/100' },
        // Add more dummy items as needed
    ]);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const incrementQuantity = (id) => {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const decrementQuantity = (id) => {
        setCartItems(cartItems.map(item => 
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <div>
            <button 
                onClick={toggleDrawer} 
                className="fixed bottom-4 right-4 p-2 bg-red-600 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <FiShoppingCart size={24} />
            </button>

            <div 
                className={`fixed inset-y-0 right-0 w-80 bg-black shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                <div className="p-4 flex justify-between items-center border-b border-gray-700">
                    <h2 className="text-lg font-bold text-white">Shopping Cart</h2>
                    <button 
                        onClick={toggleDrawer} 
                        className="text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
                        <FiX size={24} />
                    </button>
                </div>
                <div className="px-4 py-2">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center border-b border-gray-700 py-2 hover:bg-gray-800">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                                <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-400">Rating: {item.rating}</p>
                                <p className="text-sm text-gray-400">Sizes: {item.sizes.join(', ')}</p>
                            </div>
                            <div className="flex items-center">
                                <button 
                                    onClick={() => decrementQuantity(item.id)} 
                                    className="text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
                                    <FiMinusCircle size={20} />
                                </button>
                                <span className="mx-2 text-sm text-white">{item.quantity}</span>
                                <button 
                                    onClick={() => incrementQuantity(item.id)} 
                                    className="text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
                                    <FiPlusCircle size={20} />
                                </button>
                                <button 
                                    onClick={() => removeItem(item.id)} 
                                    className="ml-2 text-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    <FiX size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-700">
                    <button 
                        className="w-full py-2 bg-red-600 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Checkout
                    </button>
                </div>
            </div>
            {isOpen && <div onClick={toggleDrawer} className="fixed inset-0 bg-black opacity-50"></div>}
        </div>
    );
}

export default CartDrawer;


