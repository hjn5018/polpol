# polpol (폴폴)

> AI융합소프트웨어과 학생들을 위한 취업 특화 커뮤니티 및 커리어 관리 플랫폼

**polpol**은 인천 폴리텍 II 대학 AI융합소프트웨어과 학우들이 포트폴리오를 관리하고, 실제 취업 현황을 공유하며, 교내 중고 거래(polbook) 등 캠퍼스 생활을 더욱 스마트하게 즐길 수 있도록 돕는 서비스입니다.

---

## 🌟 Key Features

### 💼 Career & Employment
- **Portfolio Management:** 기술 스택, 프로젝트, 경력 사항 관리 및 이력서 PDF 업로드.
- **Application Tracker:** 기업 지원 상태 실시간 추적 및 투명한 공유 피드 제공.
- **Job Postings:** 기업 및 프로젝트 파트너 모집 공고 이원화 운영.

### 👥 Community & Campus
- **Integrated Board:** 질문, 잡담, 공지사항 등 카테고리별 소통 공간.
- **polbook (Market):** 교내 안전 직거래 및 에스크로 기반의 중고 서적 장터.
- **FAQ System:** 학과 생활 및 취업 가이드라인 제공.

---

## 🛠 Tech Stack

### Backend
- **Framework:** Spring Boot 3.5.0
- **Database:** MySQL 8.0
- **ORM:** Spring Data JPA (Hibernate)
- **Security:** Spring Security & JWT
- **Build Tool:** Gradle

### Frontend
- **Library:** React (TypeScript)
- **Styling:** Tailwind CSS
- **Icons:** Lucide-react
- **Build Tool:** Vite

---

## ⚙️ Getting Started (Local Development)

### 1. Database Setup
Docker Compose를 사용하여 로컬 데이터베이스를 신속하게 실행할 수 있습니다.
```bash
docker-compose up -d
```

### 2. Backend Setup
서버 실행 시 `dev` 프로필이 활성화되어 더미 데이터가 자동으로 삽입됩니다.
```bash
cd backend
./gradlew bootRun
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```text
polpol/
├── backend/            # Spring Boot Application
│   ├── src/main/java/  # Domain, Repository, Service, Controller
│   └── src/main/resources/
├── frontend/           # React Application
│   ├── src/pages/      # Feature Pages
│   └── src/components/ # Shared Components
├── docker-compose.yml  # Local Infra (MySQL)
└── documents/          # Architecture, ERD, Guides
```

---

## 📖 Related Documents
- [Architecture & ERD](./architecture_erd.md)
- [Development Guide](./development_guide.md)
- [AWS Deployment & Cost Guide](./aws_deployment_cost_guide.md)
- [Task List](./task_list.md)
