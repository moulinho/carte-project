"use client";

import { useEffect, useState } from "react";
import { DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Image from "next/image";

export default function AddCard({ handleCloseModal }) {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    imageSrc: "",
    imageAlt: "",
  });

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("carte"));

    if (result) {
      const lastCard = result.length ? result[result.length - 1].id + 1 : 1;
      setFormData((prevData) => ({ ...prevData, id: lastCard }));
    }
  }, []);

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
      // id: currentId,
      ...formData,
      imageSrc: "https://doodleipsum.com/500x500/",
      imageAlt: "bonjour",
    };

    // setFormData(updatedFormData);
    const result = JSON.parse(localStorage.getItem("carte"));


    localStorage.setItem("carte", JSON.stringify([...result, updatedFormData]));

    // fetch("http://localhost:8000/cards", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updatedFormData),
    // })
    //   .then((response) => response.json())
    //   // .then((result) => console.log("Result:", result))
    //   .catch((error) => console.error("Error:", error));

    // // console.log(updatedFormData);
    // // setCurrentId(currentId + 1);
    handleCloseModal(false);
  };

  return (
    <>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <Image
                    alt="Your Company"
                    src="https://doodleipsum.com/700?i=41c9caaf4b5b46ed9eee0d4f869f5561"
                    className="mx-auto"
                    width={100}
                    height={100}
                  />
                  <h2 className="font-bold text-gray-700 text-center pt-6">
                    La créativité en carte
                  </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
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
                          type="text"
                          value={formData.description}
                          onChange={handleChange}
                          required
                          className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 block w-full rounded-md sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Ajouter
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={() => handleCloseModal(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-200 px-8 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </>
  );
}
