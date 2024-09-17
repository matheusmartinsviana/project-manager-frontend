// src/contexts/WallpaperContext.js
import React, { createContext, useContext, useState } from "react";
const WallpaperContext = createContext();

export const WallpaperProvider = ({ children }) => {
  const [background, setBackground] = useState("src/assets/backgrounds/bg1.webp");

  return (
    <WallpaperContext.Provider value={{ background, setBackground }}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = () => useContext(WallpaperContext);
