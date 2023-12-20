import React, { useState, useEffect } from "react";
import axios from "axios";

function FAQ() {
    const [faq, setFaq] = useState([]);
    const [expandedItems, setExpandedItems] = useState([]);

    useEffect(() => {
        async function fetchFaq() {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const response = await axios.get(`https://perenual.com/api/article-faq-list?key=${apiKey}`);
                setFaq(response.data.data);
            } catch (error) {
                console.error("Error fetching FAQ's", error);
            }
        }

        fetchFaq();
    }, []);

    const toggleItem = (itemId) => {
        setExpandedItems((prevItems) => {
            if (prevItems.includes(itemId)) {
                return prevItems.filter((id) => id !== itemId);
            } else {
                return [...prevItems, itemId];
            }
        });
    };

    return (
        <>
            <h1>Plant FAQ's</h1>
            <section className="faq-container">
                {faq.map((item) => (
                    <div key={item.id} className={`faq-item ${expandedItems.includes(item.id) ? 'expanded' : ''}`}>
                        <h3 onClick={() => toggleItem(item.id)}>{item.question}</h3>
                        {expandedItems.includes(item.id) && <p>{item.answer}</p>}
                    </div>
                ))}
            </section>
        </>
    );
}

export default FAQ;