# GGUDDONG ERP V2 Framework 1.0

## 1. 개발 원칙

GGUDDONG ERP V2는 React + Vite 기반의 ERP HQ 시스템이다.

기존 GAS ERP는 유지하고, React ERP는 본사 관제 화면으로 구축한다.

ERP는 사업부를 직접 실행하거나 수정하는 도구가 아니라,
각 사업부의 상태를 읽고 관리하는 Read Only HQ 관제 시스템이다.

---

## 2. 기본 구조

Feature
→ Panel
→ Layout
→ Widgets
→ Service
→ Data

---

## 3. 화면 규칙

Sidebar 클릭 시 페이지 이동하지 않는다.

각 메뉴는 FloatingPanel 안에서 열린다.

Router 방식은 보류한다.

---

## 4. Feature 규칙

각 기능은 독립 폴더를 가진다.

예시:

business  
monitor  
operations  
projects  
ai-center  
dashboard  

---

## 5. Widget 규칙

공통 UI는 widgets에서 관리한다.

현재 위젯:

InfoWidget  
StatusWidget  
ProgressWidget  

위젯은 특정 기능에 종속되지 않는다.

---

## 6. Layout 규칙

공통 화면 구조는 layouts에서 관리한다.

현재 레이아웃:

DashboardLayout

구조:

Header  
Left  
Right  
Footer  

---

## 7. Service 규칙

화면은 데이터를 직접 들고 있지 않는다.

Panel 또는 Component는 Service를 통해 데이터를 받는다.

예시:

BusinessPanel  
→ divisionService  
→ divisionData  

---

## 8. Data 규칙

현재는 Mock 데이터를 사용한다.

향후 실제 API, Firebase, GAS API, ERP Server로 교체 가능해야 한다.

UI는 데이터 공급 방식이 바뀌어도 최대한 수정하지 않는다.

---

## 9. Context 계획

향후 ERPContext를 도입한다.

목적:

Business  
Monitor  
Dashboard  
Header  

가 같은 ERP 상태 데이터를 공유하도록 한다.

---

## 10. 개발 진행 규칙

한 번에 많이 수정하지 않는다.

항상:

한 파일 작성  
→ 저장  
→ 실행 확인  
→ 다음 파일  

순서로 진행한다.