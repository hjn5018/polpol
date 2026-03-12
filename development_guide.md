# polpol 개발, 테스트, 배포 및 운영 가이드

## 1. 개발 시 운용 방법 (Development Guide)

### 브랜치 전략 (Branch Strategy)
**GitHub Flow** 방식을 사용합니다:
- `main` 브랜치는 항상 동작 및 배포가 가능한 상태를 유지합니다.
- 새로운 기능이나 버그 수정 시 기능 브랜치를 생성합니다 (예: `feat/auth`, `fix/portfolio-bug`).
- 작업이 끝나면 `main` 브랜치로 Pull Request (PR)를 생성하여 병합합니다. 최소 1명의 코드 리뷰(승인)를 거쳐야 합니다.

### 코드 리뷰 및 컨벤션 (Code Review & Conventions)
- **프론트엔드 (React):** ESLint 및 Prettier 기본 설정을 따릅니다. Hook을 사용하는 함수형 컴포넌트 위주로 작성합니다.
- **백엔드 (Spring Boot):** Java 표준 스타일을 지킵니다. 데이터 전송 시에는 DTO를 활용하고, Controller, Service, Repository 계층을 철저히 분리합니다.
- **커밋 메시지:** Conventional Commits 표준을 사용합니다 (예: `feat: 회원가입 이메일 인증 추가`, `fix: 에스크로 결제 오류 수정`).

### 로컬 환경 세팅 (Local Environment Setup)
- **데이터베이스:** 로컬 환경 또는 Docker를 통해 MySQL(혹은 PostgreSQL)을 실행합니다.
- **백엔드:** IDE에서 프로젝트를 열고 `spring-boot:run`을 실행합니다.
- **프론트엔드:** 터미널에서 `npm install` 후 `npm run dev` (또는 `start`)를 실행합니다.

---

## 2. 테스트 방법 (Testing Method)

### 자동화 테스트 (Automated Testing)
- **백엔드:** JUnit 5와 Mockito를 활용하여 단위 테스트를 진행합니다. 이메일 인증이나 직거래 에스크로 등 핵심 서비스는 Spring Boot Test를 통해 통합 테스트를 반드시 거칩니다.
- **프론트엔드:** Jest와 React Testing Library를 사용하여 주요 UI 컴포넌트의 렌더링 및 사용자 상호작용을 테스트합니다.

### 수동 및 통합 검증 (Manual Verification)
- PR을 병합하기 전에, 데스크톱 및 모바일 뷰 모두에서 수동 UI 테스트를 시행합니다.
- **집중적인 수동 테스트가 필요한 주요 플로우:**
  - 회원가입 시 대학 이메일 인증 절차
  - polbook(중고 거래) 에스크로 결제 및 구매 확정 프로세스
  - 포트폴리오(.pdf 파일 및 이미지) 업로드 및 미리보기

---

## 3. 배포 운영 방법 (Deployment & Operation)

### 인프라 구성 (Infrastructure)
- **클라우드 환경:** AWS (Amazon Web Services)
- **프론트엔드 호스팅:** Vercel, Netlify 또는 AWS S3 + CloudFront를 사용하여 자동화된 CI/CD 파이프라인과 글로벌 CDN을 구축합니다.
- **백엔드 호스팅:** AWS EC2 인스턴스 또는 컨테이너 기반의 ECS 서버에 배포합니다.
- **데이터베이스:** 관리형 DB 서비스인 AWS RDS (MySQL/PostgreSQL)를 사용하여 백업과 고가용성을 확보합니다.
- **파일 스토리지:** 사용자가 올리는 책 사진, 포트폴리오 파일 등은 모두 AWS S3에 저장합니다.

### CI/CD 파이프라인 연동 (CI/CD Pipeline)
- **GitHub Actions 연동:**
  - 기능 브랜치 푸시나 PR 생성 시: 프론트/백엔드 자동 테스트 스크립트 실행.
  - `main` 브랜치 병합 시:
    - 프론트엔드: Vercel 또는 Netlify로 자동 빌드 및 배포 활성화.
    - 백엔드: Docker 이미지를 빌드하고 도커 허브(또는 ECR)에 푸시 후 AWS에 자동 재시작 배포.

### 운영 및 모니터링 (Operation & Monitoring)
- **로그 추적:** 에러 및 접속 기록은 AWS CloudWatch 또는 ELK 스택(Elasticsearch, Logstash, Kibana)을 도입하여 모니터링합니다.
- **관리자 기능:** `ADMIN` 권한을 부여받은 학생회 임원 또는 담당 교수가 관리자 대시보드에서 신고 접수 및 유저 제재 조치를 실시간으로 수행할 수 있도록 지원합니다.

---

## 4. 예상 비용 (Estimated Costs)
*(해당 지표는 초기 서비스의 규모(학생 이용자 위주)를 바탕으로 추산한 월 기준 예상 비용입니다.)*

- **도메인(`pol.gg`):** 약 연 $10 ~ $20
- **프론트엔드 호스팅 (Vercel/Netlify 등):** 초기 무료 티어(Free Tier) 적용.
- **백엔드 (AWS EC2 t3.micro/small):** 약 월 $10 ~ $15
- **데이터베이스 (AWS RDS db.t3.micro):** 약 월 $15 ~ $20
- **스토리지 (AWS S3):** 업로드 용량 및 트래픽에 따라 약 월 $1 ~ $5
- **SSL 인증서:** AWS Certificate Manager 또는 Let's Encrypt를 통한 무료 사용.
- **총 예상 유지 비용:** **월 약 $30 ~ $40 (한화 약 4~5만원 수준)**
  *(Note: AWS Educate 또는 GitHub Student Developer Pack의 크레딧을 적용하면 사실상 무료로 일정 기간 이상 서비스 운영이 가능합니다.)*
