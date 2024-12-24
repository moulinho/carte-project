"use client";

import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import AddCard from "../components/addCard";
import { useEffect, useState } from "react";

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

export default function CardView() {
  const [open, setOpen] = useState(false);
  const [cards, setcards] = useState(null);

  const [isPending, setIsPending] = useState(true);

  const [error, setError] = useState(null);

  const getCards = () => {
    fetch("http://localhost:8000/cards")
      .then((resultat) => resultat.json())
      .then((data) => {
        setcards(data);
        isPending(false);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    getCards();
  }, [open]);

  const handleCloseModal = (state) => {
    // console.log("state",state);
    setOpen(state);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between ">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Donnez vie a vos messages
          </h2>
          <button
            onClick={() => setOpen(!open)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-md"
          >
            Button
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {cards ? (
            <>
              {cards.map((card, index) => (
                <div key={card.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Image
                      alt={card.imageAlt}
                      src={`${card.imageSrc}?${styleRandom[index]}`}
                      className=""
                      width={500}
                      height={300}
                      priority
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="font-bold text-md text-gray-700">
                        <Link href={"cards/" + card.id}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {card.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {card.description}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {/* {card.price} */}
                    </p>
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <AddCard handleCloseModal={handleCloseModal} />
      </Dialog>
    </div>
  );
}
