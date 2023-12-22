import React, { useState } from "react";
import "./FAQ.css"

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Can I keep my indoor plants in the same pot indefinitely?",
      answer:
        "No, most indoor plants benefit from repotting every 1-2 years to refresh the soil, provide more space for root growth, and inspect the roots for signs of disease or overcrowding.",
    },
    {
      question: "How often should I water my indoor plants?",
      answer:
        "The frequency of watering depends on the type of plant, its size, and the conditions in your home. Check the soil moisture regularly and water when the top inch of soil feels dry. Be sure not to overwater, as this can lead to root rot.",
    },
    {
      question: "Is it possible to grow a vegetable garden in a small space?",
      answer:
        "Yes, it is possible to grow a vegetable garden in a small space. Gardening in a small space can be as simple as growing a few containerized plants in pots and raised beds, or as elaborate as vertically stacking planters, hanging pouches, and hanging baskets on a wall, railing, or fence. Regardless of the size of the space you are working with, some simple techniques such as companion planting, organic fertilizers, and water conservation can help you get the most out of your small vegetable garden.",
    },
    {
      question: "How can I start a garden on a budget?",
      answer:
        "Begin with seeds instead of plants, reuse containers, make your compost, and take advantage of local plant exchanges. Many gardening centers also have sales or clearance sections.",
    },
    {
      question: "What is the difference between annuals and perennials?",
      answer:
        "Annuals complete their life cycle in one growing season and need to be replanted each year. Perennials live for multiple years and typically go dormant in the winter, returning in the spring.",
    },
    {
      question: "How do I deal with pests in my garden?",
      answer:
        "Use a combination of methods, including natural predators, companion planting, and organic pesticides. Regularly inspect plants for signs of pests and take action promptly. Neem oil, insecticidal soap, and diatomaceous earth are common organic options.",
    },
    {
      question: "What type of soil is best for my garden",
      answer:
        "Well-draining soil rich in organic matter is ideal for most plants. You can improve soil quality by adding compost. Conduct a soil test to determine specific needs for your garden.",
    },
  ];

  return (
    <div className="profile-container">
      <div className="stock-image">
        <img src="/images/FAQpage.png" alt="" />
      </div>
      <div className="profile-card">
        <h1>Plant FAQ's</h1>
        <h2>
          Did you just buy a plant on a whim and are now panicking how to care for it?
        </h2>
        <h3>Here are some of the most commonly asked questions</h3>
      </div>
      <div className="faq-answers">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
          >
            <div onClick={() => handleAccordionClick(index)}>
              <h3>+{faq.question}</h3>
              {openIndex === index && <p>{faq.answer}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
