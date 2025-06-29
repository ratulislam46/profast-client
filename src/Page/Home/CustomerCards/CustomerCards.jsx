import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const customers = [
  {
    id: 1,
    name: "Alice Johnson",
    post: "Marketing Manager",
    comment: "This product completely changed the way we work. Highly recommended!",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "Rahim Uddin",
    post: "Software Engineer",
    comment: "Very intuitive and easy to use. Customer support was excellent.",
    image: "https://randomuser.me/api/portraits/men/36.jpg"
  },
  {
    id: 3,
    name: "Sophie Lee",
    post: "Project Coordinator",
    comment: "We saved a lot of time after using this service. Great value!",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 4,
    name: "Tanvir Hasan",
    post: "UI/UX Designer",
    comment: "The design and functionality exceeded my expectations. Great work!",
    image: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    id: 5,
    name: "Maria Gomez",
    post: "Operations Head",
    comment: "Smooth experience from start to finish. Would definitely use again.",
    image: "https://randomuser.me/api/portraits/women/24.jpg"
  }
];

const CustomerCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevIndex = (currentIndex - 1 + customers.length) % customers.length;
  const nextIndex = (currentIndex + 1) % customers.length;

  const handlePrevious = () => {
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    setCurrentIndex(nextIndex);
  };

  const renderCard = (customer, type, isHiddenOnMobile = false) => {
    const comment = (
      <p className="text-gray-600 italic text-center px-4 pt-4">
        “{customer.comment}”
      </p>
    );

    const bottomSection = (
      <div className="flex items-center justify-between gap-4 px-4 py-4">
        {/* Image left */}
        <img
          src={customer.image}
          alt={customer.name}
          className="w-16 h-16 rounded-full border-4 border-primary object-cover"
        />
        {/* Name and Post right */}
        <div className="text-left">
          <h2 className="font-semibold text-lg text-gray-800">{customer.name}</h2>
          <p className="text-sm text-gray-500">{customer.post}</p>
        </div>
      </div>
    );

    const cardStyle =
      type === 'center'
        ? 'scale-100 opacity-100 blur-none z-10'
        : 'scale-95 opacity-50 blur-[2px] z-0';

    // Tailwind responsive hide class
    const responsiveClass = isHiddenOnMobile ? 'hidden md:block' : '';

    return (
      <div
        className={`card bg-base-100 shadow-md w-72 transition-all duration-300 ${cardStyle} ${responsiveClass}`}
      >
        <div className="p-8">
          <div className='pb-4'>
            {comment}
          </div>
          <div className=' border-t-2 border-gray-300 border-dashed'>
            {bottomSection}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">

      {/* image  */}
      <div>

      </div>
      {/* title & desciption  */}
      <h2 className="text-3xl font-bold text-center mb-6">What our customers are sayings</h2>
      <p className="text-center mb-10 text-gray-500">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
      </p>

      {/* Card Carousel */}
      <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
        {/* Hide on mobile, show on md+ */}
        {renderCard(customers[prevIndex], 'side', true)}
        {renderCard(customers[currentIndex], 'center')}
        {renderCard(customers[nextIndex], 'side', true)}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button className="btn btn-secondary btn-outline text-primary btn-sm" onClick={handlePrevious}>
          <FaArrowLeft className="mr-1" />
          Previous
        </button>
        <button className="btn text-primary btn-secondary btn-sm" onClick={handleNext}>
          Next
          <FaArrowRight className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default CustomerCards;
