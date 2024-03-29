import { Link, useForm } from '@inertiajs/react';
import Layout from '../../Layouts/General'
import route from 'ziggy-js';
import { HiCheckCircle as Checkbox } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { setAuth } from '../../store/reducers/auth';


export default function({flash}) {
    const dispatch = useDispatch()
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        surname: '',
        username: '',
        email: '',
        password: '',
        gender: 'female'
    })

    const register = () => {
        if (!processing) {
            post(route('account.create'), {
                onSuccess: () => {
                    // dispatch(setAuth('login'))
                }
            })
        }
    }

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
                                            Brings people together.
                                        </span>
                                    </h2>
                                    <p className='w-full text-base text-black text-opacity-75 font-medium tracking-wide dark:text-milky-white dark:text-opacity-75 pl-7'>
                                        Get closer to your friends, no matter where they are.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full max-w-[480px] mb-12 md:mb-0 px-4">
                                <form method='post' onSubmit={ e => { e.preventDefault();register(); } }>
                                    {
                                        flash && flash.message
                                        ? <p className='text-sm text-red tracking-wide font-semibold px-1 py-2 dark:text-orange'>
                                            {flash.message}
                                        </p>
                                        : ''
                                    }
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
                                                value={data.first_name}
                                                placeholder="First Name"
                                                spellCheck="false"
                                                autoFocus
                                                autoComplete="true"
                                                onInput={e => { setData('first_name', e.target.value) } } />
                                                {
                                                    errors.first_name
                                                    ? <p className='text-sm text-red tracking-wide font-semibold px-1 py-2 dark:text-orange'>
                                                        {errors.first_name}
                                                    </p>
                                                    : ''
                                                }
                                            </div>
                                            <div className="w-full shink-0 relative min-w-[160px] flex-1">
                                                <input
                                                type="text"
                                                value={data.surname}
                                                className="w-full min-h-[45px] max-h-[45px] p-2 rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10"
                                                placeholder="Surname"
                                                spellCheck="false"
                                                autoComplete="false"
                                                onInput={e => setData('surname', e.target.value) }
                                                />
                                                {
                                                    errors.surname
                                                    ? <p className='text-sm text-red tracking-wide font-semibold px-1 py-2 dark:text-orange'>
                                                        {errors.surname}
                                                    </p>
                                                    : ''
                                                }
                                            </div>
                                        </div>

                                        <div className='w-full flex flex-row flex-wrap gap-4'>
                                            {/* Email & Password inputs */}
                                            <div className="w-full shink-0 relative min-w-[160px] flex-1">
                                                <input
                                                type="email"
                                                className="w-full min-h-[45px] max-h-[45px] p-2 rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10"
                                                value={data.email}
                                                placeholder="Email"
                                                spellCheck="false"
                                                autoComplete="true"
                                                onInput={e => { setData('email', e.target.value) } } />
                                                {
                                                    errors.email
                                                    ? <p className='text-sm text-red tracking-wide font-semibold px-1 py-2 dark:text-orange'>
                                                        {errors.email}
                                                    </p>
                                                    : ''
                                                }
                                            </div>
                                            <div className="w-full shink-0 relative min-w-[160px] flex-1">
                                                <input
                                                type="password"
                                                className="w-full min-h-[45px] max-h-[45px] p-2 rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10"
                                                value={data.password}
                                                placeholder="Password"
                                                spellCheck="false"
                                                autoComplete="false"
                                                onInput={e => { setData('password', e.target.value) } }
                                                />
                                                {
                                                    errors.password
                                                    ? <p className='text-sm text-red tracking-wide font-semibold px-1 py-2 dark:text-orange'>
                                                        {errors.password}
                                                    </p>
                                                    : ''
                                                }
                                            </div>
                                        </div>

                                        {/* Username & Gender inputs */}
                                        <div className="relative">
                                            <input
                                            type="text"
                                            className="w-full min-h-[45px] max-h-[45px] p-2 rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10"
                                            value={data.username}
                                            placeholder="Username"
                                            spellCheck="false"
                                            autoComplete="true"
                                            onInput={ e => { setData('username', e.target.value) } } 
                                            />
                                            {
                                                errors.username
                                                ? <p className='text-sm text-red tracking-wide font-semibold px-1 py-2 dark:text-orange'>
                                                    {errors.username}
                                                </p>
                                                : ''
                                            }
                                        </div>
                                        <div className="relative">
                                            <select 
                                            onChange={ e => { setData('gender', e.target.value) } }
                                            className="w-full min-h-[45px] max-h-[45px] p-2 capitalize cursor-pointer rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10">
                                                <option value="female">female</option>
                                                <option value="male">male</option>
                                            </select>
                                            {
                                                errors.gender
                                                ? <p className='text-sm text-red tracking-wide font-semibold px-1 py-2 dark:text-orange'>
                                                    {errors.gender}
                                                </p>
                                                : ''
                                            }
                                        </div>

                                        <div className="text-center lg:text-left">
                                            <button
                                            type="submit"
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