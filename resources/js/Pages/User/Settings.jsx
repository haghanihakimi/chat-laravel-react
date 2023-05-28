import { Link, useForm } from '@inertiajs/react'
import route from 'ziggy-js'
import Layout from '../../Layouts/Main'
import { Disclosure } from '@headlessui/react'
import { 
    HiLockClosed as Lock,
    HiChevronUp as ArrowUp,
    HiPhoto as Image,
    HiOutlineEnvelope as Mail,
    HiOutlinePhone as Phone,
    HiUser as User,
} from "react-icons/hi2";
import moment from 'moment';
import { BiMaleSign as Male, BiFemaleSign as Female } from "react-icons/bi";
import Loading from '../../Partials/Loading';
import { createRef, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default ({user, auth, image, flash}) => {
    const [data, setData] = useState({
        alertVisible: false,
    })
    const imageFile = useRef(null)
    // A form to save first name, surname and gender
    const {data: data1, setData: setData1, patch: patch1, processing: processing1, errors: errors1, isDirty: isDirty1} = useForm({
        first_name: user.first_name,
        surname: user.surname,
        gender: user.gender,
    })
    // A form to save email, username, privacy and phone number
    const {data: data2, setData: setData2, patch: patch2, processing: processing2, errors: errors2, isDirty: isDirty2} = useForm({
        username: user.username,
        email: user.email,
        phone: user.phone ? user.phone : '',
        privacy: user.privacy ? true : false,
    })
    // A form to save new password
    const {data: data3, setData: setData3, patch: patch3, processing: processing3, errors: errors3, isDirty: isDirty3} = useForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    })
    // A form to send reset password link
    const {patch: patch4, processing: processing4, errors: errors4} = useForm({})
    // A form to change profile image
    const {data: data5, setData: setData5, post: post5, processing: processing5, errors: errors5} = useForm({
        imageFile: null,
        save: false
    })

    // Submit form to save changes for first name, surname and gender
    const submitForm1 = () => {
        if(!processing1 && isDirty1) {
            patch1(route('settings.save.names'), {
                preserveState: (page) => Object.keys(page.props.errors).length !== 0,
                preserveScroll: (page) => Object.keys(page.props.errors).length,
                onSuccess: (response) => {
                }
            })
        }
    }
    // Submit form to save changes for email, username, phone and privacy
    const submitForm2 = () => {
        if(!processing2 && isDirty2) {
            patch2(route('settings.save.email'), {
                preserveState: (page) => Object.keys(page.props.errors).length !== 0,
                preserveScroll: (page) => Object.keys(page.props.errors).length,
                onSuccess: (response) => {
                }
            })
        }
    }
    // Submit form to save changes for email, username, phone and privacy
    const submitForm3 = () => {
        if(!processing3 && isDirty3) {
            patch3(route('settings.save.password'), {
                preserveState: (page) => Object.keys(page.props.errors).length !== 0,
                preserveScroll: (page) => Object.keys(page.props.errors).length,
                onSuccess: (response) => {}
            })
        }
    }
    // Submit form to send reset password link to the current user's email
    const sendResetPasswordLink = () => {
        if(!processing4) {
            patch4(route('password.email'), {
                preserveState: (page) => Object.keys(page.props.errors).length !== 0,
                preserveScroll: (page) => Object.keys(page.props.errors).length !== 0,
                onSuccess: (response) => {
                    toast.success("Reset password link successfully sent to your emaill.");
                    setData({
                        alertVisible: false,
                    })
                }
            })
        }
    }
    // submit form to upload new image and update profile image
    const upateProfileImage = () => {
        if(!processing5) {
            post5(route('change.profile.image'), {
                preserveState: (page) => Object.keys(page.props.errors).length !== 0,
                preserveScroll: (page) => Object.keys(page.props.errors).length !== 0,
                onSuccess: (response) => {
                    toast.success("Profile image successfully updated.");
                }
            })
        }
    }

    return(
        <>
            <Layout title={user.username} moment={moment} auth={auth} body={
                <div className="w-full h-full relative flex flex-col gap-0 z-10 select-none overflow-hidden">
                    <div className='w-full h-full overflow-auto relative flex flex-row gap-0 justify-center items-center'>
                        <div className='w-full max-w-sm h-auto bg-white flex flex-col mx-auto p-4 rounded-lg border border-black border-opacity-10 shadow-lg dark:border-milky-white dark:border-opacity-5 dark:bg-black'>
                            {/* Profile picture & name container */}
                            <div className='w-full relative flex flex-col gap-2 justify-center items-center mb-4'>
                                {/* Profile picture image */}
                                <div className='w-24 h-24 rounded-full relative mx-auto p-1 bg-white border border-black border-opacity-10 shadow-md dark:bg-dark-blue dark:border-milky-white dark:border-opacity-5'>
                                    <div className='w-full h-full relative rounded-full group flex flex-col justify-center items-center'>
                                        {
                                            image[0]
                                            ?
                                            <img 
                                            src={image[0].media_path} 
                                            alt={`${user.firstname} ${user.surname} profile picture`}
                                            className="block w-full h-full object-cover rounded-full" />
                                            : <User className='w-16 h-16 m-auto text-blue' />
                                        }
                                        <button onClick={() => {imageFile.current.click()}} className='w-full h-full absolute top-0 left-0 rounded-full bg-black bg-opacity-75 hidden justify-center items-center group-hover:flex'>
                                            <Image className='w-5 h-5 m-auto text-white' />
                                        </button>
                                    </div>
                                    {
                                        data2.privacy
                                        ? <Lock className='w-4 h-4 absolute -bottom-[4px] left-0 right-0 mx-auto text-blue shadow-lg' />
                                        : ''
                                    }
                                </div>
                                <input type="file" 
                                ref={imageFile} 
                                accept='.jpg,.png,.jpeg,.webp' 
                                className='hidden invisible opacity-0'
                                onChange={ e => { setData5({'imageFile': e.target.files[0], 'save': true}) } } />
                                {
                                    data5.save
                                    ? <button 
                                    onClick={upateProfileImage}
                                    className='w-fit block p-1 rounded text-blue font-semibold tracking-wide text-sm'>
                                        Save
                                    </button>
                                    : ''
                                }
                            </div>

                            {/* first name, surname & gender container */}
                            <div className='w-full select-text flex flex-col gap-4 relative my-2'>
                                {
                                    flash.message && flash.message.settings_names 
                                    ? <p 
                                    className='w-full text-sm font-semibold text-green tracking-wide px-1 p-2'>
                                        {flash.message.settings_names}
                                    </p> 
                                    : '' 
                                }
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex select-none w-full justify-between items-center rounded bg-white p-2 border border-black border-opacity-10 shadow-xsm-spread text-left text-sm font-semibold tracking-wide text-black focus:outline-none dark:bg-dark-blue dark:text-milky-white dark:border-milky-white dark:border-opacity-10">
                                                <div className='flex flex-row gap-1 justify-start items-center'>
                                                    <span>
                                                        {data1.first_name}
                                                        &nbsp;
                                                        {data1.surname}
                                                    </span>
                                                    <span>
                                                        {
                                                            data1.gender === 'male'
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
                                            <Disclosure.Panel className="flex select-none flex-col gap-2 rounded bg-white border border-black border-opacity-10 px-4 pt-4 pb-2 text-sm text-black dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10 dark:text-milky-white">
                                                <form action="post" className='w-full select-none flex flex-col gap-2' onSubmit={e => { e.preventDefault();submitForm1(); }}>
                                                    <div className='w-full flex flex-col gap-1 relative'>
                                                        <label htmlFor="firstname" className='px-1 text-sm font-semibold text-black tracking-wide dark:text-milky-white'>
                                                            First Name
                                                        </label>
                                                        <input type="text" 
                                                        placeholder='First Name'
                                                        id='firstname'
                                                        value={data1.first_name}
                                                        className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                        onInput={e => setData1('first_name', e.target.value) } 
                                                        />
                                                        {/* Firstname Error report */}
                                                        {
                                                            errors1.first_name
                                                            ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                                {errors1.first_name}
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
                                                        value={data1.surname}
                                                        className='w-full rounded bg-white text-black tracking-wide text-sm px-2 py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2' 
                                                        onInput={e => setData1('surname', e.target.value) } 
                                                        />
                                                        {/* Surname Error report */}
                                                        {
                                                            errors1.surname
                                                            ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                                {errors1.surname}
                                                            </p>
                                                            : ''
                                                        }
                                                    </div>
                                                    <div className='w-full flex flex-col gap-1 relative'>
                                                        <label htmlFor="gender" className='px-1 text-sm font-semibold text-black tracking-wide dark:text-milky-white'>
                                                            Gender
                                                        </label>
                                                        <select 
                                                        onChange={e => { setData1('gender', e.target.value) }}
                                                        value={data1.gender}
                                                        name="gender" 
                                                        id="gender" 
                                                        className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'>
                                                            <option value="female">Female</option>
                                                            <option value="male">Male</option>
                                                        </select>
                                                        {/* Gender error report */}
                                                        {
                                                            errors1.gender
                                                            ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                                {errors1.gender}
                                                            </p>
                                                            : ''
                                                        }
                                                    </div>
                                                    {
                                                        isDirty1 && !processing1
                                                        ? <button type='submit'
                                                        className={`w-fit mr-0 right-0 float-right rounded text-sm tracking-wide font-semibold text-blue hover:text-warm-blue px-2 py-1 transition duration-150`}>
                                                            Save
                                                        </button>
                                                        : ''
                                                    }
                                                </form>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>

                            {/* Email, username, privacy & phone container */}
                            <div className='w-full select-text flex flex-col gap-4 relative my-2'>
                                {
                                    flash.message && flash.message.settings_email 
                                    ? <p 
                                    className='w-full text-sm font-semibold text-green tracking-wide px-1 p-2'>
                                        {flash.message.settings_email}
                                    </p> 
                                    : '' 
                                }
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full select-none justify-between items-center rounded bg-white p-2 border border-black border-opacity-10 shadow-xsm-spread text-left text-sm font-semibold tracking-wide text-black focus:outline-none dark:bg-dark-blue dark:text-milky-white dark:border-milky-white dark:border-opacity-10">
                                                <div className='flex flex-row gap-1 justify-start items-center'>
                                                    <span>
                                                        {data2.username}
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
                                            <Disclosure.Panel className="rounded select-none bg-white border border-black border-opacity-10 px-4 pt-4 pb-2 text-sm text-black dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10 dark:text-milky-white">
                                                <form action="post" className='flex select-none flex-col gap-2 w-full relative w-full' onSubmit={e => { e.preventDefault();submitForm2() }}>
                                                    <div className='w-full flex flex-col gap-1 relative'>
                                                        <label htmlFor="email_address" className='px-1 text-sm font-semibold text-black tracking-wide dark:text-milky-white'>
                                                            Email Address
                                                        </label>
                                                        <input type="email" 
                                                        placeholder='Email'
                                                        id='email_address'
                                                        value={data2.email}
                                                        onInput={e => setData2('email', e.target.value) }
                                                        className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                        />
                                                        {/* Email Error report */}
                                                        {
                                                            errors2.email
                                                            ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                                {errors2.email}
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
                                                        value={data2.username}
                                                        className='w-full rounded bg-white text-black tracking-wide text-sm px-2 py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                        onInput={e => setData2('username', e.target.value) } 
                                                        />
                                                        {/* Username Error report */}
                                                        {
                                                            errors2.username
                                                            ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                                {errors2.username}
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
                                                        value={data2.phone}
                                                        onInput={e => setData2('phone', e.target.value) }
                                                        className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                        />
                                                        {/* Phone error report */}
                                                        {
                                                            errors2.phone
                                                            ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                                {errors2.phone}
                                                            </p>
                                                            : ''
                                                        }
                                                    </div>
                                                    <div className="mb-[0.125rem] select-none block min-h-[1.5rem] pl-[1.5rem]">
                                                        <input className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] bg-milky-white before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-warm-blue checked:bg-warm-blue checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-milky-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:bg-milky-white focus:after:content-[''] checked:focus:border-warm-blue checked:focus:bg-warm-blue checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-milky-white checked:focus:after:bg-transparent"
                                                        type="checkbox"
                                                        checked={data2.privacy}
                                                        id="privacy" 
                                                        onChange={e => setData2('privacy', !data2.privacy)}
                                                        />
                                                        <label
                                                        className="inline-block pl-[0.15rem] text-black text-medium font-medium tracking-wide dark:text-milky-white hover:cursor-pointer"
                                                        htmlFor="privacy">
                                                            Privacy
                                                        </label>
                                                    </div>
                                                    {
                                                        isDirty2 && !processing2
                                                        ? <button type='submit'
                                                        className={`w-fit mr-0 right-0 float-right rounded text-sm tracking-wide font-semibold text-blue hover:text-warm-blue px-2 py-1 transition duration-150`}>
                                                            Save
                                                        </button>
                                                        : ''
                                                    }
                                                </form>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>

                            {/* New password fields container */}
                            <div className='w-full select-text flex flex-col gap-4 relative my-2'>
                                {
                                    flash.message && flash.message.settings_password 
                                    ? <p 
                                    className='w-full text-sm font-semibold text-green tracking-wide px-1 p-2'>
                                        {flash.message.settings_password}
                                    </p> 
                                    : '' 
                                }
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full select-none justify-between items-center rounded bg-white p-2 border border-black border-opacity-10 shadow-xsm-spread text-left text-sm font-semibold tracking-wide text-black focus:outline-none dark:bg-dark-blue dark:text-milky-white dark:border-milky-white dark:border-opacity-10">
                                                <span>Change Password</span>
                                                <ArrowUp
                                                className={`${
                                                    open ? 'rotate-0 transform' : 'rotate-180 transform'
                                                } h-4 w-4 text-black dark:text-milky-white`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="rounded select-none bg-white border border-black border-opacity-10 px-4 pt-4 pb-2 text-sm text-black dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10 dark:text-milky-white">
                                                <form action="post" className='flex flex-col gap-2 w-full relative w-full' onSubmit={e => { e.preventDefault();submitForm3(); }}>
                                                    <label htmlFor="current_password" className='px-1 text-sm font-semibold text-black tracking-wide dark:text-milky-white'>
                                                        Current Password
                                                    </label>
                                                    <input type="password" 
                                                    placeholder='Current Password'
                                                    id='current_password'
                                                    autoComplete='false'
                                                    value={data3.current_password}
                                                    onInput={e => setData3('current_password', e.target.value) }
                                                    className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                    />
                                                    {/* Current Password Error report */}
                                                    {
                                                        errors3.current_password
                                                        ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                            {errors3.current_password}
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
                                                    value={data3.new_password}
                                                    onInput={e => setData3('new_password', e.target.value) }
                                                    className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                    />
                                                    {/* New Password Error report */}
                                                    {
                                                        errors3.new_password
                                                        ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                            {errors3.new_password}
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
                                                    value={data3.new_password_confirmation}
                                                    onInput={e => setData3('new_password_confirmation', e.target.value) }
                                                    className='w-full rounded bg-white text-black text-sm px-2 tracking-wide py-2 outline-none border border-black border-opacity-10 shadow-xsm-spread ring-8 ring-transparent transition duration-150 dark:border-milky-white dark:border-opacity-10 dark:text-milky-white dark:bg-dark-blue focus:ring-blue focus:ring-2'
                                                    />
                                                    <button
                                                    onClick={() => { setData({alertVisible: true}) } }
                                                    type='button' 
                                                    className='w-fit select-none block px-2 py-1 text-blue text-sm font-medium tracking-wide'>
                                                        Forgot your password?
                                                    </button>
                                                    {/* Confirm Password Error report */}
                                                    {
                                                        errors3.new_password_confirmation
                                                        ? <p className='w-full text-sm font-semibold text-red tracking-wide'>
                                                            {errors3.new_password_confirmation}
                                                        </p>
                                                        : ''
                                                    }
                                                    {
                                                        (isDirty3 && !processing3) && (data3.current_password.length > 0) && (data3.new_password_confirmation === data3.new_password)
                                                        ? <button type='submit'
                                                        className={`w-fit mr-0 right-0 float-right rounded text-sm tracking-wide font-semibold text-blue hover:text-warm-blue px-2 py-1 transition duration-150`}>
                                                            Save
                                                        </button>
                                                        : ''
                                                    }
                                                </form>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>

                            {/* a link to go to gallery page to see list of all images uploaded by user */}
                            {/* <div className='w-full select-text flex flex-col gap-4 relative my-2'>
                                <Link href='#' className='w-full block px-4 py-2 text-black text-base font-medium tracking-wide flex flex-row gap-2 justify-start items-center dark:text-milky-white rounded bg-white p-2 border border-black border-opacity-10 shadow-xsm-spread text-left text-sm font-semibold tracking-wide text-black focus:outline-none dark:bg-dark-blue dark:text-milky-white dark:border-milky-white dark:border-opacity-10'>
                                    <Image className='w-4 h-4' />
                                    <span>
                                        Gallery
                                    </span>
                                </Link>
                            </div> */}
                        </div>
                    </div>
                    <ToastContainer 
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light" />
                    {
                        data.alertVisible
                        ? 
                        <div className="w-screen h-screen animate-fadeIn fixed flex justify-center items-center top-0 left-0 z-[999999999999999999899] backdrop-blur-xl bg-milky-white bg-opacity-80 dark:bg-black dark:bg-opacity-80">
                            <div className="w-full max-w-xl bg-white px-2 shadow-lg rounded animate-alertFadeIn">
                                <h3 className="w-full text-base text-black py-2 font-semibold tracking-wide border-b border-black border-opacity-5">
                                    Reset Password
                                </h3>
                                <p className="w-full text-sm text-black font-medium tracking-wide py-2">
                                    To reset password we will send a link to your email. Please follow instruction in the email and reset your password.
                                </p>
                                <div className="w-full flex flex-row gap-2 justify-end items-center px-2 py-4">
                                    <button type="button" 
                                    disabled={processing4}
                                    className={`${processing4 ? 'bg-black bg-opacity-10 text-black text-opacity-50' : 'bg-black bg-opacity-20 text-black'} text-base font-semibold tracking-wide rounded shadow-md px-4 py-2 flex flex-row gap-2 justify-between items-center`}
                                    onClick={() => { setData({alertVisible: false}) }}>
                                            Cancel
                                    </button>
                                    <button type="button" 
                                    disabled={processing4}
                                    className={`${processing4 ? 'text-white bg-blue bg-opacity-50 text-opacity-50' : 'bg-blue text-white'} text-white text-base font-semibold tracking-wide rounded shadow-md px-4 py-2 flex flex-row gap-2 justify-between items-center`}
                                    onClick={ () => { sendResetPasswordLink() } }>
                                        <span>
                                            Send Link
                                        </span>
                                        {
                                            processing4
                                            ? <span>
                                                <Loading color='text-white text-opacity-20 fill-white' width={4} height={4} />
                                            </span>
                                            : ''
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                        : ''
                    }
                </div>
            } />
        </>
    )
}