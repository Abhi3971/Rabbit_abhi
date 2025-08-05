import React from 'react'
import { Link } from 'react-router-dom'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterXFill } from 'react-icons/ri'
import {FiPhoneCall } from 'react-icons/fi'



const FooterEnd = () => {
  return (
    <footer className='border-t py-12 ml-5'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
                <p className='text-gray-500 mb-4'>
                    Be the first to hear about new product, exclusive events, and online offers
                </p>
                <p className='font-medium text-sm text-gray-600 mb-6'>Sign up and get 10% off on your first order</p>

                {/* Newletter form */}
                <form className='flex'>
                    <input type="email" placeholder='Enter your Email' className='p-3 text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:text-gray-500 transition-all' required />
                    <button type='submit' className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>
                        subscribe
                    </button>
                </form>
            </div>
            {/* shop links */}
            <div className='ml-6'>
                <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
                <ul className='space-y-2 text-sm text-gray-600'>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                        Men' top wear
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                        Women' top waer
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                        bottom waer
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                        Top waer
                        </Link>
                    </li>
                </ul>
            </div>

            {/* support links */}
            <div className='ml-6'>
                <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                <ul className='space-y-2 text-sm text-gray-600'>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                        Contact us 
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                        About us 
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                        FAQs
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                        Features
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Follow us */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
                <div className='flex item-center space-x-4 mb-6'>
                    <a href="http://www.facebook.com" target='_black' rel='noopener noreferrer' className='hover:text-gray-300'>
                    <TbBrandMeta className='h-5 w-5'/>
                    </a>
                    <a href="http://www.facebook.com" target='_black' rel='noopener noreferrer' className='hover:text-gray-300'>
                    <IoLogoInstagram className='h-5 w-5'/>
                    </a>
                    <a href="http://www.facebook.com" target='_black' rel='noopener noreferrer' className='hover:text-gray-300'>
                    <RiTwitterXFill className='h-5 w-5'/>
                    </a>
                </div>
                <p className='text-gray-500'>Call us</p>
                <p>
                    <FiPhoneCall className='inline-block mr-2'/>0123-456-789
                </p>
            </div>
        </div>
        <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
            <p className='text-gray-500 text-sm tracking-tighter text-center'>
                &copy; 2025, CompileTab. All Rights Reserved.</p>
        </div>
    </footer>
  )
}

export default FooterEnd