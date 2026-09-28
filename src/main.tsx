/**
 * 간이 데모 페이지 진입점 (/). 인터넷 없이도 뜨는 대체 시연용.
 * 실제 홈페이지 위 시연은 /host/ (src/embed.tsx) 를 쓴다.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HostPage } from './demo/HostPage'
import { enableMocking } from './mocks/enable'
import { mountWidget } from './widget/mount'
import './styles/global.css'

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <HostPage />
    </StrictMode>,
  )
  mountWidget()
})
