import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <>
    <div>

      <div className='home'>
      <Link href={"/"}>
        <img src="/home_gray.svg" alt="홈" />
        <h1>홈</h1>
      </Link>
      </div>

      <div className='calendar'>
      <Link href={"/calendar"}>
      <img src="/calendar_gray.svg" alt="캘린더" />
        <h1>캘린더</h1>
      </Link>
      </div>


<div className='list'>
      <Link href={"/"}>
      <img src="/list_gray.svg" alt="감정기록" />
        <h1>감정기록</h1>
      </Link>
      </div>

    </div>
  </>


  )
}

export default Header