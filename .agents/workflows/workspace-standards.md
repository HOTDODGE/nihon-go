---
description: workspace-standards
---

1. 계획 우선: 3개 이상의 파일을 변경할 때는 implementation_plan.md를 작성해 사용자 승인 후 착수할 것.
2. 진행 추적: 작업 상태는 task.md의 체크리스트([ ], [/], [x])를 실시간으로 갱신할 것.
3. 코드 품질: 타입스크립트 any 사용 금지, 250줄 초과 컴포넌트는 커스텀 훅이나 하위 컴포넌트로 분리할 것.
- 서킷 브레이커 (Loop Breaker):
  * 동일한 테스트 실패나 에러가 3회 연속 반복되면 모든 작업을 즉시 중단(HALT)할 것.
  * 동일한 단일 파일을 4회 이상 연쇄 수정하지 말고 멈춘 뒤 task.md에 [ABORT: 반복 루프 감지]를 기록하고 원인을 보고할 것.
- 절대 실행 금지(Hard Blacklist):
  * `rm -rf`, `git push -f`, `git reset --hard`, `.env` 접근 명령은 자동 승인 설정과 무관하게 무조건 멈추고 사용자에게 수동 확인을 요청할 것.