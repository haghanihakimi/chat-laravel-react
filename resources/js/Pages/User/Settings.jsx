import { Link, useForm } from '@inertiajs/react'
import route from 'ziggy-js'
import Layout from '../../Layouts/Main'
import { Disclosure } from '@headlessui/react'
import { 
    HiLockClosed as Lock,
    HiChatBubbleLeft as Message,
    HiUserPlus as Follow,
    HiChevronUp as ArrowUp
} from "react-icons/hi2";

export default function({user, flash}) {
    const {patch, processing, errors, data, setData, isDirty} = useForm({
        first_name: user.firstname,
        surname: user.surname,
        username: user.username,
        email: user.email,
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    })

    const saveSettings = () => {
        if(!processing && isDirty) {
            patch(route('settings.save'), {
                onSuccess: () => {
                    // 
                }
            })
        }
    }

    return(
        <>
            <Layout title={user} body={
                <div className="w-full h-full relative flex flex-col gap-0 z-10 select-none overflow-hidden">
                    <div className='w-full h-full overflow-auto relative flex flex-row gap-0 justify-center items-center'>
                        <form 
                        onSubmit={ e => { e.preventDefault();saveSettings(); } }
                        className='w-full max-w-sm h-auto bg-white flex flex-col mx-auto p-4 rounded-lg border border-black border-opacity-10 shadow-lg dark:border-milky-white dark:border-opacity-5 dark:bg-black'>
                            {
                                flash.message && flash.message.settings_success 
                                ? <p className='w-full text-sm font-semibold text-green tracking-wide px-1 py-2'>
                                    {flash.message.settings_success}
                                </p> 
                                : '' 
                            }
                            {/* Profile picture & name container */}
                            <div className='w-full relative flex flex-col gap-2 justify-center items-center'>
                                {/* Profile picture image */}
                                <div className='w-24 h-24 rounded-full relative mx-auto p-1 bg-white border border-black border-opacity-10 shadow-md dark:bg-dark-blue dark:border-milky-white dark:border-opacity-5'>
                                    <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                                    alt="profile picture"
                                    className="block w-full h-full object-cover rounded-full" />
                                    <Lock className='w-4 h-4 absolute -bottom-[4px] left-0 right-0 mx-auto text-blue shadow-lg' />
                                </div>
                            </div>
                            {/* Names container */}
                            <div className='w-full select-text flex flex-col gap-4 relative mb-4 mt-10'>
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
                            </div>
                            {/* Email & password container */}
                            <div className='w-full select-text flex flex-col gap-4 relative mb-4 mt-10'>
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
                            disabled={!isDirty}
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