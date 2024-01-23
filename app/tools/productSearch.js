"use client";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import SearchIcon from "@/assets/svg/searchIcon";

export default function ProductSearch({ data }) {
  const [search, setSearch] = useState("");
  const [isShowing, setIsShowing] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFocus = () => {
    setIsShowing(true);
  };

  const handleBlur = () => {
    // Using a setTimeout to delay hiding the popover, allowing time for the popover to be clicked
    setTimeout(() => setIsShowing(false), 200);
  };

  const filteredItems = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="w-full absolute z-30 -top-3 md:-top-6 md:px-4 ">
      <article className="flex w-full">
        <SearchIcon style={`absolute top-3 left-2 md:left-6 text-gray-500 `} />
        <input
          value={search}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="text"
          placeholder="Search your favorite products"
          className={`border ${
            isShowing ? "none" : "rounded-b-lg"
          } bg-transparent  placeholder-gray-500 font-bold pt-2 text-xl  md:text-2xl border-gray-300 rounded-t-lg w-full py-2 pl-10  focus:border-blue-500 focus:outline-none`}
        />
      </article>
      <Transition
        show={isShowing}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <article className="bg-white border divide-y h-fit max-h-[390px]  overflow-auto cursor-pointer ">
          {filteredItems.map((item) => (
            <li
              className="flex space-x-4 bg-white hover:brightness-90 p-4 w-fit"
              key={item.id}
              onClick={() => router.push(item.Link)}
            >
              <img className="w-20 h-20 object-cover" src={item.image} />{" "}
              <article className="pl-2 overflow-hidden w-[1000px]">
                <p className="font-semibold text-xl truncate">{item.title}</p>
                <p className="border border-green-600 w-fit bg-green-100 px-4 text-green-600 font-semibold rounded">
                  In stock
                </p>
                <p className="font-semibold text-lg">
                  {((item.price / 100) * 50).toFixed(2)}$
                </p>
              </article>{" "}
            </li>
          ))}
        </article>
      </Transition>
    </section>
  );
}
