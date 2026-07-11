import { useState } from 'react'
import {
  CalendarDays,
  Camera,
  CircleUserRound,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Play,
  Radio,
  UsersRound,
  X,
} from 'lucide-react'
import aboutVideoThumb from './assets/about-video-thumb.jpg'
import churchLogo from './assets/cbr-barao-logo.svg'
import congressoFamiliasImage from './assets/congresso-familias.jpg'
import incendeiaImage from './assets/incendeia-2026.jpg'
import heroImage from './assets/worship-service.jpg'
import revoLogo from './assets/revo-tecnologia-logo.png'
import instagramPost1 from './assets/instagram-post-1.jpg'
import instagramPost2 from './assets/instagram-post-2.jpg'
import instagramPost3 from './assets/instagram-post-3.jpg'
import ebfImage from './assets/instagram-post-5.jpg'
import instagramPost4 from './assets/instagram-post-4.jpg'
import instagramPost6 from './assets/instagram-post-6.jpg'
import youtubeMessage1 from './assets/youtube-message-1.jpg'
import youtubeMessage2 from './assets/youtube-message-2.jpg'
import youtubeMessage3 from './assets/youtube-message-3.jpg'
import youtubeMessage4 from './assets/youtube-message-4.jpg'
import './App.css'

const navItems = ['Sobre', 'Cultos', 'Conexões', 'Eventos', 'Mídias', 'Contato']

const shortcuts = [
  { icon: MapPin, title: 'Cultos', text: 'Horários e locais', tone: 'navy', href: '#cultos' },
  { icon: CalendarDays, title: 'Eventos', text: 'Veja o que vem por aí', tone: 'pink', href: '#eventos' },
  { icon: HeartHandshake, title: 'Células', text: 'Faça parte de um grupo', tone: 'amber', href: '#conexoes' },
  { icon: HeartHandshake, title: 'Exerça sua generosidade', text: 'Abra o PDF', tone: 'green', action: 'generosity' },
]

const worshipCards = [
  { title: 'Culto da família', info: 'Domingo • 18h30', text: 'Presencial e Online', tone: 'violet' },
  { title: 'Quarta profética', info: 'Quarta • 19h30', text: 'Presencial', tone: 'rose' },
]

const eventCards = [
  {
    title: 'EBF Restaura Kids',
    date: '27 Jun • 8h30',
    text: 'Pequenos jogadores, grandes campeões em Cristo.',
    image: ebfImage,
    tone: 'kids-event',
    href: 'https://www.instagram.com/p/DaKtZK4Fmhw/',
  },
  {
    title: 'Congresso de famílias',
    date: '06 e 07 Jun',
    text: 'Uma família restaurando famílias.',
    image: congressoFamiliasImage,
    tone: 'family-event',
    href: 'https://www.instagram.com/reel/DZJKACMBlCe/',
  },
  {
    title: 'Incendeia 2026',
    date: '04 e 05 Abr',
    text: 'Uma geração fervorosa servindo ao Senhor.',
    image: incendeiaImage,
    tone: 'fire-event',
    href: 'https://www.instagram.com/p/DVFDl6gj4UJ/',
  },
]

const connectItems = [
  { icon: UsersRound, title: 'Células', text: 'Grupos pequenos para crescer juntos' },
  { icon: HeartHandshake, title: 'Ministérios', text: 'Descubra seus dons e sirva conosco' },
  { icon: CircleUserRound, title: 'Jovens', text: 'Um lugar para ser você e ir além' },
  { icon: MapPin, title: 'Kids', text: 'Diversão e ensino para os pequenos' },
]

const youtubeMessages = [
  {
    image: youtubeMessage1,
    url: 'https://www.youtube.com/watch?v=5fNEux0CT7w',
    date: '05 jul',
    title: 'Conexão Brasas - Comunidade Batista da Restauração',
  },
  {
    image: youtubeMessage2,
    url: 'https://www.youtube.com/watch?v=Vtc9FJlx9Nk',
    date: '05 jul',
    title: 'Culto da Família | CBR Barão 05/07/2026',
  },
  {
    image: youtubeMessage3,
    url: 'https://www.youtube.com/watch?v=wjDvQt1w980',
    date: '05 jul',
    title: 'Culto da Família | Comunidade Batista da Restauração',
  },
  {
    image: youtubeMessage4,
    url: 'https://www.youtube.com/watch?v=A-8dbvURPT0',
    date: '04 jul',
    title: 'Culto de Mulheres | CBR Barão',
  },
]

const instagramPosts = [
  {
    image: instagramPost1,
    url: 'https://www.instagram.com/p/DabOgqjlsbD/',
    date: '05 jul',
    type: 'Post',
    title: 'Manhã de adoração e Santa Ceia',
  },
  {
    image: instagramPost2,
    url: 'https://www.instagram.com/p/DaVAlGJkYqD/',
    date: '03 jul',
    type: 'Post',
    title: 'Quarta Profética de mulheres',
  },
  {
    image: instagramPost3,
    url: 'https://www.instagram.com/p/DaP6bFzFnki/',
    date: '01 jul',
    type: 'Post',
    title: 'Culto em horário especial',
  },
  {
    image: instagramPost4,
    url: 'https://www.instagram.com/reel/DaLG-4jRvZI/',
    date: '29 jun',
    type: 'Reel',
    title: 'EBF 2026 - Restaura Kids',
  },
  {
    image: ebfImage,
    url: 'https://www.instagram.com/p/DaKtZK4Fmhw/',
    date: '29 jun',
    type: 'Post',
    title: 'Pequenos campeões em Cristo',
  },
  {
    image: instagramPost6,
    url: 'https://www.instagram.com/p/DaBHzNJkeaE/',
    date: '25 jun',
    type: 'Post',
    title: 'Uma casa para pertencer',
  },
]

function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="CBR Barão">
      <img src={churchLogo} alt="CBR Barão" />
    </a>
  )
}

function ImageCard({ children, className = '', image = heroImage }) {
  return (
    <article className={`image-card ${className}`}>
      <img src={image} alt="" />
      <div className="card-shade" />
      <div className="image-card-content">{children}</div>
    </article>
  )
}

function App() {
  const [isGenerosityOpen, setIsGenerosityOpen] = useState(false)

  return (
    <div className="page" id="inicio">
      <main className="home-grid">
        <section className="left-pane">
          <header className="site-header">
            <Logo />

            <nav className="main-nav" aria-label="Navegação principal">
              {navItems.map((item) => (
                <a href={`#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`} key={item}>
                  {item}
                </a>
              ))}
            </nav>

            <a className="outline-pill" href="https://api.whatsapp.com/message/WZLSCBULAVJOH1?autoload=1&app_absent=0">
              Fale conosco
              <MessageCircle size={16} />
            </a>
          </header>

          <section className="hero-block">
            <img src={heroImage} alt="" />
            <div className="hero-overlay" />
            <div className="hero-copy">
              <p>
                <span>Comunidade</span>
                <span>Batista da</span>
              </p>
              <h1>Restauração</h1>

              <div className="hero-buttons">
                <a className="solid-button" href="https://www.google.com/maps/place/Comunidade+Batista+da+Restaura%C3%A7%C3%A3o/@-1.4375273,-48.4563431,486m/data=!3m1!1e3!4m14!1m7!3m6!1s0x92a48c72789e078d:0x14b1fa103e3b05f7!2sComunidade+Batista+da+Restaura%C3%A7%C3%A3o!8m2!3d-1.4370204!4d-48.4558305!16s%2Fg%2F1q4kmvhcb!3m5!1s0x92a48c72789e078d:0x14b1fa103e3b05f7!8m2!3d-1.4370204!4d-48.4558305!16s%2Fg%2F1q4kmvhcb?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D">
                  Venha nos visitar
                  <MapPin size={16} />
                </a>
                <a className="ghost-button" href="https://www.youtube.com/@cbrbarao3012">
                  Assista ao vivo
                  <Radio size={16} />
                </a>
              </div>
            </div>
          </section>

          <section className="shortcut-bar" aria-label="Atalhos">
            {shortcuts.map(({ icon: Icon, title, text, tone, action, href = '#contato' }) => {
              const content = (
                <>
                  <span className={`shortcut-icon ${tone}`}>
                    <Icon size={25} />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </>
              )

              if (action === 'generosity') {
                return (
                  <button className="shortcut generosity-shortcut" type="button" key={title} onClick={() => setIsGenerosityOpen(true)} aria-haspopup="dialog" aria-expanded={isGenerosityOpen}>
                    {content}
                  </button>
                )
              }

              return (
                <a className="shortcut" href={href} key={title}>
                  {content}
                </a>
              )
            })}
          </section>

          <section className="section-block" id="cultos">
            <div className="section-title">
              <h2>Nossos encontros</h2>
            </div>

            <div className="worship-grid">
              {worshipCards.map((card) => (
                <ImageCard className={`worship-card ${card.tone}`} key={card.title}>
                  <h3>{card.title}</h3>
                  <strong>{card.info}</strong>
                  <p>{card.text}</p>
                </ImageCard>
              ))}
            </div>

            <div className="center-action">
              <a className="outline-button" href="#cultos">Ver todos os cultos</a>
            </div>
          </section>

          <section className="about-block" id="sobre">
            <div className="about-photo">
              <video
                controls
                playsInline
                poster={aboutVideoThumb}
                preload="metadata"
                onLoadedMetadata={(event) => {
                  event.currentTarget.muted = false
                  event.currentTarget.volume = 1
                }}
              >
                <source src="/about-cbr-video.mp4?v=audio-20260711" type="video/mp4" />
              </video>
            </div>
            <div className="about-copy">
              <span>Sobre nós</span>
              <h2>Uma familia, restaurando familias</h2>
              <p>
                Aqui, você encontra aceitação, propósito e um lugar para crescer. Juntos,
                seguimos Jesus e fazemos a diferença.
              </p>
            </div>
          </section>
        </section>

        <aside className="right-pane">
          <section className="side-section" id="eventos">
            <div className="side-heading">
              <h2>Eventos</h2>
              <a href="#eventos">Ver todos</a>
            </div>

            <div className="event-grid">
              {eventCards.map((event, index) => (
                <ImageCard className={`event-card event-${index + 1} ${event.tone ?? ''}`} image={event.image} key={event.title}>
                  <h3>{event.title}</h3>
                  <strong>{event.date}</strong>
                  <p>{event.text}</p>
                  <a href={event.href ?? '#eventos'} target={event.href ? '_blank' : undefined} rel={event.href ? 'noreferrer' : undefined}>Saiba mais</a>
                </ImageCard>
              ))}
            </div>
          </section>

          <section className="side-section instagram-section">
            <div className="side-heading">
              <h2>No Instagram <span>| @cbr_belem</span></h2>
              <a href="https://www.instagram.com/cbr_belem/" target="_blank" rel="noreferrer">Ver perfil</a>
            </div>

            <div className="instagram-strip">
              {instagramPosts.map((post) => (
                <a className="instagram-card" href={post.url} target="_blank" rel="noreferrer" key={post.url} aria-label={`Abrir ${post.title} no Instagram`}>
                  <img src={post.image} alt={post.title} />
                  <span className="instagram-card-type">{post.type}</span>
                  <span className="instagram-card-info">
                    <small>{post.date}</small>
                    <strong>{post.title}</strong>
                  </span>
                </a>
              ))}
            </div>
          </section>

          <section className="connect-banner" id="conexoes">
            <div className="connect-bg">
              <img src={heroImage} alt="" />
            </div>
            <div className="connect-copy">
              <h2>Faça parte da CBR Barão</h2>
              <p>Conexões que transformam vidas!</p>
              <div className="connect-grid">
                {connectItems.map(({ icon: Icon, title, text }) => (
                  <div className="connect-item" key={title}>
                    <span><Icon size={19} /></span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </div>
                ))}
              </div>
              <a className="solid-button" href="https://docs.google.com/forms/d/e/1FAIpQLSdaJLZTGpUQx2diScP4s5tqulGn_BUZxQhpN83qBblZ7mximg/viewform?usp=publish-editor">Quero me conectar</a>
            </div>
          </section>

          <section className="side-section" id="midias">
            <div className="side-heading">
              <h2>Últimas mensagens</h2>
              <a href="https://www.youtube.com/@cbrbarao3012" target="_blank" rel="noreferrer">Ver todas</a>
            </div>

            <div className="message-grid">
              {youtubeMessages.map((message) => (
                <a className="message-card" href={message.url} target="_blank" rel="noreferrer" key={message.url} aria-label={`Assistir ${message.title} no YouTube`}>
                  <span className="play-icon"><Play size={16} fill="currentColor" /></span>
                  <img src={message.image} alt={message.title} />
                  <strong>{message.title}</strong>
                  <small>{message.date} | YouTube</small>
                </a>
              ))}
            </div>
          </section>

          <section className="prayer-strip" id="contato">
            <div>
              <h2>Precisa de oração ou quer falar conosco?</h2>
              <p>Estamos aqui por você!</p>
            </div>
            <a href="https://api.whatsapp.com/message/WZLSCBULAVJOH1?autoload=1&app_absent=0" target="_blank" rel="noreferrer">
              <MessageCircle size={17} />
              Chamar no WhatsApp
            </a>
          </section>

          <footer className="footer">
            <div className="footer-brand">
              <Logo />
              <p>Uma família restaurando famílias em Belém.</p>
              <div className="social-row">
                <a href="https://www.instagram.com/cbr_belem/" aria-label="Instagram" target="_blank" rel="noreferrer"><Camera size={17} /></a>
                <a href="https://www.youtube.com/@cbrbarao3012" aria-label="YouTube" target="_blank" rel="noreferrer"><Play size={17} /></a>
                <a href="https://api.whatsapp.com/message/WZLSCBULAVJOH1?autoload=1&app_absent=0" aria-label="WhatsApp" target="_blank" rel="noreferrer"><MessageCircle size={17} /></a>
              </div>
            </div>

            <nav className="footer-column" aria-label="Mapa do site">
              <strong>Links</strong>
              <a href="#sobre">Sobre</a>
              <a href="#cultos">Cultos</a>
              <a href="#conexoes">Conexões</a>
              <a href="#eventos">Eventos</a>
              <a href="#midias">Mídias</a>
              <a href="#contato">Contato</a>
            </nav>

            <div className="footer-column">
              <strong>Contato</strong>
              <span>(91) 98497-1018</span>
              <span>Tv. Barão do triunfo, 3683</span>
              <span>Marco, Belém - PA</span>
              <div className="footer-credit">
                <span>Desenvolvido por:</span>
                <img src={revoLogo} alt="Revo Tecnologia" />
              </div>
            </div>

            <div className="footer-bottom">
              <small>Copyright © 2026 CBR Barão. Todos os direitos reservados.</small>
            </div>
          </footer>
        </aside>
      </main>

      {isGenerosityOpen && (
        <div className="pdf-modal" role="dialog" aria-modal="true" aria-label="Exerça sua generosidade" onClick={() => setIsGenerosityOpen(false)}>
          <div className="pdf-modal-panel" onClick={(event) => event.stopPropagation()}>
            <div className="pdf-modal-header">
              <div>
                <span>Generosidade</span>
                <h2>Exerça sua generosidade</h2>
              </div>
              <button type="button" onClick={() => setIsGenerosityOpen(false)} aria-label="Fechar popup">
                <X size={20} />
              </button>
            </div>

            <div className="pdf-image-wrap">
              <img src="/generosidade-render.png" alt="Exerça sua generosidade" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
