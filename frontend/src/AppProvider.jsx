
import NetworkListener from './components/NetworkListener'
import useNetworkStore from './store/network.store'
import NoInternetPage from './page/NoInternetPage';
import { Toaster } from 'sonner';



const AppProvider = ({ children }) => {

  const isOnline = useNetworkStore(
    (state) => state.isOnline
  );

  return (
    <>

      <NetworkListener />

      {
        !isOnline ?
          (<NoInternetPage />)
          :
          (
            <>

              <Toaster
                position="top-right"
                expand={false}
                richColors
                closeButton
                theme="light"
              />

              {children}

            </>
          )
      }

    </>
  )
}

export default AppProvider
