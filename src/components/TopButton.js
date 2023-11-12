import React from 'react';

const roundButtonStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    backgroundColor: 'transparent',
    fontSize: 30,
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '999',
    textDecoration: 'none',
    border: '2px solid black',
};

function TopButton(){
    return(
        <a style={roundButtonStyle} href="#top">↑</a>
    );
}

export default TopButton;