import React from 'react'
import {Helmet} from "react-helmet-async"
const Title = ({title="Chat",description="Chat app name is Connectify"}) => {
  return (
   <Helmet>
    <title>{title}</title>
    <meta content={description} name="description"/>
   </Helmet>
  )
}

export default Title