import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import styles from './Cards.module.scss'

import Card from './Card/Card'
import data from '../../../data/data.json'

/**
 * This component shows the container for the cards container
 * @param style {string}
 * @returns Component container
*/

const Cards = ({
  style
}) =>{

  const [info, setInfo] = useState([])

  useEffect(() => {
    let getData = window.localStorage.getItem('rulings')
    if(getData) {
      setInfo(JSON.parse(getData))
    } else {
      setInfo(data.data)
      window.localStorage.setItem('rulings', JSON.stringify(data.data))
    }
  }, [])

  return (
    <div
      className={
        classNames(
          styles.cards,
          style === 'list' ? styles['cards--list'] : styles['cards--grid']
        )
      }
    >
      {
        info?.map((elem, index) => {
          return <Card
            key={index}
            {...elem}
            style={style}
            />
        })
      }
    </div>
  )
}

Cards.propTypes = {
  style: PropTypes.string
}

Cards.defaultProps = {
  style: 'list'
}

export default Cards
