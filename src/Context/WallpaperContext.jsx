// src/contexts/WallpaperContext.js
import React, { createContext, useContext, useState } from "react";
const WallpaperContext = createContext();
import bg1 from "../assets/backgrounds/bg1.webp";

export const WallpaperProvider = ({ children }) => {
  const [background, setBackground] = useState(bg1);

  return (
    <WallpaperContext.Provider value={{ background, setBackground }}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = () => useContext(WallpaperContext);
