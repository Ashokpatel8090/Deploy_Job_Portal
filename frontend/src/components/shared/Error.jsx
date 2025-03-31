import React from 'react'
import {Link, useRouteError} from 'react-router-dom'
const Error = () => {
  const error = useRouteError();
  console.log(error);
  if(error.status == 404){
    return <>
      <div>
        <img src={img} alt='not found'></img>
        <h3>Ohh!!</h3>
        <p>We are not able to find the page for the given Url</p>
        <Link to='/'>Navigate Home </Link>
      </div>
    </>
  }
  return (
      <>
        <div>
        <h3>something went wrong</h3>
      </div>
        </>
  )
}
export default Error