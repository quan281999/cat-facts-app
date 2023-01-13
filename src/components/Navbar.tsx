import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type TNavBarButtonProps = {
  isActive: boolean;
  href: string;
  children: React.ReactNode
}

const NavBarButton = ({ isActive, href, children }: TNavBarButtonProps) => (
  <Link href={href}>
    <button className={`p-2 hover:bg-white/20 ${isActive ? ' text-white font-bold text-white border-b-2' : 'text-white/70'}`}>
      {children}
    </button>
  </Link>
)

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="flex flex-row items-center justify-center pt-2 gap-8 text-xl">
      <NavBarButton isActive={router.pathname === '/'} href='/'>
        Home
      </NavBarButton>
      <NavBarButton isActive={router.pathname === '/ranking'} href='ranking'>
        Ranking
      </NavBarButton>
    </nav>
  )
}

export default Navbar