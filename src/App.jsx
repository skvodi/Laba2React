import React, { useState, createContext, useContext } from 'react';
import './App.css'; // если хочешь, можешь оставить подключение стилей

// Создаём контекст
const ItemsContext = createContext();

// Хук для удобства
const useItems = () => useContext(ItemsContext);

// Провайдер контекста
const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    return (
        <ItemsContext.Provider value={{ items, setItems }}>
            {children}
        </ItemsContext.Provider>
    );
};

const style = {
    app: {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        padding: '20px',
    },
    h1: {
        color: '#333',
    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        width: '250px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
    },
    itemList: {
        listStyleType: 'none',
        padding: '0',
    },
    item: {
        padding: '10px',
        margin: '5px 0',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '18px',
    },
};

// Компонент для ввода нового элемента
const ItemInput = () => {
    const [inputText, setInputText] = useState('');
    const { items, setItems } = useItems();

    const handleInputChange = (e) => setInputText(e.target.value);

    const handleAddItem = () => {
        const newItem = {
            id: Date.now(),
            text: inputText,
        };
        setItems([...items, newItem]);
        setInputText('');
    };

    return (
        <div style={style.inputContainer}>
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Введите текст"
                style={style.input}
            />
            <button
                onClick={handleAddItem}
                disabled={!inputText}
                style={inputText ? style.button : { ...style.button, ...style.buttonDisabled }}
            >
                Добавить
            </button>
        </div>
    );
};

// Компонент для отображения списка
const ItemList = () => {
    const { items } = useItems();

    return (
        <ul style={style.itemList}>
            {items.map((item) => (
                <li key={item.id} style={style.item}>
                    {item.text}
                </li>
            ))}
        </ul>
    );
};

const App = () => {
    return (
        <ItemsProvider>
            <div style={style.app}>
                <h1 style={style.h1}>Список элементов</h1>
                <ItemInput />
                <ItemList />
            </div>
        </ItemsProvider>
    );
};

export default App;