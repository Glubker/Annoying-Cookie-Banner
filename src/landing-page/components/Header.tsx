import { useState } from 'react';
import { HiBars3 } from 'react-icons/hi2';
import { BiLogIn } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';


import logo from '../../assets/logo.png';


interface NavigationItem {
  name: string;
  href: string;
};

export default function Header({ navigation }: { navigation: NavigationItem[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const NavLogo = () => <img className='h-8 w-8' src={logo} alt='Your SaaS App' />;

  return (
    <header className='absolute inset-x-0 top-0 z-50 dark:bg-boxdark-2'>
      <nav className='flex items-center justify-between p-6 lg:px-8' aria-label='Global'>
        <div className='flex items-center lg:flex-1'>
          <a
            href='https://opensaas.sh'
            className='flex items-center -m-1.5 p-1.5 text-gray-900 duration-300 ease-in-out hover:text-yellow-500'
          >
            <NavLogo />
            <span className='ml-2 text-sm font-semibold leading-6 dark:text-white'>
              
              Open Saas</span>
          </a>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <HiBars3 className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <div className='hidden lg:flex lg:gap-x-12'>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-sm font-semibold leading-6 text-gray-900 duration-300 ease-in-out hover:text-yellow-500 dark:text-white'
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className='hidden lg:flex lg:flex-1 lg:justify-end lg:align-end'>
          {/* <!-- Dark Mode Toggler --> */}
          <div className='flex items-center gap-3 2xsm:gap-7'>
            <ul className='flex justify-center items-center gap-2 2xsm:gap-4'>

            </ul>


                <div className='flex justify-end items-center duration-300 ease-in-out text-gray-900 hover:text-yellow-500 dark:text-white'>
                  Log in <BiLogIn size='1.1rem' className='ml-1' />
                </div>


          </div>
        </div>
      </nav>
    </header>
  )
}
