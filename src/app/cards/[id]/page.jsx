"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const styleRandom = [
  "",
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
  const [error, setError] = useState(null);
  const [stateEdit, setStateEdit] = useState(false);
  const numbers = Math.floor(Math.random() * 5) + 1;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageSrc: "",
    imageAlt: "",
  });

  console.log('styleRandom[numbers]',styleRandom[numbers]);
  

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("carte"));
    if (result) {
      const currentData = result.find((item) => item.id === idCard);
      if (currentData) {
        setFormData({
          title: currentData.title,
          description: currentData.description,
          imageSrc: `https://doodleipsum.com/500x500/${styleRandom[numbers]}`,
          imageAlt: currentData.imageAlt,
        });
        setCard(currentData);
        setIsPending(false);
      }
    }
  }, [idCard]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      imageSrc: `https://doodleipsum.com/500x500/${styleRandom[idCard]}`,
      imageAlt: formData.imageAlt || "default alt text",
    };

    fetch(`http://localhost:8000/cards/${idCard}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((response) => response.json())
      .then((updatedCard) => {
        setCard(updatedCard);
        setStateEdit(false);
      })
      .catch((error) => console.error("Error:", error));

    setFormData(updatedFormData);
  };

  const handleDelete = () => {
    fetch(`http://localhost:8000/cards/${idCard}`, {
      method: "DELETE",
    })
      .then(() => {
        router.push("/cards");
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleEdit = () => {
    setStateEdit(true);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="max-w-sm w-1/3 mx-auto my-52 bg-gradient-to-r from-gray-00 lg:max-w-full lg:flex border border-indigo-600 rounded-md">
        <Link href="/cards">
          <ArrowLeftCircleIcon className="absolute w-10 mx-auto -mt-12 cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1" />
        </Link>
        <div className="w-full">
          <Image
            src={card.imageSrc || "/default-image.jpg"} // Default image fallback
            alt={card.imageAlt || "Card image"} // Default alt text
            width={500}
            height={500}
            priority
          />
        </div>
        <div className="p-4 flex flex-col justify-between">
          {!stateEdit ? (
            <>
              <div className="text-gray-700 font-bold text-xl mb-2">
                {card.title}
              </div>
              <p className="text-gray-500 text-base">{card.description}</p>
              <div className="py-3 sm:flex sm:flex-row sm:px-0 gap-8">
                <button
                  onClick={handleEdit}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-indigo-500 px-8 py-2 text-sm font-semibold text-white hover:bg-indigo-600 sm:mt-0 sm:w-auto"
                >
                  Editez
                </button>
                <button
                  onClick={handleDelete}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-200 px-8 py-2 text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-red-200 sm:mt-0 sm:w-auto"
                >
                  Supprimer
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Titre
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 block w-full rounded-md sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 block w-full rounded-md sm:text-sm"
                  />
                </div>
              </div>
              <div className="py-3 sm:flex sm:flex-row sm:px-0 gap-8">
                <button
                  type="submit"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-indigo-500 px-8 py-2 text-sm font-semibold text-white hover:bg-indigo-600 sm:mt-0 sm:w-auto"
                >
                  Enregistrer
                </button>
                <button
                  onClick={() => setStateEdit(false)}
                  className="mt-3 inline-flex w-full bg-gray-200 rounded-md px-8 py-2 text-sm font-semibold hover:bg-gray-300 sm:mt-0 sm:w-auto"
                >
                  Annuler
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailsProduct;
