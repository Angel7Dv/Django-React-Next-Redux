import '../styles/globals.css'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>)


}

export default MyApp
