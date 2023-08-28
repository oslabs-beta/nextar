import React from 'react';
import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className='navbar'>
        <Link href='/'>
            <button>Home</button>
        </Link>
        <Link href='/favorites'>
            <button>Favorites</button>
        </Link>
    </nav>
  )
}

export default Navigation;