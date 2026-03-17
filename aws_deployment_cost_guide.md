# AWS 배포 및 운영 가이드 & 비용 산출서

이 문서는 **polpol** 서비스를 AWS(Amazon Web Services) 환경에서 안정적으로 배포하고 운영하기 위한 상세 가이드라인과 예상 비용을 정리한 보고서입니다.

---

## 1. 클라우드 인프라 아키텍처 (Cloud Architecture)

서비스의 확장성과 안정성을 고려하여 다음과 같은 구성을 권장합니다.

- **Frontend:** AWS S3 (정적 웹 호스팅) + Amazon CloudFront (CDN)
- **Backend:** AWS EC2 (Ubuntu 22.04 LTS) + Docker / Docker Compose
- **Database:** AWS RDS (MySQL 8.0)
- **File Storage:** AWS S3 (사용자 업로드 이미지, PDF 포트폴리오)
- **Domain/SSL:** AWS Route 53 (DNS) + AWS Certificate Manager (SSL/TLS)

---

## 2. 단계별 배포 가이드라인 (Deployment Guidelines)

### 1) 인프라 초기 설정
- **네트워크 설정:** 전용 VPC를 생성하고, 퍼블릭 서브넷(EC2용)과 프라이빗 서브넷(RDS용)을 분리하여 보안을 강화합니다.
- **보안 그룹(Security Group):**
    - **EC2:** 80(HTTP), 443(HTTPS), 22(SSH) 포트 허용.
    - **RDS:** 3306 포트를 EC2 보안 그룹에서만 접근 가능하도록 제한.

### 2) 데이터베이스 (RDS) 구축
- RDS 인스턴스를 생성하고, `polpol_db` 데이터베이스 및 개발 환경과 동일한 사용자 계정을 설정합니다.
- 초기 스키마는 백엔드 서버의 `ddl-auto: update` 설정을 통해 자동으로 생성하거나, SQL 덤프 파일을 통해 마이그레이션합니다.

### 3) 백엔드 배포 (EC2)
- EC2 인스턴스에 Docker 및 Docker Compose를 설치합니다.
- **배포 프로세스:**
    1. 로컬 또는 CI 환경에서 `./gradlew build` 수행.
    2. 생성된 JAR 파일을 포함하는 Docker 이미지를 빌드.
    3. Docker Hub 또는 AWS ECR에 푸시.
    4. EC2에서 `docker-compose pull` 후 `up -d` 실행.

### 4) 프론트엔드 배포 (S3 + CloudFront)
- `npm run build`를 통해 생성된 `dist` 폴더를 S3 버킷에 업로드합니다.
- CloudFront를 연결하여 전 세계 어디서나 빠른 응답 속도를 보장하고, HTTPS를 적용합니다.

### 5) CI/CD 자동화 (GitHub Actions)
- `main` 브랜치에 푸시되는 즉시 자동으로 테스트, 빌드, 배포가 이루어지도록 설정합니다.
- `.github/workflows/deploy.yml` 파일을 작성하여 AWS 자격 증명(Secrets)과 연동합니다.

---

## 3. 운영 가이드라인 (Operation Guidelines)

- **모니터링:** AWS CloudWatch를 통해 서버의 CPU 사용률, 메모리, DB 커넥션 수를 실시간 감시합니다. 임계치 초과 시 알림(SNS)을 설정합니다.
- **백업:** RDS의 '자동 스냅샷' 기능을 활성화하여 매일 새벽 백업을 수행합니다.
- **로그 관리:** 백엔드 로그를 CloudWatch Logs로 전송하여 서버 접속 없이도 에러를 추적할 수 있도록 합니다.

---

## 4. 월간 예상 비용 산출 (Cost Estimation)

초기 서비스 규모(동시 접속자 100~500명 내외)를 기준으로 산출되었습니다.

### A. AWS 프리티어 활용 (신규 계정 12개월간)
| 서비스 | 사양 | 비용 (Monthly) | 비고 |
| :--- | :--- | :--- | :--- |
| **EC2** | t3.micro (Linux) | $0.00 | 월 750시간 무료 |
| **RDS** | db.t3.micro (MySQL) | $0.00 | 월 750시간 무료 |
| **S3** | Standard Storage | ~$0.10 | 5GB 무료 초과 시 과금 |
| **CloudFront** | Data Transfer Out | $0.00 | 1TB 데이터 전송 무료 |
| **WAF/SSL** | ACM Certificate | $0.00 | 무료 제공 |
| **합계** | | **약 $0.10 (~150원)** | 사실상 무료 유지 가능 |

### B. 프리티어 종료 후 (또는 사양 업그레이드 시)
| 서비스 | 사양 | 비용 (Monthly) | 비고 |
| :--- | :--- | :--- | :--- |
| **EC2** | t3.small (2vCPU, 2GiB RAM) | 약 $15.00 | 권장 사양 |
| **RDS** | db.t3.micro (수동 백업 포함) | 약 $12.00 | 최소 사양 |
| **Route 53** | Hosted Zone | $0.50 | 도메인 당 고정 비용 |
| **Data Transfer** | Outbound Traffic (50GB) | 약 $4.50 | 사용자 접속 트래픽 |
| **합계** | | **약 $32.00 (약 43,000원)** | |

---

## 5. 비용 절감 팁 (Cost Saving Tips)

1. **Reserved Instances (RI):** 1년 이상 장기 운영 확정 시 EC2/RDS 예약 인스턴스를 구매하면 최대 40% 이상 절감 가능합니다.
2. **S3 Intelligent-Tiering:** 자주 조회되지 않는 포트폴리오 파일은 저비용 스토리지 계층으로 이동시켜 비용을 최적화합니다.
3. **AWS Student Credits:** 학생 개발자라면 GitHub Student Developer Pack을 통해 제공되는 AWS 크레딧($100 이상)을 반드시 신청하세요.
