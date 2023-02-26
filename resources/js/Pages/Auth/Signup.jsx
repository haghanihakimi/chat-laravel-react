import { Head, Link } from '@inertiajs/react';
import Layout from '../../Layouts/General'
import route from 'ziggy-js';
import { useSelector, useDispatch } from 'react-redux';
import { setForm } from '../../store/registration';
import { HiCheckCircle as Checkbox } from "react-icons/hi";


export default function({}) {
    const formInputs = useSelector((state) => state.registration.form);
    const dispatch = useDispatch()

    return (
        <Layout title={'Sign Up'} body={
            <>
                <section className="w-full max-w-6xl m-auto select-none xxxl:translate-y-[50%] xxl:translate-y-[50%] xl:translate-y-[50%] lg:translate-y-[15%] md:translate-y-[5%] sm:translate-y-[5%] xs:translate-y-[5%] xxs:translate-y-[5%]">
                    <div className="h-full">
                        <div className="gap-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                            <div className="flex flex-col gap-8 justify-center shrink-1 mb-12 grow-0 basis-auto px-6 xxxl:flex xxl:flex xl:flex lg:flex md:hidden sm:hidden sm:hidden xs:hidden xxs:hidden">
                                <div className='w-full shrink-0 relative flex flex-col gap-2'>
                                    <h2 className='w-full relative text-black font-bold tracking-wider text-xl flex flex-row gap-2 justify-start items-center dark:text-milky-white'>
                                        <span className='inline-block w-fit h-fit rounded-full bg-white p-0 m-0 border-0 outline-none'>
                                            <Checkbox className='w-5 h-5 rounded-full text-warm-blue' />
                                        </span>
                                        <span className='inline-block w-fit'>
                                            Get started quickly
                                        </span>
                                    </h2>
                                    <p className='w-full text-base text-black text-opacity-75 font-medium tracking-wide dark:text-milky-white dark:text-opacity-75 pl-7'>
                                        Integrate with developer-friendly APIs or choose low-code.
                                    </p>
                                </div>
                                <div className='w-full shrink-0 relative flex flex-col gap-2'>
                                    <h2 className='w-full relative text-black font-bold tracking-wider text-xl flex flex-row gap-2 justify-start items-center dark:text-milky-white'>
                                        <span className='inline-block w-fit h-fit rounded-full bg-white p-0 m-0 border-0 outline-none'>
                                            <Checkbox className='w-5 h-5 rounded-full text-warm-blue' />
                                        </span>
                                        <span className='inline-block w-fit'>
                                            Support any business model
                                        </span>
                                    </h2>
                                    <p className='w-full text-base text-black text-opacity-75 font-medium tracking-wide dark:text-milky-white dark:text-opacity-75 pl-7'>
                                        Host code that you don't want to share with the world in private.
                                    </p>
                                </div>
                                <div className='w-full shrink-0 relative flex flex-col gap-2'>
                                    <h2 className='w-full relative text-black font-bold tracking-wider text-xl flex flex-row gap-2 justify-start items-center dark:text-milky-white'>
                                        <span className='inline-block w-fit h-fit rounded-full bg-white p-0 m-0 border-0 outline-none'>
                                            <Checkbox className='w-5 h-5 rounded-full text-warm-blue' />
                                        </span>
                                        <span className='inline-block w-fit'>
                                            Millions of active users
                                        </span>
                                    </h2>
                                    <p className='w-full text-base text-black text-opacity-75 font-medium tracking-wide dark:text-milky-white dark:text-opacity-75 pl-7'>
                                        Millions of monthly active users
                                    </p>
                                </div>
                            </div>
                            <div className="w-full max-w-[480px] mb-12 md:mb-0 px-4">
                                <form method='post'>
                                    <div className="my-4 mb-10 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-black before:border-opacity-30 before:dark:border-milky-white before:dark:border-opacity-30 after:mt-0.5 after:flex-1 after:border-t after:border-black after:border-opacity-30 after:dark:border-milky-white after:dark:border-opacity-30">
                                        <p className="mx-4 mb-0 text-black text-center text-base tracking-wider font-semibold dark:text-milky-white">
                                            Create Account
                                        </p>
                                    </div>

                                    <div className='w-full flex flex-col gap-4'>
                                        <div className='w-full flex flex-row flex-wrap gap-4'>
                                            {/* Name inputs */}
                                            <div className="w-full shink-0 relative min-w-[160px] flex-1">
                                                <input
                                                type="text"
                                                className="w-full min-w-[160px] min-h-[45px] max-h-[45px] p-2 rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10"
                                                id="firstname"
                                                value={formInputs.fname}
                                                placeholder="First Name"
                                                spellCheck="false"
                                                autoFocus
                                                autoComplete="true"
                                                onInput={e => dispatch(setForm({ input: 'fname', entry: e.target.value })) } />
                                            </div>
                                            <div className="w-full shink-0 relative min-w-[160px] flex-1">
                                                <input
                                                type="text"
                                                value={formInputs.sname}
                                                className="w-full min-h-[45px] max-h-[45px] p-2 rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10"
                                                placeholder="Surname"
                                                spellCheck="false"
                                                autoComplete="false"
                                                onInput={e => dispatch(setForm({ input: 'sname', entry: e.target.value })) }
                                                />
                                            </div>
                                        </div>

                                        <div className='w-full flex flex-row flex-wrap gap-4'>
                                            {/* Email & Password inputs */}
                                            <div className="w-full shink-0 relative min-w-[160px] flex-1">
                                                <input
                                                type="email"
                                                className="w-full min-h-[45px] max-h-[45px] p-2 rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10"
                                                value={formInputs.email}
                                                placeholder="Email"
                                                spellCheck="false"
                                                autoFocus
                                                autoComplete="true"
                                                onInput={e => dispatch(setForm({ input: 'email', entry: e.target.value })) } />
                                            </div>
                                            <div className="w-full shink-0 relative min-w-[160px] flex-1">
                                                <input
                                                type="password"
                                                className="w-full min-h-[45px] max-h-[45px] p-2 rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10"
                                                value={formInputs.password}
                                                placeholder="Password"
                                                spellCheck="false"
                                                autoComplete="false"
                                                onInput={e => dispatch(setForm({ input: 'password', entry: e.target.value })) }
                                                />
                                            </div>
                                        </div>

                                        {/* Username & Gender inputs */}
                                        <div className="relative">
                                            <input
                                            type="text"
                                            className="w-full min-h-[45px] max-h-[45px] p-2 rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10"
                                            value={formInputs.username}
                                            placeholder="Username"
                                            spellCheck="false"
                                            autoFocus
                                            autoComplete="true"
                                            onInput={ e => dispatch(setForm({ input: 'username', entry: e.target.value })) } />
                                        </div>
                                        <div className="relative">
                                            <select 
                                            onChange={ e => dispatch(setForm({ input: 'gender', entry: e.target.value })) }
                                            className="w-full min-h-[45px] max-h-[45px] p-2 capitalize cursor-pointer rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10">
                                                <option value="female">female</option>
                                                <option value="male">male</option>
                                            </select>
                                        </div>

                                        <div className="text-center lg:text-left">
                                            <button
                                            onClick={() => nextLevel()}
                                            type="button"
                                            className="group inline-flex justify-center items-center gap-0 rounded text-base font-semibold tracking-wider text-white bg-warm-blue px-7 pt-3 pb-2.5 text-sm   uppercase leading-normal text-milky-white shadow-lg transition duration-150 ease-in-out hover:bg-blue">
                                                Sign Up
                                            </button>
                                            <p className="mt-4 mb-0 pt-1 text-sm font-semibold text-black text-black dark:text-milky-white tracking-wider">
                                                You already registered?
                                                <Link
                                                href={route('login')}
                                                className="text-warm-blue px-1 text-sm font-semibold tracking-wider transition duration-150 ease-in-out hover:text-blue">
                                                    Login
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        }/>
  );
} 