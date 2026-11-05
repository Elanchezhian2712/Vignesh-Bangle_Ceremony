import { useEffect, useState } from 'react'
import Intro from './components/Intro.jsx'
import Decorations from './components/Decorations.jsx'
import FilmGrain from './components/FilmGrain.jsx'
import Hero from './components/Hero.jsx'
import Countdown from './components/Countdown.jsx'
import Parents from './components/Parents.jsx'
import Events from './components/Events.jsx'
import Gallery from './components/Gallery.jsx'
import GuessGame from './components/GuessGame.jsx'
import Rsvp from './components/Rsvp.jsx'
import Wishes from './components/Wishes.jsx'
import Footer from './components/Footer.jsx'
import ShareDock from './components/ShareDock.jsx'
import MusicToggle from './components/MusicToggle.jsx'

export default function App() {
  const [opened, setOpened] = useState(false)

  // Browsers restore the previous scroll position on reload, which would
  // drop a returning guest into the middle of the invitation. The envelope
  // should always hand them the first page.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  function open() {
    window.scrollTo(0, 0)
    setOpened(true)
  }

  return (
    <>
      <div className="bg-wash" aria-hidden="true" />
      <FilmGrain />
      <div className="vignette" aria-hidden="true" />

      <Intro onOpen={open} />
      <Decorations />

      <main>
        <Hero opened={opened} />
        <Countdown />
        <Parents />
        <Events />
        <Gallery />
        <GuessGame />
        <Rsvp />
        <Wishes />
        <Footer />
      </main>

      <ShareDock />
      <MusicToggle startSignal={opened} />
    </>
  )
}
