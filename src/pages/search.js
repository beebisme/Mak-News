import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

export default function Search() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");
  const [news, setnews] = useState([]);
  const inputRef = useRef(null);

  let response;

  const searchData = async (query) => {
    let url =
      "https://newsapi.org/v2/everything?" +
      `q=${query}&` +
      "from=2022-08-26&" +
      "sortBy=relevancy&" +
      "apiKey=690c1327d1ea4b3fa102008b36173342";

    try {
      response = await axios.get(url);
      let result = response.data.articles;
      setnews(result);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchData(inputData);
    }
  };

  useEffect(() => {
    document.body.addEventListener("keypress", handleKey);
  });

  return (
    <>
      <header>
        <div className="flex justify-between py-6 px-10 bg-sky-900 drop-shadow-lg">
          <button
            className="font-bold text-2xl text-sky-200"
            onClick={() => {
              navigate("/");
            }}
          >
            MAK NEWS
          </button>
        </div>
      </header>
      <main>
        <div className="flex justify-center mt-10">
          <div className="mb-3 xl:w-96">
            <form className="input-group relative flex flex-row w-full">
              <input
                type="search"
                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
                ref={inputRef}
              />
              <button
                className="btn inline-block px-6 py-2.5 bg-blue-600 rounded-r-lg text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                type="button"
                id="button-addon2"
                onClick={() => {
                  setInputData(inputRef.current.value);
                  searchData(inputData);
                }}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  className="w-4"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="mb-10">
          {news.map((item) => {
            return (
              <>
                <div
                  className="h-max md:h-40 w-3/4 py-4 mx-6 px-4 flex flex-row"
                  key={item.title}
                >
                  <img
                    src={item.urlToImage}
                    alt="images"
                    className="h-10 w-44 md:h-full"
                  />
                  <div className="ml-8 h-1/4 md:h-full">
                    <a
                      href={item.url}
                      className="text-xs md:text-lg font-bold text-slate-800 capitalize hover:text-sky-600 hover:underline underline-offset-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                    <p className="hidden md:block text-elipsis text-base text-slate-400 leading-relaxed text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </main>
    </>
  );
}
