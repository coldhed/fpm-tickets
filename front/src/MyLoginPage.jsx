// in src/MyLoginPage.js
import * as React from 'react';
import { TEInput, TERipple } from "tw-elements-react";
import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';

const MyLoginPage = ({ theme }) => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = e => {
        e.preventDefault();
        // will call authProvider.login({ username, password })
        login({ username, password }).catch(() =>
            notify('Correo o contraseña incorrectos')
        );
    };

    return (
        <section className="h-screen bg-neutral-200">
            <div className="h-full w-full px-[25%]">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-2xl">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                {/* <!-- Left column container--> */}
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        {/* <!--Logo--> */}
                                        <div className="text-center">
                                            <img
                                                className="mx-auto w-48"
                                                src="src/resources/logo-color (1).png"
                                                alt="logo"
                                            />
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                                Fundación por México
                                            </h4>
                                        </div>

                                        <form>
                                            <p className="mb-4">Ingrese a su cuenta</p>
                                            {/* <!--Username input--> */}
                                            <div class="relative mb-6">
                                                <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                                    </svg>
                                                </div>
                                                <input
                                                    onChange={(e) => setusername(e.target.value)}
                                                    type="text" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Correo" />
                                            </div>


                                            {/* <!--Password input--> */}
                                            <div class="relative mb-6">
                                                <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M17 19h4v2h-4v-2zm4-9v2h-5v10h5v2h-18v-14h3v-4c0-3.313 2.687-6 6-6s6 2.687 6 6v4h3zm-5 0v-4c0-2.206-1.795-4-4-4s-4 1.794-4 4v4h8zm1 8h4v-2h-4v2zm0-3h4v-2h-4v2z" /></svg>
                                                </div>
                                                <input
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    type="password" id="input-group-1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Contraseña" />
                                            </div>

                                            {/* <!--Submit button--> */}
                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <TERipple rippleColor="light" className="w-full">
                                                    <button
                                                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                        type="button"
                                                        style={{
                                                            background:
                                                                "#c22032",
                                                        }}
                                                        onClick={handleSubmit}
                                                    >
                                                        Acceder
                                                    </button>
                                                </TERipple>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* <!-- Right column container with background and description--> */}
                                <div
                                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                    style={{
                                        background:
                                            "#c22032",
                                    }}
                                >
                                    <div className="px-4 py-6 text-white md:mx-6 md:p-10">
                                        <h4 className="mb-6 text-3xl font-semibold">
                                            Tickets Fundación por México
                                        </h4>
                                        <p className="text-sm">
                                            Bienvenido al sistema de tickets de Fundación por México.
                                            Aquí podrás levantar reportes de cualquier tipo de problemas
                                            que tengas en tu aula. Para continuar, por favor, inicia sesión.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyLoginPage;
