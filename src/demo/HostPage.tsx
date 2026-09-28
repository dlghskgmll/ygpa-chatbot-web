import { Camera, ClipboardCheck, FileBadge, Megaphone, Monitor, PhoneCall } from 'lucide-react'
import styles from './HostPage.module.css'

const NAV = ['열린경영', '항만운영', '민원서비스', '국민소통', 'ESG경영', 'YGPA']

const QUICK_LINKS = [
  { label: '사진촬영 신청', icon: Camera },
  { label: '항만시설 견학신청', icon: ClipboardCheck },
  { label: '실적 증명서', icon: FileBadge },
  { label: '통합 신고센터', icon: PhoneCall },
  { label: '국민신문고', icon: Megaphone },
  { label: 'Port-MIS', icon: Monitor },
]

/**
 * 위젯 시연용 호스트 페이지. 실제 YGPA 홈페이지가 아니며,
 * 실서비스에서는 위젯 스크립트만 기존 홈페이지에 삽입한다.
 */
export function HostPage() {
  return (
    <div className={styles.page}>
      <p className={styles.demoBadge}>위젯 시연용 데모 페이지 · 실제 YGPA 홈페이지 아님</p>

      <header className={styles.header}>
        <img
          className={styles.logo}
          src={`${import.meta.env.BASE_URL}assets/ygpa-logo-ko.png`}
          alt="여수광양항만공사"
          width={220}
          height={23}
        />
        <nav aria-label="주 메뉴">
          <ul className={styles.nav}>
            {NAV.map((item) => (
              <li key={item}>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroRule} aria-hidden="true" />
          <p className={styles.eyebrow}>대한민국 수출입을 선도하는</p>
          <h1 className={styles.headline}>스마트 그린 종합항만</h1>

          <div className={styles.tabs} role="presentation">
            <span className={styles.tabActive}>민원서비스</span>
            <span>선사/운송사</span>
            <span>일반국민</span>
          </div>

          <ul className={styles.quick}>
            {QUICK_LINKS.map(({ label, icon: Icon }) => (
              <li key={label}>
                <a href="#" onClick={(e) => e.preventDefault()}>
                  <span className={styles.quickIcon}>
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
