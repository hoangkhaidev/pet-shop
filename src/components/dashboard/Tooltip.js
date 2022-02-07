import React from 'react';
import PropTypes from 'prop-types';
import './Tooltip.css';

const TooltipCustom = ({content, children}) => {
    return (
      <div className='tooltip'>
        <div className='tooltip-content top'>
            {content}
        </div>
        {children}
      </div>
    );
}

TooltipCustom.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default TooltipCustom;