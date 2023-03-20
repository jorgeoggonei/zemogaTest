import React from 'react'

import Header from './components/content/Header'
import Footer from './components/content/Footer'
import Banner from './components/content/Banner'
import Alert from './components/content/Alert/Alert'
import Rulings from './components/content/Rulings'

import smallBanner from './images/pope-francis.png'
import largeBanner from './images/pope-francis.@2x.png'
import peopleSmall from './images/bg-people.png'
import peopleLarge from './images/bg-people.@2x.png'

import './styles/global.scss'

const App = () =>{
  return (
    <>
      <Header
        links={
          [
            {label: 'Past Trials', url: '#'},
            {label: 'How It Works', url: '#'},
            {label: 'Login / Sign Up', url: '#'}
          ]
        }
      />
      <Banner
        images={{
          small: smallBanner,
          large: largeBanner,
          src: smallBanner,
          alt: 'Pope Francis'
        }}
      />
      <div className="max-centered">
        <Alert
          type='primary'
          primaryInfo={{
            hairline: 'Speak out. Be heard.',
            title: 'Be counted',
            description: 'Rule of Thumb is a crowd sourced court of public opinion where anyone and everyone can speak out and speak freely. It’s easy: You share your opinion, we analyze and put the data in a public report.'
          }}
        />
        <main role="main">
          <Rulings
            title={'Previous Rulings'}
          />
        </main>
        <Alert
          type='secondary'
          secondaryInfo={{
            images: {
              small: peopleSmall,
              large: peopleLarge,
              src: peopleSmall,
              alt: ''
            },
            heading: 'Is there anyone else you would want us to add?',
            buttonLabel: 'Submit a name'
          }}
        />
        <hr role="separator" />
        <Footer
          links={
            [
              {label: 'Terms and Conditions', url: '#'},
              {label: 'Privacy Policy', url: '#'},
              {label: 'Contact Us', url: '#'}
            ]
          }
        />
      </div>
    </>
  )
}

export default App
