# YGPA AI 업무도우미 — 웹 위젯

여수광양항만공사(YGPA) 홈페이지에 붙는 RAG 챗봇 프론트엔드. 캡스톤디자인 팀 크롤러.

**데모**: https://dlghskgmll.github.io/ygpa-chatbot-web/ (홈페이지 캡처 배경 + 목업 응답, `main` push 시 자동 배포)

## 실행

```bash
npm install
npm run dev        # http://localhost:5173
```

백엔드가 준비되기 전까지 `.env`의 `VITE_USE_MOCK=true`로 MSW 목업 응답을 쓴다. FastAPI(`localhost:8000`)와 연동할 때는 `false`로 바꾸면 개발 서버가 `/api`를 프록시한다.

### 실제 YGPA 홈페이지 위에서 시연 (`/host/`)

브라우저에서 YGPA 메인 페이지를 **"웹페이지, 전체"**로 저장한 뒤 변환한다. `host/`는 실제 기관 페이지 복제본이라 git에 올리지 않는다(`.gitignore`). 로컬 시연 전용이고 공개 배포하지 않는다.

```bash
npm run prepare-host -- ~/Desktop/여수광양항만공사.html
npm run dev        # http://localhost:5173/host/
```

- 이미지·영상은 ygpa.or.kr에서 실시간으로 불러오므로 인터넷이 필요하다. 인터넷이 없으면 캡처 배경 데모 `/`를 쓴다.
- `host/`는 공개 배포하지 않는다. 실제 기관 사이트의 동작하는 복제본이라 피싱·사칭으로 판정될 수 있다. 공개 데모는 캡처 이미지(`public/assets/ygpa-home-capture*.webp`)만 쓴다.
- 네이버 애널리틱스는 제거한다 (로컬 시연이 YGPA 통계에 잡히지 않게).
- 위젯은 Shadow DOM 안에 렌더링되어, 사이트의 전역 CSS(`button{padding:0}`, `html{line-height:1}` 등)와 서로 간섭하지 않는다.

### 목업으로 볼 수 있는 시나리오

| 입력 | 결과 (Figma 프레임) |
|---|---|
| "입항 절차를 알려주세요." | 입항 개요 → 외항선/내항선 선택 (04) |
| └ 외항선 절차 자세히 | 확장 화면 상세 답변 (05) → `[1]`·참고자료 누르면 근거 패널 (06) |
| └ 내항선 절차 자세히 | 근거 부족 안내 (WF-06) |
| "견학 신청은 어디서 하나요?" | 짧은 답변 + 신청 버튼 (03) |
| "오류 테스트" | 기술 오류 + 다시 시도 (WF-07) |
| 그 밖의 질문 | 근거 부족 안내 |

## 구조

```
src/
  api/types.ts        백엔드와 공유하는 응답 계약 (docs/api-contract.md)
  api/client.ts       fetch 래퍼, 기술 오류(ApiError) 구분
  mocks/              MSW 핸들러와 Figma 시나리오 데이터
  embed.tsx           외부 홈페이지 삽입용 진입점 (host/index.html에서 로드)
  main.tsx            간이 데모 페이지(/) 진입점
  widget/
    mount.tsx         Shadow DOM 마운트, 위젯 CSS 격리, visual viewport 보정
    ChatWidget.tsx    런처 · 컴팩트(440px) · 확장(1100px) 셸, 포커스 관리
    useChat.ts        화면 스택 상태 (질문 → 되묻기 → 상세, 뒤로가기)
    WelcomeView.tsx   업무 카드 · 예시 질문 (02)
    ScreenView.tsx    답변 · 되묻기 · 근거 부족 · 처리 중 · 오류 · 다음 단계 바
    SourcePanel.tsx   근거 패널 (06)
    HelpDialog.tsx    이용안내 (07)
  demo/CapturePage.tsx  홈페이지 캡처 배경 데모 (공개 데모·오프라인 시연용, 복제본 아님)
  styles/tokens.css   디자인 토큰 (:root / :host 공용)
  styles/widget-base.css  Shadow DOM 기본값 (호스트 상속값 초기화)
scripts/prepare-host.mjs  저장한 YGPA 페이지 → host/ 변환
```

## 디자인 기준

- Figma: `YGPA AI 업무도우미 — UIUX Design` (Prototype 페이지 01~07)
- KRDS 자체 상징 기준: 본문 16px 이상, 행간 1.5 이상, 포커스 표시
- 귀동이: `public/assets/guidongi-*.svg`. 매뉴얼상 비율·색상 변경 금지이므로 크기만 조절한다.
- `tokens.css`의 색상은 Figma 렌더링에서 추정한 값이라, Figma 원본 값으로 교체해야 한다.
