import { ModalProvider } from './Context/useModal'
import AppRoutes from './Routes/AppRoutes'

export default function App() {
  return (
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
  )
}