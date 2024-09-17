// src/contexts/WallpaperContext.js
import React, { createContext, useState, useContext } from "react";
const WallpaperContext = createContext();

export const WallpaperProvider = ({ children }) => {
  const [background, setBackground] = useState("src/assets/bg1.webp");

  return (
    <WallpaperContext.Provider value={{ background, setBackground }}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = () => useContext(WallpaperContext);
