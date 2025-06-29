import React from 'react';

const FrequentlyQues = ({ item }) => {

    const { question, answer } = item;

    return (
        <div
            className="collapse collapse-arrow bg-base-200">
            <input type="checkbox" className="peer" />
            <div className="text-primary collapse-title text-lg font-medium peer-checked:bg-blue-100 transition-colors duration-300">
                {question}
            </div>
            <div className="collapse-content text-gray-600 peer-checked:bg-blue-50 transition-colors duration-300">
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default FrequentlyQues;