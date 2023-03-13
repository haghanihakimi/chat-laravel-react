import { Link, useForm, router } from '@inertiajs/react'
import route from 'ziggy-js'
import Layout from '../../Layouts/Main'
import { Disclosure } from '@headlessui/react'
import { ToastContainer, toast } from 'react-toastify';
import { 
    HiLockClosed as Lock,
    HiChevronUp as ArrowUp,
    HiPhoto as Image,
    HiOutlineEnvelope as Mail,
    HiOutlinePhone as Phone,
} from "react-icons/hi2";
import { BiMaleSign as Male, BiFemaleSign as Female } from "react-icons/bi";
import { useEffect, useState } from 'react';

export default function({user, image, flash}) {
    const {post, processing, errors, data, setData, isDirty} = useForm({
        first_name: user.firstname,
        surname: user.surname,
        username: user.username,
        email: user.email,
        phone: user.phone ? user.phone : '',
        gender: user.gender,
        privacy: user.privacy ? true : false,
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    })

    const saveSettings = () => {
        if(!processing && isDirty) {
            post(route('settings.save'), {
                preserveState: (page) => Object.keys(page.props.errors).length !== 0,
                preserveScroll: (page) => Object.keys(page.props.errors).length,
                onSuccess: (response) => {
                    if (response.props.flash.message) {
                        const notify = () => {
                            toast("Default Notification !");

                            toast.success("Success Notification !", {
                                position: toast.POSITION.TOP_CENTER
                            });
                        }
                        notify()
                    }
                }
            })
        }
    }

    useEffect(() => {
        return() =>{
        }
    })

    return(
        <>
            <Layout title={user.username} body={
                <div className="w-full h-full relative flex flex-col gap-0 z-10 select-none overflow-hidden">
                    <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    className='z-[9999999999999998999]'
                    />
                        {/* Same as */}
                    <ToastContainer />
                    <div className='w-full h-full overflow-auto relative flex flex-row gap-0 justify-center items-center'>
                        <form 
                        onSubmit={ e => { e.preventDefault();saveSettings(); } }
                        className='w-full max-w-sm h-auto bg-white flex flex-col mx-auto p-4 rounded-lg border border-black border-opacity-10 shadow-lg dark:border-milky-white dark:border-opacity-5 dark:bg-black'>
                            {/* Profile picture & name container */}
                            <div className='w-full relative flex flex-col gap-2 justify-center items-center mb-2'>
                                {/* Profile picture image */}
                                <div className='w-24 h-24 rounded-full relative mx-auto p-1 bg-white border border-black border-opacity-10 shadow-md dark:bg-dark-blue dark:border-milky-white dark:border-opacity-5'>
                                    <div className='w-full h-full relative rounded-full group'>
                                        <img 
                                        src={image[0].media_path} 
                                        alt={`${user.firstname} ${user.surname} profile picture`}
                                        className="block w-full h-full object-cover rounded-full" />
                                        <button className='w-full h-full absolute top-0 left-0 rounded-full bg-black bg-opacity-75 hidden justify-center items-center group-hover:flex'>
                                            <Image className='w-5 h-5 m-auto text-white' />
                                        </button>
                                    </div>
                                    {
                                        data.privacy
                                        ? <Lock className='w-4 h-4 absolute -bottom-[4px] left-0 right-0 mx-auto text-blue shadow-lg' />
                                        : ''
                                    }
                                </div>
                            </div>
                            {
                                flash.message && flash.message.settings_success 
                                ? <p className='w-full text-sm font-semibold text-green tracking-wide px-1 pt-6 pb-2'>
                                    {flash.message.settings_success}
                                </p> 
                                : '' 
                            }

                            {/* Names, Phone & gender container */}
                            <div className='w-full select-text flex flex-col gap-4 relative my-4'>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full justify-between items-center rounded bg-white p-2 border border-black border-opacity-10 shadow-xsm-spread text-left text-sm font-semibold tracking-wide text-black focus:outline-none dark:bg-dark-blue dark:text-milky-white dark:border-milky-white dark:border-opacity-10">
                                                <div className='flex flex-row gap-1 justify-start items-center'>
                                                    <span>
                                                        {data.first_name}
                                                        &nbsp;
                                                        {data.surname}
                                                    </span>
                                                    <span>
                                                        {
                                                            data.gender === 'male'
                                                            ? <Male className='text-base' />
                                                            : <Female className='text-base' />
                                                        }
                                                    </span>
                                                </div>
                                                <ArrowUp
                                                className={`${
                                                    open ? 'rotate-0 transform' : 'rotate-180 transform'
                                                } h-4 w-4 text-black dark:text-milky-white`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="rounded bg-white border border-black border-opacity-10 px-4 pt-4 pb-2 text-sm text-black dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10 dark:text-milky-white">
                                                <div className='w-full flex flex-col gap-1 relative'>
                                                    <label htmlFor="firstname" className='px-1 text-sm font-semibold text-black tracking-wide dark:text-milky-white'>
                                                        First Name
                                                    </label>
                                                    <input type="text" 
                                                    placeholder='First Name'
                                                    id='firstname'
                                                    value={data.first_name}
                                                    className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                    onInput={e => setData('first_name', e.target.value) } 
                                                    />
                                                    {/* Firstname Error report */}
                                                    {
                                                        errors.first_name
                                                        ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                            {errors.first_name}
                                                        </p>
                                                        : ''
                                                    }
                                                </div>
                                                <div className='w-full flex flex-col gap-1 relative'>
                                                    <label htmlFor="surname" className='text-sm px-1 font-semibold text-black tracking-wide dark:text-milky-white'>
                                                        Surname
                                                    </label>
                                                    <input type="text" 
                                                    placeholder='Surname'
                                                    id='surname'
                                                    value={data.surname}
                                                    className='w-full rounded bg-white text-black tracking-wide text-sm px-2 py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2' 
                                                    onInput={e => setData('surname', e.target.value) } 
                                                    />
                                                    {/* Surname Error report */}
                                                    {
                                                        errors.surname
                                                        ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                            {errors.surname}
                                                        </p>
                                                        : ''
                                                    }
                                                </div>
                                                <div className='w-full flex flex-col gap-1 relative'>
                                                    <label htmlFor="gender" className='px-1 text-sm font-semibold text-black tracking-wide dark:text-milky-white'>
                                                        Gender
                                                    </label>
                                                    <select 
                                                    onChange={e => { setData('gender', e.target.value) }}
                                                    value={data.gender}
                                                    name="gender" 
                                                    id="gender" 
                                                    className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'>
                                                        <option value="female">Female</option>
                                                        <option value="male">Male</option>
                                                    </select>
                                                    {/* Gender error report */}
                                                    {
                                                        errors.gender
                                                        ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                            {errors.gender}
                                                        </p>
                                                        : ''
                                                    }
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <div className="mb-[0.125rem] select-none block min-h-[1.5rem] pl-[1.5rem]">
                                    <input className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] bg-milky-white before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-warm-blue checked:bg-warm-blue checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-milky-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:bg-milky-white focus:after:content-[''] checked:focus:border-warm-blue checked:focus:bg-warm-blue checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-milky-white checked:focus:after:bg-transparent"
                                    type="checkbox"
                                    checked={data.privacy}
                                    id="privacy" 
                                    onChange={e => setData('privacy', !data.privacy)}
                                    />
                                    <label
                                    className="inline-block pl-[0.15rem] text-black text-medium font-medium tracking-wide dark:text-milky-white hover:cursor-pointer"
                                    htmlFor="privacy">
                                        Privacy
                                    </label>
                                </div>
                            </div>

                            {/* Email, privacy & password container */}
                            <div className='w-full select-text flex flex-col gap-4 relative my-4'>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full justify-between items-center rounded bg-white p-2 border border-black border-opacity-10 shadow-xsm-spread text-left text-sm font-semibold tracking-wide text-black focus:outline-none dark:bg-dark-blue dark:text-milky-white dark:border-milky-white dark:border-opacity-10">
                                                <div className='flex flex-row gap-1 justify-start items-center'>
                                                    <span>
                                                        {data.username}
                                                    </span>
                                                    &nbsp;
                                                    <span>
                                                        <Mail className='text-base' />
                                                    </span>
                                                    &nbsp;
                                                    <span>
                                                        <Phone className='text-base' />
                                                    </span>
                                                </div>
                                                <ArrowUp
                                                className={`${
                                                    open ? 'rotate-0 transform' : 'rotate-180 transform'
                                                } h-4 w-4 text-black dark:text-milky-white`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="rounded bg-white border border-black border-opacity-10 px-4 pt-4 pb-2 text-sm text-black dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10 dark:text-milky-white">
                                                <div className='w-full flex flex-col gap-1 relative'>
                                                    <label htmlFor="email_address" className='px-1 text-sm font-semibold text-black tracking-wide dark:text-milky-white'>
                                                        Email Address
                                                    </label>
                                                    <input type="email" 
                                                    placeholder='Email'
                                                    id='email_address'
                                                    value={data.email}
                                                    onInput={e => setData('email', e.target.value) }
                                                    className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                    />
                                                    {/* Email Error report */}
                                                    {
                                                        errors.email
                                                        ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                            {errors.email}
                                                        </p>
                                                        : ''
                                                    }
                                                </div>
                                                <div className='w-full flex flex-col gap-1 relative'>
                                                    <label htmlFor="username" className='text-sm px-1 font-semibold text-black tracking-wide dark:text-milky-white'>
                                                        Username
                                                    </label>
                                                    <input type="text" 
                                                    placeholder='Username'
                                                    id='username'
                                                    value={data.username}
                                                    className='w-full rounded bg-white text-black tracking-wide text-sm px-2 py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                    onInput={e => setData('username', e.target.value) } 
                                                    />
                                                    {/* Username Error report */}
                                                    {
                                                        errors.username
                                                        ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                            {errors.username}
                                                        </p>
                                                        : ''
                                                    }
                                                </div>
                                                <div className='w-full flex flex-col gap-1 relative'>
                                                    <label htmlFor="phone" className='px-1 text-sm font-semibold text-black tracking-wide dark:text-milky-white'>
                                                        Phone Number
                                                    </label>
                                                    <input type="tel" 
                                                    placeholder='Phone (Optional)'
                                                    id='phone'
                                                    value={data.phone}
                                                    onInput={e => setData('phone', e.target.value) }
                                                    className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                    />
                                                    {/* Phone error report */}
                                                    {
                                                        errors.phone
                                                        ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                            {errors.phone}
                                                        </p>
                                                        : ''
                                                    }
                                                </div>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <div className='w-full flex flex-col gap-1 relative'>
                                    <Disclosure>
                                        {({ open }) => (
                                            <>
                                                <Disclosure.Button className="flex w-full justify-between items-center rounded bg-white p-2 border border-black border-opacity-10 shadow-xsm-spread text-left text-sm font-semibold tracking-wide text-black focus:outline-none dark:bg-dark-blue dark:text-milky-white dark:border-milky-white dark:border-opacity-10">
                                                    <span>Change Password</span>
                                                    <ArrowUp
                                                    className={`${
                                                        open ? 'rotate-0 transform' : 'rotate-180 transform'
                                                    } h-4 w-4 text-black dark:text-milky-white`}
                                                    />
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="rounded bg-white border border-black border-opacity-10 px-4 pt-4 pb-2 text-sm text-black dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10 dark:text-milky-white">
                                                    <div className='w-full flex flex-col gap-2 relative'>
                                                        <label htmlFor="current_password" className='px-1 text-sm font-semibold text-black tracking-wide dark:text-milky-white'>
                                                            Current Password
                                                        </label>
                                                        <input type="password" 
                                                        placeholder='Current Password'
                                                        id='current_password'
                                                        autoComplete='false'
                                                        value={data.current_password}
                                                        onInput={e => setData('current_password', e.target.value) }
                                                        className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                        />
                                                        {/* Current Password Error report */}
                                                        {
                                                            errors.current_password
                                                            ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                                {errors.current_password}
                                                            </p>
                                                            : ''
                                                        }
                                                        <label htmlFor="password" className='px-1 text-sm font-semibold text-black tracking-wide dark:text-milky-white'>
                                                            New Password
                                                        </label>
                                                        <input type="password" 
                                                        placeholder='New Password'
                                                        id='password'
                                                        autoComplete='false'
                                                        value={data.new_password}
                                                        onInput={e => setData('new_password', e.target.value) }
                                                        className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                        />
                                                        {/* New Password Error report */}
                                                        {
                                                            errors.new_password
                                                            ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                                {errors.new_password}
                                                            </p>
                                                            : ''
                                                        }
                                                        <label htmlFor="confirm_password" className='px-1 text-sm font-semibold text-black tracking-wide dark:text-milky-white'>
                                                            Confirm Password
                                                        </label>
                                                        <input type="password" 
                                                        placeholder='Confirm Password'
                                                        id='confirm_password'
                                                        autoComplete='false'
                                                        value={data.new_password_confirmation}
                                                        onInput={e => setData('new_password_confirmation', e.target.value) }
                                                        className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                        />
                                                        <Link href='' className='w-fit block px-2 py-1 text-blue text-sm font-semibold tracking-wide'>
                                                            Forgot your password?
                                                        </Link>
                                                        {/* Confirm Password Error report */}
                                                        {
                                                            errors.new_password_confirmation
                                                            ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                                {errors.new_password_confirmation}
                                                            </p>
                                                            : ''
                                                        }
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>
                            </div>

                            <button type='submit'
                            disabled={!isDirty && processing}
                            className={`w-full rounded ${isDirty ? 'bg-warm-blue hover:bg-blue' : 'bg-warm-blue bg-opacity-20 hover:bg-blue hover:bg-opacity-20'} text-base tracking-wide font-medium text-white px-4 py-2 transition duration-150`}>
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            } />
        </>
    )
}