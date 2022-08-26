import React from "react";
import Navbar from "../components/Navbar";
import NewsList from "../components/NewsList";

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <NewsList />
      </main>
      <footer></footer>
    </>
  );
}
