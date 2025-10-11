"use client"

import React, { useState } from 'react'
import Container from '../Container'
import Link from 'next/link'
import { Redressed } from 'next/font/google'
import CartCount from '../CartCount'
import { FaSearch, FaBars } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { Dancing_Script } from "next/font/google";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'



const dancing = Dancing_Script({ subsets: ["latin"], weight: "700" });

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const navigateToWishList = () =>{
    router.push('/wishlist')
  }

  const handleSearch = (e: React.FormEvent) => {
    if(searchQuery){
      e.preventDefault()
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
    else{
      e.preventDefault()
      router.push('/')
    }
  }

  return (
    <div className='sticky top-0 w-full bg-slate-800 z-30 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-wrap items-center justify-between gap-3 md:gap-0'>
            <Link href="/" className={`${dancing.className} font-extrabold text-2xl md:text-4xl lg:text-6xl text-white`}>
              ShopMart
            </Link>
            <div className='flex items-center gap-4 md:gap-8'>
              <form onSubmit={handleSearch} className='hidden md:flex items-center'>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className='p-2 rounded-md'
                />
                <button type="submit" className='bg-white text-slate-950 p-2 rounded-md ml-2'>
                  <FaSearch />
                </button>
              </form>
              <CartCount />
              <FontAwesomeIcon icon={faHeart} className='text-white text-2xl cursor-pointer' onClick={navigateToWishList}/>
              <button className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <FaBars size={24} className='text-white'/>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className='mt-4 md:hidden'>
              <form onSubmit={handleSearch} className='flex items-center'>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className='p-2 rounded-md flex-grow'
                />
                <button type="submit" className='bg-white text-black p-2 rounded-md ml-1'>
                  <FaSearch />
                </button>
              </form>
            </div>
          )}
        </Container>
      </div>
    </div>
  )
}

export default NavBar

