"use client"
import React from "react";
import InfoIcon from "@/assets/svg/infoIcon";
import { useState } from "react";
import Tooltip from "../tooltip";

const ContactForm = ({ handleSubmit, handleFileChange }) => {
  // State for tracking hover state of the tooltip
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      {/* Name Input */}
      <label
        htmlFor="name"
        className="block text-sm font-semibold text-gray-800"
      >
        Name
      </label>
      <input
        autoComplete="current-name"
        id="name"
        placeholder="Your name"
        required
        type="text"
        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
      />

      {/* Email Input */}
      <label
        htmlFor="email"
        className="block text-sm font-semibold text-gray-800"
      >
        Email
      </label>
      <input
        autoComplete="current-email"
        id="email"
        placeholder="example@gmail.com"
        required
        type="email"
        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
      />

      {/* Message Input */}
      <label
        htmlFor="Message"
        className="block text-sm font-semibold text-gray-800"
      >
        Message
      </label>
      <textarea
      required
        rows="5"
        placeholder="Your Message..."
        name="Message"
        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
      ></textarea>

      {/* File Input */}
      <label
        htmlFor="media"
        className=" flex items-center text-sm font-semibold text-gray-800"
      >
        Media
        <Tooltip
          panelStyle={`bg-black px-2 py-1 rounded absolute w-[300px] `}
          show={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          buttonChildren={<InfoIcon style={`w-4 h-4 mt-[4px] ml-1`} />}
        >
          {isHovered && (
            <p className="text-white text-xs italic">
              Accepted formats: .png, .jpg, .avif, .webp, etc
            </p>
          )}
        </Tooltip>
      </label>
      <input
        type="file"
        id="media"
        accept=".png, .jpg, .avif, .webp"
        onChange={handleFileChange}
        className="block cursor-pointer w-full mt-2 border-dashed border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:border-purple-400 focus:ring focus:ring-purple-300"
      />

      <button
        type="submit"
        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600 mt-4"
      >
        Submit
      </button>
    </>
  );
};

export default ContactForm;