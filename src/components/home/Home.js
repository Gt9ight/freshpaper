import React from 'react'
import { Link } from "react-router-dom";
import './home.css'


function Home() {
  return (
    <div className='menu-container'>
      <div className="postMedia">
        <Link className="postMediaButton" to='/postmedia' >Tony</Link>
      </div>
      <div className="feed">
        <Link className="mediaFeedButton" to='/mediafeed' >Others</Link>
      </div>
    </div>
  )
}

export default Home