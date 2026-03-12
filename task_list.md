# polpol 개발 태스크 리스트 (Task List)

이 문서는 **polpol** 프로젝트 개발을 위한 작업 목록으로, 우선 순위에 따라 나열되어 있습니다. 깃허브 프로젝트, Jira 이슈 등을 생성할 때 활용됩니다.

## Phase 1: 기반 설정 및 프로젝트 초기화 (Foundation)
- [x] Spring Boot 백엔드 초기화 설정 (Java 17+, Spring Web, Security, JPA, MySQL 드라이버).
- [x] React 프론트엔드 초기화 세팅 (Vite, TypeScript, Tailwind CSS 또는 Vanilla CSS, React Router).
- [x] 데이터베이스 스키마 설계 및 테이블 생성, 백엔드와 DB 연결.
- [x] 프론트엔드 ESLint/Prettier 포매터 구성.
- [x] 기초 API 경로(Path) 및 전역 예외 처리(Error Handling) 세팅.

## Phase 2: 인증 및 유저 관리 (Authentication & User Details)
- [ ] 유저(User) 엔티티 및 Spring Security 기반 JWT 인증 시스템 구현.
- [ ] `@office.kopo.ac.kr` 도메인을 사용한 이메일 인증 절차(SMTP 연동) 구현.
- [ ] 회원가입, 로그인 로직 및 자동 로그인 API 구현.
- [ ] 프론트엔드 인트로 및 로그인 월(Login-wall) 페이지 개발, 이메일 인증 UI 적용.
- [ ] 사용자 세션 관리를 포함한 헤더(Header) 및 사이드 내비게이션 바 개발.

## Phase 3: 커리어 & 포트폴리오 (Career & Portfolio - 핵심 서비스 1)
- [ ] 포트폴리오 엔티티 구성 및 CRUD API 개발 (파일 업로드 AWS S3 연동 포함).
- [ ] 프론트엔드 "마이페이지" 대시보드 UI 개발.
- [ ] 포트폴리오 에디터 폼 UI 구현 (프로젝트, 보유 기술, 경력, 자격증 등).
- [ ] 기업 지원 현황(Job Application) 엔티티 및 CRUD API 구현.
- [ ] 검색 및 필터링 기능이 포함된 "지원 현황 관리(트래커)" 프론트엔드 UI 개발.

## Phase 4: 소셜 및 커뮤니티 피드 (Social & Community Feed - 핵심 서비스 2)
- [ ] HackerNews 디자인 패턴을 차용한 메인 페이지 "기업 지원 현황 공유 피드" API 구현.
- [ ] 기업 지원 현황 목록을 노출할 메인 페이지 통합 UI 개발.
- [ ] 학과 맞춤형 자격증 안내/공유 게시판 API 및 프론트엔드 페이지 개발.
- [ ] 자유게시판(일반 소통) 및 학기별 커리큘럼/시간표 조회 기능(API/프론트엔드) 개발.

## Phase 5: polbook - 중고 거래 직거래 플랫폼 (Second-hand Market - 핵심 서비스 3)
- [ ] 거래 물품(Market Item) 엔티티 및 API 개발 (업로드/수정/상태변경 등, 책 사진 업로드 S3 연동).
- [ ] polbook 전용 페이지 리스트 UI 개발 (검색 및 카테고리/강의 필터 적용).
- [ ] 중고 서적 등록 및 물품 상세정보 UI 개발.
- [ ] 에스크로 안전결제 기반(Transaction) 시스템 API 구현 (가상의 포인트 충전 또는 포트원 등 테스트 결제망 도입 고려).
- [ ] WebSockets / STOMP를 활용한 1:1 실시간 채팅 기능 백엔드/웹 구현.
- [ ] 거래완료 후 매너 온도(별점) 평가 시스템 구축 및 프로필 노출 시스템 개발.

## Phase 6: 관리자 및 인공지능 스마트 서비스 (Admin & Smart Services)
- [ ] 학생회 소통 페이지 전용 게시물(공지사항, 설문조사, FAQ) 시스템 구축.
- [ ] 불량 유저 등 신고 내용을 접수하고 정지 처리할 수 있는 권한 관리(Admin Dashboard) 페이지 개발.
- [ ] 인공지능 LLM 모델 프로토타입 연결 (학점, 자격증, 시간표 등을 물어보는 Q&A 챗봇 모듈화).
- [ ] 유튜브 직무/취업/면접 명언 및 정보성 영상을 메인 페이지 하단에 제공하는 큐레이션 영역 추가.

## Phase 7: 폴리싱 및 배포 (Polish & Deployment)
- [ ] 핵심 서비스 로직에 대한 미완성 단위/통합 테스트 코드 추가 및 최종 점검.
- [ ] 디바이스 호환성(모바일/데스크탑 등) 및 UI를 검증하는 E2E(전구간 수동) 테스트 수행.
- [ ] GitHub Actions를 통한 CI/CD 통합 및 무중단 배포 스크립트 작성.
- [ ] AWS (RDS, EC2, S3) 및 Vercel 환경을 바탕으로 프로덕션용 최종 인프라 배포.
