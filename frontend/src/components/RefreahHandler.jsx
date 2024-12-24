import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreahHandler({setIsAuthenticated}) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
            if(localStorage.getItem("token")){
                setIsAuthenticated(true);
                if(location.pathname==="/" || location.pathname==="/login" || location.pathname==="/signup"){
                    navigate("/home", {replace:false});
                }
                
            }
    },[location, navigate, setIsAuthenticated])
  return (
    null
  )
}
RefreahHandler.propTypes={
    setIsAuthenticated:PropTypes.bool.isRequired,
}

export default RefreahHandler
