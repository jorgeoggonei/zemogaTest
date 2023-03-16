import React from 'react'
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import styles from './Alert.module.scss'
import search from '../../../images/search.svg'

const Alert = ({
  primaryInfo,
  secondaryInfo,
  type
}) =>{
  return (
    <aside
      className={
        classNames(
          styles.alert,
          primaryInfo && styles.alertPrimary,
          !primaryInfo && secondaryInfo && styles.alertSecondary
        )
      }
      role="doc-tip" aria-label="Speak Out"
    >
      {
        primaryInfo &&
        <>
          <div className={styles.alertPrimary__left}>
            <span className={styles.alertPrimary__hairline}>{primaryInfo.hairline}</span>
            <span className={styles.alertPrimary__title}>{primaryInfo.title}</span>
          </div>
          <div className={styles.alertPrimary__right}>
            <p className={styles.alertPrimary__text}>
              {primaryInfo.description}
            </p>
          </div>
          <button className="icon-button" aria-label="close">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g stroke="#000" strokeWidth="2" fill="none" fillRule="evenodd"><path d="M1 19L19 1M1 1l18 18"/></g></svg>
          </button>
        </>
      }
      {
        !primaryInfo && secondaryInfo &&
          <>
            <img
              srcSet={`${secondaryInfo.images.small} 750w, ${secondaryInfo.images.large} 1440w`}
              sizes="(min-width: 750px) 1440px, 100vw"
              className={styles.alertSecondary__background}
              src={secondaryInfo.images.src}
              alt={secondaryInfo.images.alt}
              role="none"
            />
            <div className={styles.alertSecondary__left}>
                <h2 className={styles.alertSecondary__heading}>{secondaryInfo.heading}</h2>
            </div>
            <div className={styles.alertSecondary__right}>
                <button className={styles.alertSecondary__cta}>
                  {secondaryInfo.buttonLabel}
                </button>
            </div>
          </>
      }
    </aside>
  )
}

Alert.propTypes = {
  primaryinfo: PropTypes.shape({
    hairline: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  secondaryInfo: PropTypes.shape({
    images: PropTypes.object,
    heading: PropTypes.string,
    buttonLabel: PropTypes.string
  }),
  type: PropTypes.oneOf(['primary', 'secondary']).isRequired
}

export default Alert
