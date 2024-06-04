// src/components/Reviews.js
import React from 'react';

const reviews = [
  {
    name: "Shubhangi",
    title: "Customer officer",
    review: "The course is beginner friendly and I love the way instructor went through all the core topics that's amazing I highly recommend this course.",
    image: "path/to/image1.jpg",
  },
  {
    name: "Yashwant Meena",
    title: "Software engineer",
    review: "The course is amazing! I was struggling earlier to learn JS but after taking this course it felt super easy to understand the way instructor went through the topics.",
    image: "path/to/image2.jpg",
  },
  {
    name: "Lucky Arya",
    title: "App developer",
    review: "I am in 12th grade and I always wanted to develop cool web apps. I earlier learned HTML and CSS but I always struggled with JS but now it has been so much easier thanks to this course.",
    image: "path/to/image3.jpg",
  },
  {
    name: "Monica Sharma",
    title: "Back-end engineer",
    review: "JavaScript was always in my bucket list and now after completing this course I am proud to say that I am at the intermediate level of JS programming. Thanks so much for this course.",
    image: "path/to/image4.jpg",
  },
];

const Reviews = () => {
  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Reviews from our students</h2>
      <p className="mb-6 text-center">Have a look what our students have to say for our ultimate JavaScript course</p>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <div key={index} className="p-6 bg-white shadow-md rounded-lg flex items-start space-x-4">
            <img className="w-16 h-16 rounded-full object-cover" src={review.image} alt={review.name} />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold">{review.name}</h3>
                <span className="text-sm text-gray-500">({review.title})</span>
              </div>
              <p className="text-gray-700 mt-2">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
