import { Head, Link } from '@inertiajs/react';
import Layout from '../../Layouts/General'
import route from 'ziggy-js';

export default function({}) {

  return (
    <Layout title={'Login'} body={
      <>
        <section className="w-full max-w-6xl m-auto select-none xxxl:translate-y-[50%] xxl:translate-y-[50%] xl:translate-y-[50%] lg:translate-y-[50%] md:translate-y-[15%] sm:translate-y-[15%] xs:translate-y-[15%] xxs:translate-y-[15%]">
          <div className="h-full">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
              <div
                className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                <img
                  src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="w-full"
                  alt="Sample image" />
              </div>
              <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                <form>
                  <div
                    className="flex flex-row items-center justify-center lg:justify-start">
                    <p className="mb-0 mr-4 text-lg text-black dark:text-milky-white">Sign in with</p>
                    <button
                      type="button"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      className="mx-1 h-9 w-9 rounded-full bg-blue uppercase leading-normal text-milky-white shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      className="mx-1 h-9 w-9 rounded-full bg-[#519ef0] uppercase leading-normal text-milky-white shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      data-te-ripple-init
                      data-te-ripple-color="light"
                      className="mx-1 h-9 w-9 rounded-full flex justify-center items-center bg-[#3674b3] uppercase leading-normal text-milky-white shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                    </button>
                  </div>

                  <div
                    className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-black before:border-opacity-30 before:dark:border-milky-white before:dark:border-opacity-30 after:mt-0.5 after:flex-1 after:border-t after:border-black after:border-opacity-30 after:dark:border-milky-white after:dark:border-opacity-30">
                    <p
                      className="mx-4 mb-0 text-black text-center font-semibold dark:text-milky-white">
                      Or
                    </p>
                  </div>

                  <div className="relative mb-6">
                    <input
                    type="text"
                    className="w-full min-h-[45px] max-h-[45px] p-2 rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10"
                    id="email_address"
                    placeholder="Email address"
                    spellCheck="false"
                    autoFocus
                    autoComplete="true" />
                  </div>

                  <div className="relative mb-6">
                    <input
                    type="password"
                    className="w-full min-h-[45px] max-h-[45px] p-2 rounded text-black text-medium font-medium tracking-wide bg-milky-white border border-black border-opacity-10 ring-transparent transition duration-150 ease-in ring-[5px] outline-none focus:ring-warm-blue focus:ring-2 dark:text-milky-white dark:bg-dark-blue dark:border-milky-white dark:border-opacity-10"
                    id="password"
                    placeholder="Password"
                    spellCheck="false"
                    autoComplete="false" />
                  </div>

                  <div className="mb-6 flex items-center justify-between">
                    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                      <input
                        className="relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-[rgba(0,0,0,0.25)] bg-milky-white before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-warm-blue checked:bg-warm-blue checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-milky-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:bg-milky-white focus:after:content-[''] checked:focus:border-warm-blue checked:focus:bg-warm-blue checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-milky-white checked:focus:after:bg-transparent"
                        type="checkbox"
                        value=""
                        id="exampleCheck2" />
                      <label
                        className="inline-block pl-[0.15rem] text-black text-medium font-medium tracking-wide dark:text-milky-white hover:cursor-pointer"
                        htmlFor="exampleCheck2">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className='text-medium text-black font-medium tracking-wide dark:text-milky-white'>Forgot password?</a>
                  </div>

                  <div className="text-center lg:text-left">
                    <button
                      type="button"
                      className="inline-block rounded text-base font-semibold tracking-wider text-white bg-warm-blue px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-milky-white shadow-lg transition duration-150 ease-in-out hover:bg-blue"
                      data-te-ripple-init
                      data-te-ripple-color="light">
                      Login
                    </button>
                    <p className="mt-2 mb-0 pt-1 text-sm font-semibold text-black text-black dark:text-milky-white tracking-wider">
                      Don't have an account?
                      <Link
                        href={route('signup')}
                        className="text-warm-blue px-1 text-sm font-semibold tracking-wider transition duration-150 ease-in-out hover:text-blue">
                          Register
                      </Link>
                    </p>
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

