import React from 'react';
import FrequentlyQues from './FrequentlyQues';

const faqData = [
    {
        id: 1,
        question: "How does this posture corrector work?",
        answer:
            "The posture corrector gently pulls your shoulders back and aligns your spine to a healthier position. Over time, it trains your muscles to maintain proper posture even without wearing the device."
    },
    {
        id: 2,
        question: "Is it suitable for all ages and body types?",
        answer:
            "Yes, the posture corrector is designed with adjustable straps to fit a wide range of ages, body shapes, and sizes. It can be comfortably worn by teens, adults, and seniors alike."
    },
    {
        id: 3,
        question: "Does it really help with back pain and posture improvement?",
        answer:
            "Absolutely. Consistent use of a posture corrector can reduce strain on your back muscles and spine, relieving pain caused by poor posture. It's especially helpful for those who sit for long periods."
    },
    {
        id: 4,
        question: "Does it have smart features like vibration alerts?",
        answer:
            "Some models do come with smart features such as vibration alerts that notify you when you slouch. These are ideal for users who want real-time posture correction feedback."
    },
    {
        id: 5,
        question: "How will I be notified when the product is back in stock?",
        answer:
            "You can sign up for restock notifications on the product page by entering your email. We'll send you an alert as soon as the item becomes available again."
    }
];

const Frequently = () => {
    return (
        <section className="py-12 px-4 md:px-16 bg-base-100 mb-25">
            <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Question (FAQ)</h2>
            <p className="text-center mb-10 text-gray-500">
                Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
            </p>

            <div className="space-y-4">
                {faqData.map(item => (
                    <FrequentlyQues item={item} key={item.id}></FrequentlyQues>
                ))}
            </div>

            <div className='mt-10 text-center'>
                <div>
                    <button className='btn bg-secondary rounded-full'>See More FAQ's</button>
                </div>
            </div>
        </section>
    );
};

export default Frequently;