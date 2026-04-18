import React, { useState, useRef, useEffect } from 'react'
import canvasConfetti from 'canvas-confetti'
import './App.css'

function App() {
   const [isPlaying, setIsPlaying] = useState(false)
   const [isVideoVisible, setIsVideoVisible] = useState(false)
   const videoRef = useRef(null)

   // Ваш текст поздравления (меняйте прямо здесь!)
   const greetingText = `С праздником!

Пусть ты с каждым годом будешь становиться только счастливее. Желаем счастья, улыбок и исполнения самых заветных желаний.

Пусть всё задуманное обязательно сбудется, а каждый новый день дарит вдохновение и прекрасное настроение для исполнения старых мечт и появления новых  ✨

С наилучшими пожеланиями - Дашка и Юрашка!`

   // Запускаем конфетти при загрузке
   useEffect(() => {
      // Первый залп сразу
      setTimeout(() => {
         fireConfetti()
      }, 300)

      // Повторяем каждые 4 секунды
      const interval = setInterval(() => {
         fireConfetti()
      }, 5000)

      return () => clearInterval(interval)
   }, [])

   const fireConfetti = () => {
      const count = 100
      const defaults = {
         origin: { y: 0.7 },
         zIndex: 9999,
      }

      function fire(particleRatio, opts) {
         canvasConfetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
         })
      }

      fire(0.25, {
         spread: 26,
         startVelocity: 55,
      })
      fire(0.2, {
         spread: 60,
      })
      fire(0.35, {
         spread: 100,
         decay: 0.91,
         scalar: 0.8,
      })
      fire(0.1, {
         spread: 120,
         startVelocity: 25,
         decay: 0.92,
         scalar: 1.2,
      })
      fire(0.1, {
         spread: 120,
         startVelocity: 45,
      })

      // Дополнительные разноцветные конфетти
      canvasConfetti({
         particleCount: 100,
         spread: 70,
         origin: { x: 0.3, y: 0.6 },
         colors: [
            '#ff0000',
            '#00ff00',
            '#0000ff',
            '#ffff00',
            '#ff00ff',
            '#00ffff',
         ],
      })

      canvasConfetti({
         particleCount: 100,
         spread: 70,
         origin: { x: 0.7, y: 0.6 },
         colors: [
            '#ffd700',
            '#ff69b4',
            '#ff4500',
            '#9400d3',
            '#00ced1',
            '#ff6347',
         ],
      })
   }

   const toggleVideo = () => {
      if (!isVideoVisible) {
         setIsVideoVisible(true)
         setTimeout(() => {
            if (videoRef.current) {
               videoRef.current.play()
               setIsPlaying(true)
               fireConfetti()
            }
         }, 100)
      } else {
         if (videoRef.current) {
            if (isPlaying) {
               videoRef.current.pause()
               setIsPlaying(false)
            } else {
               videoRef.current.play()
               setIsPlaying(true)
            }
         }
      }
   }

   // Обработчик ручного запуска конфетти
   const handleConfettiClick = () => {
      fireConfetti()
   }

   return (
      <div className="app">
         {/* Декоративный фон с частицами (только CSS) */}
         <div className="snowflakes" aria-hidden="true">
            <div className="snowflake">✨</div>
            <div className="snowflake">🎉</div>
            <div className="snowflake">⭐</div>
            <div className="snowflake">💫</div>
            <div className="snowflake">🌟</div>
            <div className="snowflake">🎈</div>
            <div className="snowflake">🪩</div>
            <div className="snowflake">💎</div>
         </div>

         <div className="container">
            {/* Шапка с гирляндой */}
            <header className="header-wrapper">
               <h1 className="title">
                  <span>С</span> <span>П</span> <span>Р</span> <span>А</span>{' '}
                  <span>З</span> <span>Д</span> <span>Н</span> <span>И</span>{' '}
                  <span>К</span> <span>О</span> <span>М</span> <span>!</span>
               </h1>
               {/* Кнопка конфетти справа от заголовка */}
               <button
                  className="confetti-trigger"
                  onClick={handleConfettiClick}
               >
                  🎊
               </button>
            </header>

            {/* Блок для текста поздравления */}
            <div className="greeting-card">
               <div className="card-inner">
                  <div className="card-content">
                     {greetingText.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                     ))}
                  </div>
                  <div className="card-border-glow"></div>
               </div>
            </div>

            {/* Кнопка показа видео */}
            {!isVideoVisible && (
               <button className="show-video-button" onClick={toggleVideo}>
                  <span className="show-video-icon">🎬</span>
                  <span className="show-video-text">ОТКРЫТЬ СЮРПРИЗ</span>
                  <span className="show-video-arrow">✨</span>
               </button>
            )}

            {/* Видеоплеер - появляется только после нажатия */}
            {isVideoVisible && (
               <div className="video-section visible">
                  <div className="video-container">
                     <video
                        ref={videoRef}
                        className="video-player"
                        src="/vid.mov"
                        playsInline
                        webkit-playsinline="true"
                        x5-playsinline="true"
                        preload="metadata"
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                        onContextMenu={(e) => e.preventDefault()}
                        onEnded={() => setIsPlaying(false)}
                        onPause={() => setIsPlaying(false)}
                     />
                     {/* Кастомная кнопка Play/Pause */}
                     <button
                        className={`play-button ${isPlaying ? 'playing' : ''}`}
                        onClick={toggleVideo}
                     >
                        <span className="play-icon">
                           {isPlaying ? '⏸️' : '▶️'}
                        </span>
                        <span className="button-text">
                           {isPlaying ? 'ПАУЗА' : 'СМОТРЕТЬ'}
                        </span>
                     </button>
                  </div>
                  {/* <p className="video-hint">нажми для паузы ✨</p> */}
               </div>
            )}

            <footer className="footer">
               <p>💖 Поздравляем! 💖</p>
            </footer>
         </div>
      </div>
   )
}

export default App
