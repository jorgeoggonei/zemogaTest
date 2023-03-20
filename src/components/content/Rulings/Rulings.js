import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import styles from './Rulings.module.scss'

import Cards from '../Cards/Cards'

const viewOptions = ['List', 'Grid']

const Rulings = ({
  title
}) =>{
  const [selectedOption, setSelectedOption] = useState(viewOptions[0].toLocaleLowerCase())

  const onSelectChange = (e) => {
    setSelectedOption(e.target.value)
  }

  return (
    <div className={styles.rulings}>
      <div className={styles.rulings__top}>
        <h2>{title}</h2>
        <select
          className={styles.view}
          value={selectedOption}
          onChange={onSelectChange}
        >
          {
            viewOptions.map(option => {
              return <option key={option} value={option.toLocaleLowerCase()}>{option}</option>
            })
          }
        </select>
      </div>
      <Cards
        style={selectedOption}
      />
    </div>
  )
}

Rulings.propTypes = {
  title: PropTypes.string.isRequired
}

export default Rulings
