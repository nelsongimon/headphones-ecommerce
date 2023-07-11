import '@/styles/globals.css';
import { Layout } from '@/components';
import { StateProvider } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <StateProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  )
}
