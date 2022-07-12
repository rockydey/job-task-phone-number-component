import React, { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { Menu } from '@headlessui/react'

const PhoneNumber = () => {
    const [countriesData, setCountriesData] = useState([]);
    const [dialCodes, setDialCodes] = useState([]);
    const [dialCode, setDialCode] = useState('Choose (any)');
    const [flag, setFlag] = useState('Choose (any)');
    const [flags, setFlags] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        fetch('https://restcountries.com/v2/all')
            .then(res => res.json())
            .then(data => setCountriesData(data));
    }, []);

    useEffect(() => {
        const allDialCodes = countriesData.map((countryData) => {
            return countryData.callingCodes[0];
        });
        const uniqueDialCodes = ['Choose (any)', ...allDialCodes]
        setDialCodes(uniqueDialCodes);
    }, [countriesData]);

    useEffect(() => {
        const allFlags = countriesData.map((countryData) => {
            return countryData.flags.png;
        });
        const uniqueFlags = ['Choose (any)', ...new Set(allFlags)]
        setFlags(uniqueFlags);
    }, [countriesData]);

    return (
        <section className=''>
            <div className='flex item-center justify-center mt-48'>
                <div className='flex items-center max-w-[400px] border rounded-lg'>
                    <Menu as='div' className='cursor-pointer relative'>
                        <Menu.Button onClick={() => setIsOpen(!isOpen)} className='flex items-center px-[18px] rounded-lg'>
                            <div className='flex items-center gap-2'>
                                <img className='w-10' src={flag} alt="" />
                                <div className='text-[15px] font-medium leading-tight'>+{dialCode}</div>
                            </div>
                            <div className='ml-3'>
                                {
                                    isOpen ? (<IoMdArrowDropdown />) : (
                                        <IoMdArrowDropdown />
                                    )
                                }
                            </div>
                        </Menu.Button>
                        <Menu.Items className='px-6 py-8 text-[15px] space-y-6 shadow-md bg-white absolute  z-10 list-none rounded-b-lg'>
                            {
                                flags.map((flag, index) => {
                                    const dials = dialCodes[index];

                                    return (
                                        <Menu.Item onClick={() => { setFlag(flag); setDialCode(dials); }} className='cursor-pointer flex items-center gap-3' as='li' key={index}><img className='w-12' src={flag} alt=''></img><span>+{dials}</span></Menu.Item>
                                    )
                                })
                            }
                        </Menu.Items>
                    </Menu>
                    <input type="text" maxLength='10' placeholder='Enter Phone Number' className='py-2 px-5 focus:outline-0' />
                </div>
            </div>
        </section>
    );
};

export default PhoneNumber;