import { ModalProvider } from "./Context/useModal";
import { WallpaperProvider } from "./Context/WallpaperContext";
import AppRoutes from "./Routes/AppRoutes";

export default function App() {
  return (
    <WallpaperProvider>
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
    </WallpaperProvider>
  );
}
