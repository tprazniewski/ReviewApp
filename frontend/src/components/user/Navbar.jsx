import React from 'react'
import {BsEmojiSunglasses} from 'react-icons/bs'

export default function Navbar() {
  return (
    <div className="bg-secondary">
        <div className="max-w-screen-xl mx-auto p-2"> 
            <div className='flex justify-between items-center'>
                <img src="./logo.png" alt="logo Img" className='h-10'/>
                <ul className='flex items-center space-x-2'>
                    <li>
                        <button className='bg-dark-subtle p-1 rounded'>
                            <BsEmojiSunglasses className='text-secondary' size={24}/>
                        </button>
                    </li>
                    <li>
                        <input type="text" className='border-2 border-dark-subtleborder-2 p-1 rounded bg-transparent text-lg focus:border-white transition text-white' placeholder='Search'/>
                    </li>
                    <li className='text-white font-semibold text-lg'>Login</li>
                </ul>
            </div>
        </div>
    </div>

  )
}