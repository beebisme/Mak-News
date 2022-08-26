import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NewsList() {
  const [news, setnews] = useState([]);

  const getData = async () => {
    let url =
      "https://newsapi.org/v2/top-headlines?" +
      "country=id&" +
      "apiKey=690c1327d1ea4b3fa102008b36173342";

    try {
      let response = await axios.get(url);
      let result = response.data.articles;
      result = result.slice(0, 5);
      setnews(result);
      console.table(result);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 className="mx-10 my-8 px-2 border-l-4 border-sky-600 font-bold text-2xl">
        Breaking News in Indonesia
      </h1>
      <div className="mb-10">
        {news.map((item) => {
          return (
            <>
              <div className="h-max md:h-40 w-3/4 py-4 mx-6 px-4 flex flex-row">
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
    </>
  );
}
