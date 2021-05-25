import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles/main.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
