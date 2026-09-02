
import AppProvider from './AppProvider.jsx'
import AppRoutes from './Routes/AppRoutes.jsx'
import FullScreenLoader from './features/auth/components/Loader.jsx';
import useAuthUser from './features/auth/hooks/useAuthUser.jsx';

const AppContent = () => {
  const { isLoading } = useAuthUser();

  if (isLoading) {
    return (
      <FullScreenLoader />
    )
  }

  return <AppRoutes/>
}

const App = () => {

  return (
    <>

      <AppProvider>
        <AppContent />
      </AppProvider>
    </>


  )
}

export default App
