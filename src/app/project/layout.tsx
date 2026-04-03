import {BackToTop} from '../components/BackToTop'
import Footer from '../components/Footer'
import {Navbar} from '../components/Navbar'

export default function ProjectLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <BackToTop showAfter={360} />
    </div>
  )
}