
import React from 'react'
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import styles from './Vote.module.scss'

import thumbs from '../../../../images/thumbs-up.svg'

/**
 * This component shows an icon wich can be clickable if a prop is passed
 * @param action {function}
 * @param hasOpacity {boolean}
 * @param isButton {boolean}
 * @param selected {boolean}
 * @param style {string}
 * @param type {string}
 * @returns Component with an icon
*/

const Vote = ({
  action,
  hasOpacity,
  isButton,
  selected,
  style,
  type
}) =>{
  return (
    <span
      className={
        classNames(
          styles.vote,
          isButton && styles.button,
          styles[`vote--${style}`],
          styles[`vote--${type}`],
          hasOpacity && styles[`vote--${type}-opacity`],
          selected && styles.vote__selected
        )
      }
    >
      <img src={thumbs} alt='' />
      <span
        className={styles.vote__overlay}
        onClick={action}
        data-type={type}
      />
    </span>
  )
}

Vote.propTypes = {
  action: PropTypes.func,
  hasOpacity: PropTypes.bool,
  isButton: PropTypes.bool,
  selected: PropTypes.bool,
  style: PropTypes.oneOf(['list', 'grid']),
  type: PropTypes.oneOf(['positive', 'negative']).isRequired,
}

Vote.defaultProps = {
  hasOpacity: false,
  isButton: false,
  selected: false,
  style: 'list'
}

export default Vote
