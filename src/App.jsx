import { useReducer, useState } from "react";

function listReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM":
            return [...state, { id: Date.now(), text: action.payload }];
        default:
            return state;
    }
}

export default function App() {
    const [items, dispatch] = useReducer(listReducer, []);
    const [inputValue, setInputValue] = useState("");

    const handleAdd = () => {
        if (inputValue.trim()) {
            dispatch({ type: "ADD_ITEM", payload: inputValue });
            setInputValue("");
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#fff",
            width: "100vw",
            color: "#000" // Чёрный цвет текста для всей страницы
        }}>
            <div style={{
                textAlign: "center",
                padding: 20,
                width: "100%",
                maxWidth: 400,
                borderRadius: 10,
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                minHeight: "300px"
            }}>
                <h2 style={{ color: "#000" }}>Список элементов</h2>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Введите текст..."
                    style={{
                        padding: 10,
                        width: "80%",
                        marginBottom: 10,
                        border: "1px solid #ccc",
                        borderRadius: 5,
                        backgroundColor: "#fff",
                        color: "#000" // Чёрный цвет текста
                    }}
                />
                <br />
                <button
                    onClick={handleAdd}
                    disabled={!inputValue.trim()}
                    style={{
                        padding: 10,
                        cursor: "pointer",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: 5,
                        fontWeight: "bold",
                        marginBottom: 10
                    }}
                >
                    Добавить
                </button>
                <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
                    {items.map((item) => (
                        <li key={item.id} style={{
                            padding: 10,
                            borderBottom: "1px solid #ddd",
                            color: "#000" // Чёрный текст для списка
                        }}>
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}