# polpol 개발 태스크 리스트 (Task List)

이 문서는 **polpol** 프로젝트 개발을 위한 작업 목록으로, 우선 순위에 따라 나열되어 있습니다. 깃허브 프로젝트, Jira 이슈 등을 생성할 때 활용됩니다.

## Phase 1: 기반 설정 및 프로젝트 초기화 (Foundation)
- [x] Spring Boot 백엔드 초기화 설정 (Java 17+, Spring Web, Security, JPA, MySQL 드라이버).
- [x] React 프론트엔드 초기화 세팅 (Vite, TypeScript, Tailwind CSS 또는 Vanilla CSS, React Router).
- [x] 데이터베이스 스키마 설계 및 테이블 생성, 백엔드와 DB 연결.
- [x] 프론트엔드 ESLint/Prettier 포매터 구성.
- [x] 기초 API 경로(Path) 및 전역 예외 처리(Error Handling) 세팅.
- [x] **[NEW] 개발 환경 자동화**: `dev` 프로필 시딩 시스템 구축 (서버 실행 시 DB 리셋 및 더미 데이터 삽입).

## Phase 2: 인증 및 유저 관리 (Authentication & User Details)
- [x] 유저(User) 엔티티 및 Spring Security 기반 JWT 인증 시스템 구현.
- [x] `@office.kopo.ac.kr` 도메인을 사용한 이메일 인증 절차(SMTP 연동) 구현.
- [x] 회원가입, 로그인 로직 및 자동 로그인 API 구현.
- [x] 프론트엔드 인트로 및 로그인 월(Login-wall) 페이지 개발, 이메일 인증 UI 적용.
- [x] 사용자 세션 관리를 포함한 헤더(Header) 및 사이드 내비게이션 바 개발.

## Phase 3: 이력서(Resume) 중심 데이터 시스템 (핵심 서비스 1)
- [x] 포트폴리오(Portfolio) 및 프로젝트(Project) 엔티티 구성 및 CRUD API 개발.
- [x] 프론트엔드 "마이페이지(대시보드)" 초기 UI 개발.
- [x] 기업 지원 현황(Job Application) 엔티티 및 CRUD API 구현.
- [x] 검색 및 필터링 기능이 포함된 "지원 현황 관리(트래커)" UI 개발.
- [x] **[NEW] 이력서(Resume) 시스템 구축**
  - [x] `Resume` 엔티티 설계 (기술, 경력, 소개글 포함) 및 CRUD API 개발.
  - [x] 활성화된 이력서 조회를 위한 엔드포인트 구현.
  - [x] `Project` 엔티티와 `Resume` 간의 연관 관계 매핑 최적화.
- [ ] **[MODIFY] 마이페이지 고도화 및 데이터 연동**
  - [x] 마이페이지 레이아웃 개편 (디자인 시안 반영) [src/pages/DashboardPage.tsx]
  - [x] 이력서 데이터 기반으로 Skills, Career, Projects 섹션 자동 렌더링.
  - [x] 개인정보(이메일, 학번) 마이페이지 메인뷰에서 제거.
  - [x] 이력서 수정/삭제/기본 설정 기능 구현.
  - [x] 4열 레이아웃 최적화 및 콤팩트 디자인 적용.

## Phase 4: 마이페이지 및 사이드바 구조 고도화 (Restructuring)
- [x] **[MODIFY] 사이드바 레이아웃 개편** [src/components/Sidebar.tsx]
  - [x] My Portfolio, Account, Settings, Help 4대 메뉴 구성.
  - [x] 각 메뉴별 아이콘 및 경로 매핑.
- [x] **[MODIFY] My Portfolio (대시보드) 재구성** [src/pages/DashboardPage.tsx]
  - [x] Profile, About 섹션 제거 (Account로 이동).
  - [x] 섹션 명칭 변경:
    - [x] `experience` -> `work experience`
    - [x] `Top Projects` -> `Projects`
    - [x] `My Resumes` -> `Resumes`
  - [x] `Job Application Tracking` 섹션 추가 및 데이터 연동.
  - [x] 섹션 순서 조정 (Job Application, Resumes, Projects, Skills, Work Experience).
- [x] **[NEW/MODIFY] Account 시스템 구현**
  - [x] 이름 및 비밀번호 변경 기능 추가.
  - [x] 기존 Profile 정보를 이 페이지로 통합.
- [x] **[NEW/MODIFY] Settings & Help 페이지 최적화**
  - [x] 알림, 테마 등 일반 설정 항목 구성.
  - [x] FAQ, 고객 센터 등 도움말 항목 구성.

## Phase 5: 소셜 및 커뮤니티 피드 (Social & Community Feed - 핵심 서비스 2)
- [x] HackerNews 디자인 패턴을 차용한 메인 페이지 "기업 지원 현황 공유 피드" API 구현.
- [x] 기업 지원 현황 목록을 노출할 메인 페이지 통합 UI 개발.
- [x] **[NEW] 채용 시스템 세분화**: 기업 구인(Corporate) 및 프로젝트 구인(Project) 구분 및 엔티티 구현.
- [ ] 학과 맞춤형 자격증 안내/공유 게시판 API 및 프론트엔드 페이지 개발.
- [x] 자유게시판(일반 소통) 및 학과 전용 게시판 백엔드 엔티티(`Post`) 및 시딩 완료.

## Phase 6: polbook - 중고 거래 직거래 플랫폼 (Second-hand Market - 핵심 서비스 3)
- [x] 거래 물품(Trade) 엔티티 및 API 레포지토리 구축.
- [x] polbook(중고 마켓) 더미 데이터 시딩 완료.
- [ ] WebSockets / STOMP를 활용한 1:1 실시간 채팅 기능 구현.
- [ ] 거래완료 후 매너 온도(별점) 평가 시스템 구축.

## Phase 7: 관리자 및 인공지능 스마트 서비스
- [x] 학생회 소통 및 공지사항(`Post` - COUNCIL 카테고리) 백엔드 연동 준비.
- [x] 자주 묻는 질문(FAQ) 백엔드 엔티티 및 정렬 시스템(`sortOrder`) 구현.
- [ ] 인공지능 LLM 기반 Q&A 챗봇 모듈화 및 연결.

## Phase 8: 폴리싱 및 배포 (Polish & Deployment)
- [x] Spring Boot DevTools 설정.
- [ ] 핵심 서비스 로직 단위/통합 테스트 코드 추가.
- [ ] GitHub Actions CI/CD 구축 및 클라우드 배포.
