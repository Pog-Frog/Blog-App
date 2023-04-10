import Layout from '@/layouts/layout'
import type {AppProps} from 'next/app'
import {wrapper} from '@/redux/store'
import {useStore} from "react-redux"
import {PersistGate} from "redux-persist/integration/react";


function App({Component, pageProps}: AppProps) {
    const store: any = useStore();

    return (
        <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </PersistGate>
    )
}

export default wrapper.withRedux(App);
