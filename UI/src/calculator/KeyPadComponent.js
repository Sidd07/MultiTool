import React from 'react';

const CustomStyle = {
    width: '25%',
    height: '60px'
};

const KeyPadComponent = (props) => {
    let keypad = props.keys;
  return(  <div className="button btn">
        {keypad.map((item, index) => (
            <button tabIndex='1' className='button' name={item}
                key={index} style={CustomStyle}
                onClick={e => props.onClick(e.target.name)}>{item}</button>
        ))}
    </div>)
}


export default KeyPadComponent;
