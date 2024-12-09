"use client"

import React, { useState } from 'react'
import Container from '../Container'
import Link from 'next/link'
import { Redressed } from 'next/font/google'
import CartCount from '../CartCount'
import { FaSearch, FaBars } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const redressed = Redressed({ subsets: ['latin'], weight: ["400"] })

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <div className='sticky top-0 w-full bg-slate-200 z-30 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-wrap items-center justify-between gap-3 md:gap-0'>
            <Link href="/" className={`${redressed.className} font-bold text-2xl md:text-4xl lg:text-6xl`}>
              ShopMart
            </Link>
            <div className='flex items-center gap-4 md:gap-8'>
              <form onSubmit={handleSearch} className='hidden md:flex items-center'>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className='p-2 rounded-l-md'
                />
                <button type="submit" className='bg-blue-500 text-white p-2 rounded-r-md'>
                  <FaSearch />
                </button>
              </form>
              <CartCount />
              <button className='md:hidden' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <FaBars size={24} />
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
                  className='p-2 rounded-l-md flex-grow'
                />
                <button type="submit" className='bg-blue-500 text-white p-2 rounded-r-md'>
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

