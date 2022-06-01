import Head from "next/head"
import { useState } from "react"

export default function Form() {
    const [quantity, setQuantity] = useState(1)
    const [amount, setAmount] = useState(1)

    return (
        <>
            <Head>
                <title>Invoice</title>
            </Head>
            <div className="hidden sm:block" aria-hidden="true">
                <div className="">
                    <div className="border-t border-gray-200" />
                </div>
            </div>
            <div className="md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6" >
                            <div className="px-4 sm:px-0">
                                <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                                <p className="mt-1 text-sm text-gray-600">Invoice informations.</p>
                            </div>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Sold To
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700 sm:text-sm"
                                    >
                                        <option>Select</option>
                                        <option>AAAAAAAAAAA</option>
                                        <option>AAAAAAAAAAA</option>
                                        <option>AAAAAAAAAAA</option>
                                    </select>
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Ordered By
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700 sm:text-sm"
                                    >
                                        <option>Select</option>
                                        <option>BBBBBBBBBBBB</option>
                                        <option>BBBBBBBBBBBB</option>
                                        <option>BBBBBBBBBBBB</option>
                                    </select>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Item
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-700 sm:text-sm"
                                    >
                                        <option>Select</option>
                                        <option>INDUSTRIAL GRADE 1,2-BENZIOSATHIAZOLIN-3-ONE , 85% 500 KG BAG</option>
                                        <option>INDUSTRIAL GRADE 1,2-BENZIOSATHIAZOLIN-3-ONE , 85% 500 KG BAG</option>
                                        <option>INDUSTRIAL GRADE 1,2-BENZIOSATHIAZOLIN-3-ONE , 85% 500 KG BAG</option>
                                    </select>
                                </div>
                                <div className='col-span-3'>
                                    <div className='flex flex-row items-center justify-around'>
                                        <div>
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                id="quantity"
                                                value={quantity}
                                                onChange={e => setQuantity(Number(e.target.value))}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-700"
                                            />
                                        </div>
                                        <div className='flex flex-row items-center'>
                                            <div>
                                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                    Amount
                                                </label>
                                                <input
                                                    type="number"
                                                    name="amount"
                                                    id="amount"
                                                    value={amount}
                                                    onChange={e => setAmount(Number(e.target.value))}
                                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md text-gray-700"
                                                />
                                            </div>
                                            <p className="block text-sm font-medium text-gray-700 pt-5 pl-2">USD</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 sm:px-0 col-span-12 sm:col-span-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
                                    <p className="mt-1 text-sm text-gray-600">Decide which communications you'd like to receive and how.</p>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <legend className="sr-only">By Email</legend>
                                    <div className="text-base font-medium text-gray-900" aria-hidden="true">
                                        By Email
                                    </div>
                                    <div className="mt-4 space-y-4">

                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="candidates"
                                                    name="candidates"
                                                    type="checkbox"
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="candidates" className="font-medium text-gray-700">
                                                    Delivered
                                                </label>
                                                <p className="text-gray-500">Get notified when a delivered.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="offers"
                                                    name="offers"
                                                    type="checkbox"
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="offers" className="font-medium text-gray-700">
                                                    Paid
                                                </label>
                                                <p className="text-gray-500">Get notified when a invoice was paid.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <legend className="contents text-base font-medium text-gray-900">Push Notifications</legend>
                                    <p className="text-sm text-gray-500">These are delivered via App Telegram to your mobile phone.</p>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                id="push-everything"
                                                name="push-notifications"
                                                type="radio"
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                            />
                                            <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                                                Everything
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="push-email"
                                                name="push-notifications"
                                                type="radio"
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                            />
                                            <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                                                Same as email
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="push-nothing"
                                                name="push-notifications"
                                                type="radio"
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                            />
                                            <label htmlFor="push-nothing" className="ml-3 block text-sm font-medium text-gray-700">
                                                No push notifications
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <a
                                href={`api/invoice?quantity=${quantity}&amount=${amount}`}
                                // target='_blank'
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Generate Invoice
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}