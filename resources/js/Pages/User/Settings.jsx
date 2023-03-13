import { Link, useForm } from '@inertiajs/react'
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

export default function({user, image, flash}) {
    // A form to save first name, surname and gender
    const {data: data1, setData: setData1, post: post1, processing: processing1, errors: errors1, isDirty: isDirty1} = useForm({
        first_name: user.first_name,
        surname: user.surname,
        gender: user.gender,
    })
    // A form to save email, username, privacy and phone number
    const {data: data2, setData: setData2, post: post2, processing: processing2, errors: errors2, isDirty: isDirty2} = useForm({
        username: user.username,
        email: user.email,
        phone: user.phone ? user.phone : '',
        privacy: user.privacy ? true : false,
    })
    // A form to save new password
    const {data: data3, setData: setData3, post: post3, processing: processing3, errors: errors3, isDirty: isDirty3} = useForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    })

    // Submit form to save changes for first name, surname and gender
    const submitForm1 = () => {
        if(!processing1 && isDirty1) {
            post1(route('settings.save.names'), {
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
    // Submit form to save changes for email, username, phone and privacy
    const submitForm2 = () => {
        if(!processing2 && isDirty2) {
            post2(route('settings.save.email'), {
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
    // Submit form to save changes for email, username, phone and privacy
    const submitForm3 = () => {
        if(!processing3 && isDirty3) {
            post3(route('settings.save.password'), {
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
                        <div className='w-full max-w-sm h-auto bg-white flex flex-col mx-auto p-4 rounded-lg border border-black border-opacity-10 shadow-lg dark:border-milky-white dark:border-opacity-5 dark:bg-black'>
                            {/* Profile picture & name container */}
                            <div className='w-full relative flex flex-col gap-2 justify-center items-center mb-4'>
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
                                        data2.privacy
                                        ? <Lock className='w-4 h-4 absolute -bottom-[4px] left-0 right-0 mx-auto text-blue shadow-lg' />
                                        : ''
                                    }
                                </div>
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
                                            <Disclosure.Button className="flex w-full justify-between items-center rounded bg-white p-2 border border-black border-opacity-10 shadow-xsm-spread text-left text-sm font-semibold tracking-wide text-black focus:outline-none dark:bg-dark-blue dark:text-milky-white dark:border-milky-white dark:border-opacity-10">
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
                                            <Disclosure.Panel className="flex flex-col gap-2 rounded bg-white border border-black border-opacity-10 px-4 pt-4 pb-2 text-sm text-black dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10 dark:text-milky-white">
                                                <form action="post" className='w-full flex flex-col gap-2' onSubmit={e => { e.preventDefault();submitForm1(); }}>
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
                                            <Disclosure.Button className="flex w-full justify-between items-center rounded bg-white p-2 border border-black border-opacity-10 shadow-xsm-spread text-left text-sm font-semibold tracking-wide text-black focus:outline-none dark:bg-dark-blue dark:text-milky-white dark:border-milky-white dark:border-opacity-10">
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
                                            <Disclosure.Panel className="rounded bg-white border border-black border-opacity-10 px-4 pt-4 pb-2 text-sm text-black dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10 dark:text-milky-white">
                                                <form action="post" className='flex flex-col gap-2 w-full relative w-full' onSubmit={e => { e.preventDefault();submitForm2() }}>
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
                                            <Disclosure.Button className="flex w-full justify-between items-center rounded bg-white p-2 border border-black border-opacity-10 shadow-xsm-spread text-left text-sm font-semibold tracking-wide text-black focus:outline-none dark:bg-dark-blue dark:text-milky-white dark:border-milky-white dark:border-opacity-10">
                                                <span>Change Password</span>
                                                <ArrowUp
                                                className={`${
                                                    open ? 'rotate-0 transform' : 'rotate-180 transform'
                                                } h-4 w-4 text-black dark:text-milky-white`}
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="rounded bg-white border border-black border-opacity-10 px-4 pt-4 pb-2 text-sm text-black dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10 dark:text-milky-white">
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
                                                    <Link href='' className='w-fit block px-2 py-1 text-blue text-sm font-medium tracking-wide'>
                                                        Forgot your password?
                                                    </Link>
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
                        </div>
                    </div>
                </div>
            } />
        </>
    )
}