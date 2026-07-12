# 삼성 TDF 페이지 구현 정리

## 1. 프로젝트 환경

- React 19
- TypeScript
- Vite 8
- SCSS (`sass-embedded`)
- 전역 폰트: Pretendard
- 디자인 기준 너비: 1920px

현재 애플리케이션의 진입 화면은 `src/App.tsx`에서 `TdfPage`를 렌더링한다.

```tsx
import TdfPage from './pages/fund/tdf'

function App() {
  return <TdfPage />
}
```

## 2. 주요 폴더 구조

```text
src/
├── assets/
│   └── images/
│       ├── slider-point.svg
│       ├── tdf-20.svg
│       ├── tdf-30.svg
│       ├── tdf-40.svg
│       ├── tdf-50.svg
│       ├── tdf-60.svg
│       └── tdf-curve.svg
├── components/fund/tdf/
│   ├── FullPageNavigator.tsx
│   ├── PageProgress.tsx
│   ├── TdfHero.tsx
│   ├── TdfSidebar.tsx
│   └── slides/
│       ├── TdfOverviewSlide.tsx
│       ├── GlobalActiveSlide.tsx
│       ├── GlobalEmpSlide.tsx
│       ├── KoreaEmpSlide.tsx
│       ├── GlidePathSlide.tsx
│       ├── index.ts
│       └── shared/
│           ├── ContentHeader.tsx
│           └── StrategyCards.tsx
├── pages/fund/tdf/
│   └── index.tsx
└── styles/
    ├── pages/fund/tdf/index.scss
    └── utility/
        ├── function.scss
        ├── index.scss
        └── reset.scss
```

## 3. 풀페이지 화면 이동

`FullPageNavigator.tsx`가 전체 화면 상태와 이동을 관리한다.

지원하는 입력:

- 마우스 휠 아래: 다음 화면
- 마우스 휠 위: 이전 화면
- `ArrowRight`, `ArrowDown`: 다음 화면
- `ArrowLeft`, `ArrowUp`: 이전 화면
- 왼쪽 사이드 메뉴 클릭: 해당 메뉴의 첫 화면으로 이동

연속 입력으로 여러 화면이 한 번에 넘어가지 않도록 화면 전환 중에는 입력을 잠시 제한한다.

화면은 세로로 이동하지 않고 같은 위치에 겹쳐진 상태에서 다음 효과로 전환된다.

- 이전 화면 fade-out
- 다음 화면 fade-in
- 약한 scale 전환
- `prefers-reduced-motion` 환경에서는 애니메이션 최소화

## 4. 히어로 화면

첫 번째 `SAMSUNG TDF` 화면은 `TdfHero.tsx`가 담당한다.

### 연령 탭

- 20대
- 30대
- 40대
- 50대
- 60대

탭을 누르면 다음 요소가 함께 변경된다.

1. 중앙 연령별 SVG 이미지
2. 활성 탭 색상
3. 곡선 위 포인트 위치

### 이미지 관리

연령별 SVG를 개별 import하지 않고 Vite의 `import.meta.glob`으로 자동 수집한다.

```tsx
const heroImageModules = import.meta.glob<string>(
  '../../../assets/images/tdf-[0-9][0-9].svg',
  { eager: true, import: 'default', query: '?url' },
)
```

파일명 규칙:

```text
tdf-20.svg
tdf-30.svg
tdf-40.svg
tdf-50.svg
tdf-60.svg
```

DOM에는 현재 선택된 이미지 한 개만 렌더링한다. 이미지가 교체될 때 fade 및 scale 애니메이션이 실행된다.

### 곡선 포인트

곡선과 포인트는 동일한 SVG 좌표계를 사용한다. 포인트는 임의의 `left`, `top` 좌표가 아니라 실제 path 길이를 기준으로 계산한다.

```ts
const nextPoint = path.getPointAtLength(totalLength * progress)
```

따라서 애니메이션 중간 프레임에서도 포인트 중심이 곡선을 따라간다. 20~40대 포인트는 중앙 이미지에 가려지지 않는 왼쪽 곡선 구간을 사용한다.

첫 히어로 화면에는 사이드바와 우측 하단 진행 게이지가 표시되지 않는다.

## 5. 콘텐츠 컴포넌트 구성

모든 콘텐츠를 한 파일에 넣지 않고 메뉴별로 분리했다.

### `TdfOverviewSlide.tsx`

`TDF란?` 메뉴의 콘텐츠를 담당한다.

지원 variant:

- `people`: 은퇴 이전/이후 인물 비교
- `allocation`: 위험자산과 안전자산 비중
- `definition`: TDF 정의
- `features`: 세 가지 핵심 전략 카드

### `GlobalActiveSlide.tsx`

글로벌 액티브 TDF 콘텐츠를 담당한다.

지원 variant:

- `history`: 운용 역사 타임라인
- `glide-before`: 은퇴 전 글라이드 패스
- `glide-after`: 은퇴 후 글라이드 패스
- `features`: 핵심 전략 카드

### `GlobalEmpSlide.tsx`

글로벌 EMP TDF 콘텐츠를 담당한다.

지원 variant:

- `intro`: 투자 철학 인용문
- `features`: EMP 핵심 전략 카드

### `KoreaEmpSlide.tsx`

코리아 EMP TDF 콘텐츠를 담당한다.

지원 variant:

- `intro`: 글로벌/코리아 글라이드 패스 비교
- `features`: 코리아 EMP 핵심 전략

### `GlidePathSlide.tsx`

생애주기별 TDF 주식 비중 차트를 담당한다.

### 공통 컴포넌트

- `shared/ContentHeader.tsx`: eyebrow, 제목, breadcrumb
- `shared/StrategyCards.tsx`: 반복되는 3열 전략 카드
- `slides/index.ts`: 페이지에서 사용할 컴포넌트 export 관리

콘텐츠를 추가할 때는 관련 메뉴 컴포넌트만 수정한다. 여러 메뉴에서 반복되는 UI만 `shared`로 이동한다.

## 6. 사이드바

`TdfSidebar.tsx`가 왼쪽 고정 메뉴를 담당한다.

메뉴 구성:

1. TDF란?
2. 글로벌 액티브 TDF
3. 글로벌 EMP TDF
4. 코리아 EMP TDF
5. 글로벌 액티브/EMP TDF 글라이드 패스

현재 슬라이드의 `menuIndex`에 따라 활성 메뉴가 변경된다. 메뉴 클릭 시 해당 메뉴에 속한 첫 슬라이드로 이동한다.

## 7. 진행 게이지

`PageProgress.tsx`가 오른쪽 하단 진행 게이지를 담당한다.

게이지는 전체 슬라이드 번호가 아니라 다음 두 단계로 관리한다.

1. 현재 메뉴 안의 디자인 그룹
2. 같은 디자인을 공유하는 세부 화면

각 슬라이드는 다음 정보를 가진다.

```ts
interface FullPageSlide {
  id: string
  menuIndex: number
  progressGroup: number
  progressGroupTotal: number
  progressStep: number
  progressStepTotal: number
  content: ReactNode
}
```

예: `TDF란?`의 첫 세 화면이 같은 디자인이고 네 번째 화면이 다른 디자인인 경우:

```ts
// 첫 번째 화면
progressGroup: 1
progressStep: 1
progressStepTotal: 3

// 두 번째 화면
progressGroup: 1
progressStep: 2
progressStepTotal: 3

// 세 번째 화면
progressGroup: 1
progressStep: 3
progressStepTotal: 3

// 네 번째, 새로운 디자인
progressGroup: 2
progressStep: 1
progressStepTotal: 1
```

같은 디자인 화면에서는 번호 `01`을 유지하면서 게이지만 조금씩 채워진다. 다른 디자인으로 넘어가면 `02`가 된다. 다음 사이드 메뉴로 이동하면 다시 `01`부터 시작한다.

## 8. SCSS 크기 규칙

TDF 페이지의 간격과 크기는 `px`, `rem`을 직접 쓰지 않고 `function.scss`의 `__vw()` 함수를 사용한다.

```scss
padding: __vw(32);
font-size: __vw(18);
border-radius: __vw(20);
```

함수 정의:

```scss
$design-width: 1920;
$function-base-size: 16;

@function __vw($size) {
  $rem-size: math.div($size, $function-base-size) * 1rem;
  $vw-size: math.div($size, $design-width) * 100vw;

  @return max(#{$rem-size}, #{$vw-size});
}
```

예를 들어 `__vw(32)`는 컴파일 후 다음과 같은 CSS가 된다.

```css
max(2rem, 1.6666666667vw)
```

`__vw`는 밑줄로 시작해 Sass 모듈의 private 함수로 처리되므로 현재 TDF SCSS에서는 함수 접근을 위해 `@import`를 사용한다. Dart Sass는 `@import` 폐기 경고를 출력하므로 추후 함수명을 공개 이름으로 변경하는 리팩터링을 고려한다.

## 9. 전역 스타일

`src/styles/utility/reset.scss`에서 다음 항목을 설정한다.

- Pretendard 웹폰트
- `1rem = 10px`
- `box-sizing: border-box`
- 기본 여백 제거
- 목록, 링크, 이미지, 버튼, 폼 및 테이블 기본 리셋

`src/main.tsx`에서 전역 스타일을 불러온다.

```tsx
import './styles/utility/index.scss'
```

## 10. 검증 명령어

```bash
npx tsc -b
npx eslint . --format json
node node_modules/sass-embedded/dist/bin/sass.js \
  src/styles/pages/fund/tdf/index.scss \
  /tmp/tdf.css \
  --load-path=src/styles
```

TypeScript, ESLint, SCSS 단독 컴파일 검사를 통과한 상태다.

## 11. 로컬 실행 주의사항

현재 확인된 Node.js `21.1.0`은 Vite 8과 호환되지 않는다.

Vite 8 실행에 필요한 Node 버전:

- Node.js `20.19+`
- 또는 Node.js `22.12+`

권장 버전은 Node.js 22 LTS다.

```bash
npm install
npm run dev
```

## 12. 다음 작업 권장 순서

1. 제공된 디자인 이미지에 맞춰 각 메뉴 컴포넌트 세부 마크업 완성
2. 인물, 카드, 그래프용 실제 이미지 에셋 연결
3. PC 1920px 기준 정밀한 위치 및 크기 조정
4. 작은 노트북 화면과 태블릿 대응
5. Q&A 전용 슬라이드 및 아코디언 구현
6. 사이드바 하단 CTA 실제 링크 연결
7. Node 22 환경에서 Vite 개발 서버 및 production build 검증
