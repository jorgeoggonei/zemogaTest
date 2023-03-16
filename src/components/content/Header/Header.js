import React from 'react'
import { PropTypes } from 'prop-types'
import classNames from 'classnames'
import styles from './Header.module.scss'
import search from '../../../images/search.svg'

const Header = ({links}) =>{
  return (
    <nav className={styles.nav} role="navigation">
      <div className="max-centered">
        <h1 className={styles.nav__logo}>Rule of thumb.</h1>
        <button className={classNames(styles.nav__hamburger, 'icon-button')} alt="Open Menu">
          <svg width="25" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h25v4H0V0zm0 8h25v4H0V8zm0 8h25v4H0v-4z" fill="#FFF" fillRule="nonzero"/></svg>
        </button>
        <ul className={styles.nav__links}>
          {
            links?.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.url}>{link.label}</a>
                </li>
              )
            })
          }
          <li>
            <form>
              <input className={styles['nav__search-input']} aria-label="search" type="text" />
              <button className={classNames(styles.nav__search, 'icon-button')} alt="Search" type="submit">
                <img src={search} alt="search" />
              </button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  )
}

Header.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    link: PropTypes.string
  }))
}

export default Header
