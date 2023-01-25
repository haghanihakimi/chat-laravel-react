import { Head, Link } from '@inertiajs/react';
import Layout from '../Layouts/General'
import route from 'ziggy-js';
import Login from '../Pages/Login'
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../store/theme';
import { HiBars3BottomRight as Menu, HiBars3CenterLeft as OpenMenu, HiMoon as DarkMode, HiSun as LightMode } from "react-icons/hi2";
import { useState } from 'react';

export default function({}) {
    const auth = useSelector((state) => state.auth)
    const theme = useSelector((state) => state.theme.value)
    const dispatch = useDispatch()
    let [data, setData] = useState({
        menu: false,
    })

    return (
        <>
            <nav className='w-screen select-none relative z-50 px-4 md:py-2 sm:px-4 sm:py-2 border-b border-black border-opacity-10 transition duration-200 dark:border-milky-white dark:border-opacity-10'>
                <div className='w-full relative flex flex-row gap-0 justify-between items-center'>
                    {/* Logo section */}
                    <div className='w-fit h-12 shrink-0'>
                        <Link href={route('root')}
                        className='w-full h-full flex justify-center items-center my-auto font-bold tracking-wider text-lg uppercase bg-gradient-to-r from-[#1b8cee] to-warm-blue text-transparent bg-clip-text' >
                            Conversations
                        </Link>
                    </div>
                    {/* Menu section */}
                    <div className='w-fit h-fit flex flex-row gap-4 items-center '>
                        <button className='w-fit h-fit'
                        onClick={() => theme === "white" ? dispatch(setTheme('dark')) : dispatch(setTheme('white')) }>
                            {theme === 'white' ? <DarkMode className='w-7 h-7 text-black animate-fadeInBounce dark:text-milky-white' /> : <LightMode className='w-6 h-6 text-black animate-fadeInBounce dark:text-milky-white' />}
                        </button>
                        <button className='w-fit h-fit'>
                            <Menu className='w-8 h-8 text-black transition duration-200 dark:text-milky-white' />
                        </button>
                    </div>
                </div>
            </nav>
            {
                data.menu ? 
                <div className='w-full h-screen fixed z-40 top-0 right-0 max-w-lg bg-red'>
                    {/*  */}
                </div> : ''
            }
        </>
    );
} 

