import React, { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import styles from './Card.module.scss'
import Vote from '../Vote/Vote'

import thumbsUp from '../../../../images/thumbs-up.svg'
import thumbsDown from '../../../../images/thumbs-down.svg'

const Card = ({
  category,
  lastUpdated,
  description,
  id,
  name,
  picture,
  style,
  votes
}) =>{
  const [votesCount, setVotesCount] = useState(votes)
  const [votesPercentage, setVotesPercentage] = useState({positive: 50, negative: 50})
  const [voted, setVoted] = useState(false)
  const [selectedVote, setSelectedVote] = useState('')

  const onVoteClick = (e) => {
    setSelectedVote(e.target.getAttribute('data-type'))
  }

  const onButtonClick = (e) => {
    if(voted) {
      flushSync(() => {
        setVoted(false)
        setSelectedVote('')
      })
    } else {
      if (selectedVote) {
        const dataId = e.target.getAttribute('data-id')
        let getData = JSON.parse(window.localStorage.getItem('rulings'))
        let newVotes = {
          positive: selectedVote === 'positive' ? votesCount.positive + 1 : votesCount.positive,
          negative: selectedVote === 'negative' ? votesCount.negative + 1 : votesCount.negative,
        }
        setVotesCount(newVotes)

        const updateData = getData.map(data => {
          return data.id === dataId
          ? {
            ...data,
            votes: newVotes
          }
          : data
        })
        window.localStorage.setItem('rulings', JSON.stringify(updateData))
        setVoted(true)
      }
    }
  }

  useEffect(() => {
    const totalVotes = votesCount.positive + votesCount.negative
    setVotesPercentage({
      positive: Math.round((votesCount.positive*100/totalVotes)*10)/10,
      negative: Math.round((votesCount.negative*100/totalVotes)*10)/10
    })
  },[votesCount])

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + ' years ago';
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months ago';
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days ago';
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours ago';
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes ago';
    }

    if(seconds < 10) return 'just now';

    return Math.floor(seconds) + ' seconds ago';
  }

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
          <div
            className={
              classNames(
                styles.card__votes,
                styles[`card__votes--${style}`]
              )
            }
          >
            <span
              className={
                classNames(
                  styles.card__date,
                  styles[`card__date--${style}`]
                )
              }
            >
              {voted ? 'Thank you for your vote!' : `${timeAgo(new Date(lastUpdated))} in ${category.charAt(0).toUpperCase()}${category.slice(1)}`}
            </span>
            <div
              className={
                classNames(
                  styles.card__vote,
                  styles[`card__vote--${style}`]
                )
              }
            >
              {
                !voted &&
                  <>
                    <Vote style={style} type='positive' isButton action={onVoteClick} selected={selectedVote === 'positive'} />
                    <Vote style={style} type='negative' isButton action={onVoteClick} selected={selectedVote === 'negative'} />
                  </>
              }
              <button
                className={
                  classNames(
                    styles.card__vote__button,
                    styles[`card__vote__button--${style}`]
                  )
                }
                onClick={onButtonClick}
                data-id={id}
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
  lastUpdated: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
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
