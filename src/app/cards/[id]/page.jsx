"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const styleRandom = [
  "flat",
  "hand-drawn",
  "outline",
  "abstract",
  "avatar",
  "avatar-2",
  "avatar-3",
  "avatar-4",
  "avatar-5",
];

const DetailsProduct = ({ params }) => {
  const idCard = parseInt(params.id);
  const router = useRouter();

  const [card, setCard] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [stateEdit, setStateEdit] = useState(false);
  const [result, setResult] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageSrc: "",
    imageAlt: "",
  });

  const randomStyle =
    styleRandom[Math.floor(Math.random() * styleRandom.length)];

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("carte")) || [];
    setResult(storedData);

    const currentData = storedData.find((item) => item.id === idCard);
    if (currentData) {
      setFormData({
        title: currentData.title,
        description: currentData.description,
        imageSrc: `https://doodleipsum.com/500x500/${randomStyle}`,
        imageAlt: currentData.imageAlt || "Default Image",
      });
      setCard(currentData);
    }
    setIsPending(false);
  }, [idCard]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedResult = result.map((item) =>
      item.id === idCard ? { ...item, ...formData } : item
    );

    localStorage.setItem("carte", JSON.stringify(updatedResult));
    setResult(updatedResult);
    setCard({ ...card, ...formData });
    setStateEdit(false);
  };

  const handleDelete = () => {
    const updatedResult = result.filter((item) => item.id !== idCard);
    localStorage.setItem("carte", JSON.stringify(updatedResult));
    router.push("/cards");
  };

  const handleEdit = () => setStateEdit(true);

  if (isPending) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto sm:max-w-xl lg:max-w-4xl mt-10">
      <Link href="/cards" aria-label="Go back">
        <ArrowLeftCircleIcon
          className="w-10 text-gray-500 hover:text-gray-700 cursor-pointer transition ease-in-out delay-150  hover:-translate-x-1 mb-4"
          aria-hidden="true"
        />
      </Link>
      <div className="p-4 max-w-md mx-auto sm:max-w-xl lg:max-w-4xl bg-white rounded-lg border border-indigo-600">
        <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-6">
          <Image
            src={formData.imageSrc}
            alt={formData.imageAlt}
            width={500}
            height={500}
            className="w-full sm:w-1/2 object-cover rounded"
            onError={(e) => (e.target.src = "/default-image.jpg")}
          />
          <div className="sm:flex-1">
            {!stateEdit ? (
              <div className="h-full flex flex-col  justify-evenly">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {card.title}
                </h2>
                <p className="text-gray-600 mb-6 text-xl">{card.description}</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={handleEdit}
                    className="flex-1 p-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm sm:text-base"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 p-4 bg-red-500 text-white rounded hover:bg-red-600 text-sm sm:text-base"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="h-full flex flex-col  justify-evenly"
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block text-gray-700 font-medium"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  ></textarea>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    type="submit"
                    className="flex-1 p-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm sm:text-base"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setStateEdit(false)}
                    className="flex-1 p-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
