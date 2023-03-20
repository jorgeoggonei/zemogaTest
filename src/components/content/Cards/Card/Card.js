import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import styles from './Card.module.scss'
import Vote from '../Vote/Vote'

import thumbsUp from '../../../../images/thumbs-up.svg'
import thumbsDown from '../../../../images/thumbs-down.svg'

const Card = ({
  category,
  date,
  description,
  name,
  picture,
  style,
  votes
}) =>{
  const [votesCount, setVotesCount] = useState(votes)
  const [votesPercentage, setVotesPercentage] = useState({positive: 50, negative: 50})
  const [voted, setVoted] = useState(false)

  useEffect(() => {
    const totalVotes = votesCount.positive + votesCount.negative
    setVotesPercentage({
      positive: Math.round((votesCount.positive*100/totalVotes)*10)/10,
      negative: Math.round((votesCount.negative*100/totalVotes)*10)/10
    })
  },[votesCount])

  return (
    <div
      className={
        classNames(
          styles.card,
          styles[`card--${style}`]
        )
      }
    >
      <div
        className={
          classNames(
            styles.card__image,
            styles[`card__image--${style}`]
          )
        }
      >
        {
          style === 'list'
          ? <picture>
              <source
                srcSet={`images/${picture}-desktop.png`}
                media='(min-width: 1100px)'/>
              <source
                srcSet={`images/${picture}-tablet.png`}
                media='(min-width: 768px)'/>
              <img alt='' src={`images/${picture}.png`}/>
            </picture>
          : <img alt='' src={`images/${picture}.png`}/>
        }
        <div
          className={
            classNames(
              styles.card__image__shadow,
              styles[`card__image__shadow--${style}`]
            )
          }
        />
      </div>
      <div
        className={
          classNames(
            styles.card__info,
            styles[`card__info--${style}`]
          )
        }
      >
        <div
          className={
            classNames(
              styles.card__info__top,
              styles[`card__info__top--${style}`]
            )
          }
        >
          <div className={styles.card__person}>
            <div
              className={
                classNames(
                  styles.card__opinion,
                  styles[`card__opinion--${style}`]
                )
              }
            >
              {votesCount.positive !== votesCount.negative &&
                <Vote style={style} type={votesCount.positive > votesCount.negative ? 'positive' : 'negative'} />}
            </div>
            <div>
              <p
                className={
                  classNames(
                    styles.card__name,
                    styles[`card__name--${style}`]
                  )
                }
              >
                {name}
              </p>
              <p
                className={
                  classNames(
                    styles.card__description,
                    styles[`card__description--${style}`]
                  )
                }
              >
                {description}
              </p>
            </div>
          </div>
          <div className={styles.card__votes}>
            <span
              className={
                classNames(
                  styles.card__date,
                  styles[`card__date--${style}`]
                )
              }
            >
              {voted ? 'Thank you for your vote!' : `${date} in ${category}`}
            </span>
            <div className={styles.card__vote}>
              <Vote style={style} type='positive' isButton />
              <Vote style={style} type='negative' isButton />
              <button
                className={
                  classNames(
                    styles.card__vote__button,
                    styles[`card__vote__button--${style}`]
                  )
                }
              >
                {voted ? 'Vote Again' : 'Vote Now'}
              </button>
            </div>
          </div>
        </div>
        <div className={styles.card__info__bottom}>
          <div
            className={
              classNames(
                styles.bar,
                styles[`bar--${style}`]
              )
            }
          >
            <span className={styles.bar__positive} style={{flexBasis: `${votesPercentage.positive}%`}}></span>
            <span className={styles.bar__negative} style={{flexBasis: `${votesPercentage.negative}%`}}></span>
          </div>
          <span
            className={
              classNames(
                styles.bar__info,
                styles[`bar__info--${style}`],
                styles.bar__info__positive
              )
            }
          >
            <img
              className={
                classNames(
                  styles.bar__info__icon,
                  styles[`bar__info__icon--${style}`],
                )
              }
                src={thumbsUp}
                alt=''
            />
            {votesPercentage.positive}%
          </span>
          <span
            className={
              classNames(
                styles.bar__info,
                styles[`bar__info--${style}`],
                styles.bar__info__negative
              )
            }
          >
            {votesPercentage.negative}%
            <img
              className={
                classNames(
                  styles.bar__info__icon,
                  styles[`bar__info__icon--${style}`],
                )
              }
                src={thumbsDown}
                alt=''
            />
          </span>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  category: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  picture: PropTypes.string,
  style: PropTypes.oneOf(['list', 'grid']),
  votes: PropTypes.shape({
    positive: PropTypes.number,
    negative: PropTypes.number
  })
}

Card.defaultProps = {
  style: 'list'
}

export default Card
