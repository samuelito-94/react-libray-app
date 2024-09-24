import React from "react";
import { ExploreTopBooks } from "./components/ExploreTopBooks";
import { Carousel } from "./components/Carousel";
import { Hero } from "./components/Hero";
import { LibraryServices } from "./components/LibraryServices";

export const HomePage = () => {
    return (
        <>
          <ExploreTopBooks />
          <Carousel />
          <Hero />
          <LibraryServices />
        </>
      );
}