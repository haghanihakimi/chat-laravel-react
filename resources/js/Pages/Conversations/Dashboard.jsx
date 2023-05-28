import Layout from '../../Layouts/Main'
import moment from 'moment'

export default function({auth}) {

    return (
        <>
            <Layout title='Dashboard' moment={moment} auth={auth} body={
                <div className='w-full h-screen flex justify-center items-center relative z-10'>
                    <h1 className='w-fit text-xl text-black text-opacity-75 font-semibold tracking-wider dark:text-milky-white dark:text-opacity-75 m-auto'>
                        Select a chat or start a new conversation...
                    </h1>
                </div>
            }/>
        </>
    )
}