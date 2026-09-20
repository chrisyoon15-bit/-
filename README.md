# 평촌 글로벌어학원 홈페이지

빌드 과정이 없는 정적 사이트입니다. 폴더를 그대로 Netlify 에 올리면 바로 동작합니다.

## 파일 구성

```
index.html              메인 페이지 (전체 내용)
thanks.html             상담 신청 완료 페이지 (폼 전송 후 이동)
404.html                없는 주소로 들어왔을 때
assets/css/style.css    전체 스타일 (색·서체 값은 파일 맨 위 :root 에 모아 둠)
assets/js/main.js       모바일 메뉴 · 프로그램 탭 · 폼 안내
netlify.toml            Netlify 설정 (publish 경로, 캐시·보안 헤더, 리다이렉트)
robots.txt, sitemap.xml 검색엔진용
CONTENT-CHECKLIST.md    공개 전에 반드시 교체해야 하는 항목 목록
```

## Netlify 에 올리는 방법

### 방법 1 — 드래그 앤 드롭 (가장 빠름, 계정만 있으면 됨)

1. <https://app.netlify.com/drop> 접속
2. 이 폴더(`global-pc-renewal`) 전체를 브라우저 창에 끌어다 놓기
3. `https://<임의이름>.netlify.app` 주소가 바로 생성됩니다

> 주의: 폴더 **안의 파일들**이 아니라 폴더 자체를 올려도 되지만,
> `index.html` 이 최상단에 있어야 합니다. 현재 구조가 그렇습니다.

### 방법 2 — Git 연동 (수정할 때마다 자동 배포, 권장)

1. Netlify → **Add new site** → **Import an existing project**
2. GitHub 저장소 선택
3. 빌드 설정은 아래처럼 두면 됩니다 (`netlify.toml` 이 이미 지정하고 있습니다)
   - Build command: 비워 둠
   - Publish directory: `.`
4. **Deploy** — 이후 `git push` 할 때마다 자동으로 다시 배포됩니다

## 상담 신청 폼 (Netlify Forms)

`index.html` 의 상담 폼은 별도 서버 없이 Netlify Forms 로 동작합니다.

- 동작 원리: `<form name="consult" data-netlify="true">` 와 숨겨진
  `<input type="hidden" name="form-name" value="consult">` 를 Netlify 가 배포 시 감지합니다.
- 접수 내역 확인: Netlify 관리자 → 해당 사이트 → **Forms** → `consult`
- 알림 메일 받기: **Forms → Settings → Form notifications → Add notification →
  Email notification** 에서 받을 주소를 등록하세요. (기본값은 알림이 오지 않습니다.)
- 스팸 차단: `netlify-honeypot="bot-field"` 로 봇 유입을 막고 있습니다.
- 전송 후 `thanks.html` 로 이동합니다.

무료 플랜은 월 접수 건수에 제한이 있으니, 상담 문의가 많아지면 플랜을 확인해 주세요.

## 로컬에서 확인하기

`index.html` 을 더블클릭해도 열리지만, 경로 문제를 피하려면 간단한 서버를 쓰는 편이 안전합니다.

```bash
# Python 이 설치된 경우 (Windows 는 python, macOS/Linux 는 python3)
python -m http.server 8000
# → 브라우저에서 http://localhost:8000
```

미리보기나 로컬에서는 폼을 전송해도 접수되지 않고 안내 문구만 표시됩니다.
Netlify 에 배포한 뒤에야 실제로 접수됩니다.

## 색과 서체 바꾸기

`assets/css/style.css` 맨 위 `:root` 블록의 값만 바꾸면 사이트 전체에 반영됩니다.

| 변수 | 쓰이는 곳 |
| --- | --- |
| `--brand` | 버튼, 로고 원형, 강조 밑줄 |
| `--brand-2` | 링크, 탭 선택 상태, 강조 텍스트 |
| `--accent` | 섹션 라벨(영문 소제목), 필수 항목 표시 |
| `--paper` / `--card` | 페이지 배경 / 카드 배경 |
| `--ink` / `--ink-2` / `--ink-3` | 본문 / 보조 설명 / 캡션 |

다크 모드 값은 같은 파일의 `@media (prefers-color-scheme: dark)` 와
`:root[data-theme="dark"]` 두 블록에 들어 있습니다. 다크 모드가 필요 없으면
두 블록을 지우면 항상 라이트 테마로 표시됩니다.

## 공개 전 할 일

`CONTENT-CHECKLIST.md` 를 먼저 확인해 주세요. 전화번호 · 주소 · 시간표 등
임시값으로 넣어 둔 항목이 정리돼 있습니다.
