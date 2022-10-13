import React from 'react'

export default function FormInput({name, label, placeholder, ...rest}) {
  return (
    <div className='flex flex-col-reverse'>
        <input id={name} name ={name} className='bg-transparent rounded border-2 dark:border-dark-subtle border-light-subtle w-full text-lg outline-none dark:focus:border-white p-1 focus:border-primary dark:text-white peer transition' placeholder={placeholder} {...rest}/>
        <label htmlFor={name} className='font-semibold dark:text-dark-subtle text-light-subtle dark:peer-focus:text-white peek-focus:text-primary transition self-start ' >{label}</label>
    </div>  )
}
