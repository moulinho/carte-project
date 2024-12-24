import Image from "next/image";
import Link from "next/link";
import Creative_writing from "/public/Creative_writing.gif";

export default function Home() {
  return (
    <div className="mx-auto  my-48 lg:w-full lg:max-w-md lg:flex-shrink-0">
      <div className="rounded-2xl bg-gray-50 py-10  ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
        <div className="mx-auto max-w-xs">
          <Image
            src={Creative_writing}
            alt="Creative"
            width={300}
            height={300}
          />
          <p className="mt-6  items-baseline justify-center gap-x-2  text-2xl text-gray-700">
            Laissez libre cours à votre imagination et faites passer vos
            messages de manière{" "}
          </p>
          <p className="text-3xl text-center font-bold  text-gray-900">
            inoubliable !
          </p>
          <Link
            href="/cards"
            className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Creez
          </Link>
        </div>
      </div>
    </div>
  );
}
