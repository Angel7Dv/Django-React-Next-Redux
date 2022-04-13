import '../styles/globals.css'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> titulo front _app</title>
      </Head>
      <Component {...pageProps} />
    </Provider>)


}

export default MyApp
