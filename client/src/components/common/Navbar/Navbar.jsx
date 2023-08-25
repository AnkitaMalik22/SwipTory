import React, { useEffect } from 'react'
import NavMobile from './NavMobile';
import NavDesktop  from './NavDesktop'
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {

  const { isSmallScreen } = useSelector(
    (state) => state.layout
  );


useEffect(() => {
  console.log(isSmallScreen);
}, [isSmallScreen])

  return (
   <>
   {

isSmallScreen ? <NavMobile/> : <NavDesktop/>

   }   
   </>
  )
}

export default Navbar