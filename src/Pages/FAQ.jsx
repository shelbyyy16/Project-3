import React, { useState, useEffect } from "react";
import axios from "axios";

function FAQ() {
    const [faq, setFaq] = useState([]);

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

    return (
        <>
            <h1>Plant FAQ's</h1>
            <section className="faq-container">
                {faq.map((item) => (
                    <div key={item.id} className="faq-item">
                        <h3>{item.question}</h3>
                        <p>{item.answer}</p>
                    </div>
                ))}
            </section>
        </>
    );
}

export default FAQ;