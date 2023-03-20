
import React from 'react'
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import styles from './Vote.module.scss'

import thumbs from '../../../../images/thumbs-up.svg'

/**
 * This component shows an icon wich can be clickable if a prop is passed
 * @param action {function}
 * @param hasBackground {boolean}
 * @param isButton {boolean}
 * @param style {string}
 * @param type {string}
 * @returns Component with an icon
*/


const Vote = ({
  action,
  hasBackground,
  isButton,
  style,
  type
}) =>{
  return (
    <span
      className={
        classNames(
          styles.vote,
          hasBackground && styles.vote__bg,
          isButton && styles.button,
          styles[`vote__bg--${type}`],
          styles[`vote--${style}`]
        )
      }
      onClick={action}
    >
      <img src={thumbs} alt='' />
    </span>
  )
}

Vote.propTypes = {
  action: PropTypes.func,
  hasBackground: PropTypes.bool,
  isButton: PropTypes.bool,
  style: PropTypes.oneOf(['list', 'grid']),
  type: PropTypes.oneOf(['positive', 'negative']).isRequired,
}

Vote.defaultProps = {
  hasBackground: false,
  isButton: false
}

export default Vote
