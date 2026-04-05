# UFA Website — Design Tasks

> Полный план дизайн-улучшений на основе глубокого исследования (2026-04-05)
> Сравнение с IFA (franchise.org), анализ трендов 2025-2026, аудит кодовой базы

---

## 1. КРИТИЧЕСКИЕ ИСПРАВЛЕНИЯ

- [ ] **Исправить CTA членства**: все кнопки "Вступить" на `/membership` ведут на `/contact` → сделать отдельную форму регистрации прямо на `/membership`
- [ ] **Исправить контраст зелёного** `#3ECF8E` на белом фоне (2.8:1 → нужно 4.5:1 WCAG AA): добавить `--primary-text: #2A9D6F` для текстовых элементов
- [ ] **Добавить поиск по сайту** в хедер (14+ страниц без поиска)
- [ ] **Заменить одинаковые градиентные hero-блоки** на реальные фото мероприятий с тёмным оверлеем на внутренних страницах

---

## 2. КНОПКИ — ИЕРАРХИЯ И СТИЛИ

### 2.1 Обновление существующих

- [ ] `button.tsx`: изменить primary кнопку — `rounded-full` → `rounded-lg` (8px), добавить `hover:shadow-lg hover:shadow-[#3ECF8E]/25` на все primary варианты
- [ ] `button.tsx`: стандартизировать secondary (outline) кнопку — `rounded-lg`, `border-2 border-[#3ECF8E]`, `hover:bg-[#3ECF8E] hover:text-white`
- [ ] `Header.tsx`: "Вступить в UFA" из ghost/outline → solid gradient кнопка (ghost как primary = **-20% кликов**, данные CXL)
- [ ] `Header.tsx`: добавить glassmorphism при скролле — `bg-white/80 backdrop-blur-xl` вместо `bg-white`
- [ ] Обновить тексты кнопок:
  - "Подробнее" → "Узнать больше →"
  - "Вступить" → "Начать моё членство" (1-е лицо: **+90-94% CTR**)
  - "Связаться с нами" → "Получить бесплатную консультацию"
- [ ] Все CTA-кнопки по сайту: заменить `rounded-full` → `rounded-lg` для единообразия B2B-стиля

### 2.2 Рекомендуемая иерархия

```
УРОВЕНЬ 1 — Primary (одна на секцию):
  gradient fill #3ECF8E → #4AADAD, white text
  shadow-sm → hover:shadow-lg hover:shadow-[#3ECF8E]/25
  rounded-lg (8px), px-8 py-3, font-semibold

УРОВЕНЬ 2 — Secondary (рядом с primary):
  outline, border-2 border-[#3ECF8E], green text
  hover:bg-[#3ECF8E] hover:text-white
  rounded-lg (8px), NO shadow

УРОВЕНЬ 3 — Tertiary:
  text link, hover underline, transition-colors 150ms

УРОВЕНЬ 4 — Floating (Telegram):
  56×56px, rounded-full, shadow-lg
  правый нижний угол, z-50
```

---

## 3. НОВЫЕ КНОПКИ И КОМПОНЕНТЫ

- [ ] **Создать `TelegramFAB.tsx`** — плавающая кнопка Telegram 56×56px, `rounded-full`, `shadow-lg`, правый нижний угол, z-50, все страницы (+30-40% лидов)
- [ ] **Создать `StickyMobileCTA.tsx`** — sticky bar внизу экрана на мобильных с кнопкой "Вступить в UFA" (full-width, **+12-27% конверсий**)
- [ ] **Добавить кнопку "Скачать руководство по франчайзингу"** (lead magnet) после секции "О франчайзинге" на главной (multi-step: **+30-37%**)
- [ ] **Добавить кнопку "Получить консультацию"** после секции testimonials/social proof (click-triggered popup, **54% конверсия**)
- [ ] **Добавить переключатель языка UZ/RU/EN** в хедер рядом с "Войти"
- [ ] **Добавить кнопку "Сравнить тарифы"** как sticky bar на странице `/membership` (**+33% регистраций**)

---

## 4. СКРУГЛЕНИЯ (BORDER RADIUS)

### 4.1 Система радиусов

```
Уровень 1 — Контейнеры/секции:     16px  (rounded-2xl)  ← оставить
Уровень 2 — Карточки:               12px  (rounded-xl)   ← ИЗМЕНИТЬ с rounded-2xl
Уровень 3 — Инпуты/кнопки:          8px   (rounded-lg)   ← ИЗМЕНИТЬ кнопки с rounded-full
Уровень 4 — Бейджи/теги:            9999px (rounded-full) ← оставить

Правило вложенности: внутренний radius = внешний radius - padding
```

### 4.2 Конкретные изменения

- [ ] `card.tsx`: `rounded-2xl` (16px) → `rounded-xl` (12px) — более корпоративный стиль
- [ ] `ContactForm.tsx` + `input.tsx`: `rounded-xl` → `rounded-lg` (8px) — инпуты должны совпадать с кнопками
- [ ] `Header.tsx` mega-menu: `rounded-b-2xl` → `rounded-b-xl` для согласованности
- [ ] `NewsGrid` + `EventsPreview`: `rounded-2xl` → `rounded-xl` на карточках, `rounded-t-2xl` → `rounded-t-xl` на изображениях
- [ ] `Dialog`/модалы: установить `rounded-xl` (12px) как стандарт

---

## 5. ТЕНИ (BOX SHADOW)

### 5.1 Пятиуровневая система

```
УРОВЕНЬ 0 — Flat:        shadow: none         → инпуты, бейджи, текст
УРОВЕНЬ 1 — Card rest:   shadow-sm            → ВСЕ карточки в покое
УРОВЕНЬ 2 — Interactive: shadow-lg            → hover карточек, хедер при скролле
УРОВЕНЬ 3 — Dropdown:    shadow-xl + border   → мега-меню, дропдауны
УРОВЕНЬ 4 — Overlay:     shadow-2xl + backdrop → модалы, диалоги
```

### 5.2 Конкретные изменения

- [ ] `globals.css`: добавить CSS-переменные для 5-уровневой shadow-системы (`--shadow-card-rest`, `--shadow-card-hover`, `--shadow-dropdown`, `--shadow-modal`, `--shadow-header`)
- [ ] Стандартизировать ВСЕ карточки: `shadow-sm` в покое → `hover:shadow-lg` (сейчас хаос: sm, md, или без тени)
- [ ] `FranchisingTogether.tsx`: `shadow-md` → `shadow-sm` в покое, `hover:shadow-xl` → `hover:shadow-lg`
- [ ] `FranchiseCard.tsx`: `shadow-md` → `shadow-sm` в покое, `hover:shadow-lg` оставить
- [ ] `Header.tsx` при скролле: `shadow-lg` → `shadow-md` (мягче)
- [ ] `Dialog`: `shadow-xl` → `shadow-2xl` + `backdrop bg-black/50` для чёткого отрыва от контента
- [ ] Mega-menu dropdown: добавить `border border-gray-100` к `shadow-xl` (shadcn/ui подход)
- [ ] Цветные тени: унифицировать `hover:shadow-[#3ECF8E]/25` на ВСЕ primary кнопки (сейчас только на 3-х)
- [ ] Featured-карточки (рекомендуемый тариф): добавить многослойную тень Josh Comeau:
  ```css
  box-shadow:
    0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075);
  ```

---

## 6. HOVER-ЭФФЕКТЫ — СТАНДАРТИЗАЦИЯ

- [ ] Все карточки: `hover → shadow-sm→shadow-lg + translateY(-4px)`, `transition-all duration-300`
- [ ] Primary кнопки: `hover opacity 100→90% + shadow-[#3ECF8E]/25`, `transition-all duration-200`
- [ ] Secondary кнопки: `hover border → fill (bg-[#3ECF8E], text-white)`, `transition-all duration-200`
- [ ] Текстовые ссылки: `hover color → #3ECF8E`, `transition-colors duration-150`
- [ ] Изображения в карточках: `hover scale(1.05)`, `transition-transform duration-500`

---

## 7. АНИМАЦИИ И МИКРО-ВЗАИМОДЕЙСТВИЯ

- [ ] `StatsBar.tsx`: добавить count-up анимацию чисел при попадании в viewport через Intersection Observer
- [ ] Добавить scroll-triggered fade-in появление секций через Intersection Observer (нативный API, без библиотек)
- [ ] `PartnersSection.tsx`: исправить утечку — добавить `document.visibilitychange` для паузы `requestAnimationFrame` при скрытой вкладке
- [ ] Все `transition-all` → заменить на конкретные `transition-shadow`, `transition-transform`, `transition-colors` для производительности

---

## 8. ДОСТУПНОСТЬ (WCAG 2.2)

- [ ] `globals.css`: добавить `@media (prefers-reduced-motion: reduce)` для отключения всех анимаций
- [ ] Все интерактивные элементы: touch targets минимум 48×48px на мобильных
- [ ] Проверить и исправить контраст `text-white/80` на фоне `#2A3A4F` (может нарушать WCAG AA 4.5:1)
- [ ] Добавить `@supports` fallback для `backdrop-filter` (glassmorphism) — solid bg для старых браузеров

---

## 9. НАВИГАЦИЯ И UX

- [ ] Добавить активное состояние (active state) в навигации — подсветка текущего раздела зелёным
- [ ] Добавить хлебные крошки (breadcrumbs) на вложенных страницах
- [ ] Внедрить мега-меню с колонками вместо линейного списка 8+ пунктов (как у IFA)
- [ ] Страница новостей: добавить фильтрацию по категориям и пагинацию (сейчас только 6 статей без архива)

---

## 10. КОНТЕНТ И SOCIAL PROOF

- [ ] Создать секцию отзывов франчайзи с фото + имя + должность + цитата (social proof, **+34% конверсии** с фото vs текст)
- [ ] Добавить телефон и адрес в подвал (`Footer.tsx`) — для B2B обязательно для доверия

---

## 11. ЦВЕТА

- [ ] Добавить янтарный акцент `#F59E0B` для вторичных CTA (**+21-34% конверсии** на синем фоне)
- [ ] `globals.css`: добавить CSS-переменную `--primary-text: #2A9D6F` (тёмный зелёный для текстовых элементов, WCAG-совместимый)

---

## Размещение кнопок на главной странице

```
┌──────────────────────────────────────┐
│  HERO: Один primary CTA по центру    │  ← +682% кликов vs сбоку
│  "Найти свою франшизу"               │
├──────────────────────────────────────┤
│  STATS BAR (без кнопок — числа)      │
├──────────────────────────────────────┤
│  THREE COLUMNS: 3× secondary CTA     │
├──────────────────────────────────────┤
│  NEWS: "Все новости →" tertiary       │
├──────────────────────────────────────┤
│  FIND FRANCHISE CTA: 1× primary      │  ← повторение главного CTA
├──────────────────────────────────────┤
│  TESTIMONIALS + "Консультация" CTA    │  ← после social proof (+25-33%)
├──────────────────────────────────────┤
│  MEMBERSHIP CTA: 1× primary          │
├──────────────────────────────────────┤
│  FOOTER: повторить "Вступить"         │
└──────────────────────────────────────┘
  Правило: primary CTA повторять каждые 2-3 секции
```

---

## Источники исследования

- [IFA franchise.org](https://www.franchise.org/) — эталонный дизайн
- [CXL — Ghost Buttons UX](https://cxl.com/blog/ghost-buttons/) — данные о -20% кликов
- [Amra & Elma — CTA Statistics 2025](https://www.amraandelma.com/high-converting-cta-statistics/)
- [Josh Comeau — Designing Shadows](https://www.joshwcomeau.com/css/designing-shadows/)
- [Figma — Web Design Trends 2026](https://www.figma.com/resource-library/web-design-trends/)
- [Wisepops — Popup Statistics](https://wisepops.com/blog/popup-stats)
- [Qualimero — WhatsApp Button Guide](https://qualimero.com/en/blog/whatsapp-button-website-guide-html-generators-ai-strategy)
- [DesignSystems.surf — Elevation Patterns](https://designsystems.surf/articles/depth-with-purpose-how-elevation-adds-realism-and-hierarchy)
- [Tailwind CSS — Box Shadow Docs](https://tailwindcss.com/docs/box-shadow)
- [Elysium MG — Franchise Design Trends 2025](https://www.elysiummg.com/franchise-website-design-trends/)

---

## 12. ПСИХОЛОГИЯ РАСПОЛОЖЕНИЯ КНОПОК

### 12.1 Паттерны сканирования страницы

**Диаграмма Гутенберга (4 зоны):**
```
┌─────────────────────────────────────────┐
│ ① PRIMARY OPTICAL AREA    ② STRONG      │
│    (Логотип, заголовок)     FALLOW      │
│    Глаза начинают здесь     (мало       │
│                              внимания)   │
│                                          │
│ ③ WEAK FALLOW            ④ TERMINAL     │
│    (мало внимания)          AREA         │
│                             Глаза        │
│                             заканчивают  │
│                             ЗДЕСЬ → CTA! │
└─────────────────────────────────────────┘
```
- CTA из зоны 1 в зону 4: **+25% регистраций** (SaaS, Mapplinks)
- "Add to Cart" из центра в нижний правый: **+20% конверсии**

**Z-паттерн (для лендингов):** Логотип (верх-лево) → CTA навигации (верх-право) → диагональ вниз → Primary CTA (низ-центр/право)

**F-паттерн (для текстовых страниц):** Вертикальная линия сканирования слева → CTA на левом краю, совпадая с линией

### 12.2 Правила размещения CTA по типу секции

**Hero-секция:**
- Позиция: **по центру** (+682% кликов vs сбоку)
- Количество: **один primary** (+371% кликов vs несколько)
- Secondary рядом справа или под primary (ghost/outline стиль)

**Карточки:**
- Action-oriented: **full-width кнопка снизу** (лучшая tap-зона на мобильных)
- Информационные: **"Подробнее →" нижний правый** (Terminal Area по Гутенбергу)
- Hover-reveal кнопки **НЕ рекомендуется** — на мобильных не работает

**Pricing / Тарифы:**
- Рекомендуемый тариф: **центральная колонка** (без выделения = **-22% конверсий**)
- CTA **снизу карточки** (после прочтения features)
- Рекомендуемый: solid primary, остальные: ghost/outline
- CTA после полного описания: **+220% конверсии** (Unbounce)

**Формы:**
- Submit: **по левому краю**, на оси с полями формы (Luke Wroblewski eyetracking)
- Submit справа = **6 ошибочных кликов + 6 сек задержки**
- На мобильных: **full-width** (100%) — стандарт всех дизайн-систем
- Back/Next: Back слева (ghost), Next справа (filled)

**Двойные CTA (Primary + Secondary):**
- Веб: **Primary слева**, Secondary правее (Windows-конвенция, NN/g)
- Мобильные: **stacked** (Primary сверху full-width, Secondary снизу)
- Минимум **8px** между кнопками

**Навигация:**
- CTA всегда **справа** (Terminal Area Z-паттерна)
- Порядок: `[Logo] [Nav] [Search] [Login] [■ Sign Up]`
- Максимум **2 CTA** в хедере (Login ghost + Sign Up filled)

**Диалоги/модалы:**
- Destructive (Delete): **изолировать влево** + красный цвет (Carbon Design System)
- Confirm/Cancel: **8px** минимум между кнопками
- На мобильных: **full-width** stacked кнопки

### 12.3 Мобильные устройства — зона большого пальца

**Данные Steven Hoober (1333 наблюдений):**
- 49% пользователей — одна рука, 75% взаимодействий — большим пальцем
- Правая рука: 67%, левая: 33%

**Карта достижимости:**
```
┌──────────────────────┐
│ ████ СЛОЖНО (15%) ██ │  ← верх экрана
│ ▓▓▓▓ ТЯНУТЬСЯ (35%) │  ← средняя зона
│ ░░░░ ЛЕГКО (50%) ░░░ │  ← нижняя зона → CTA ЗДЕСЬ
└──────────────────────┘
```

**Sticky Bottom CTA:**
- Высота: 56px кнопка + 16px padding + 34px iOS safe area = **~106px**
- CSS: `padding-bottom: env(safe-area-inset-bottom)`
- Конверсия: **+5-25%** (A/B тесты, Conversion Rate Experts)
- Full-width на мобильных: **+218%** vs узкая
- Триггер появления: после **25-40% прокрутки**
- Нижняя навигация: **86%** использования vs **57%** для гамбургера (NN/g)

**Telegram FAB:**
- Размер: 56×56dp (Material Design 3)
- Позиция: 16dp от правого и нижнего края + safe area
- Если оба (FAB + sticky bar): FAB выше sticky bar на 16dp

**Touch targets:**
- Центр экрана: минимум 7mm / 27px
- Верх/низ экрана: минимум 11-12mm / 42-46px
- WCAG 2.2 универсальный минимум: 44×44px
- Рекомендуемый для primary CTA: **48-56px** высота

### 12.4 Текущие проблемы UFA — карта CTA

| Страница | Hero CTA | Mid-page | Bottom | Проблема |
|----------|----------|----------|--------|----------|
| Главная | 1 (слева) | 5+ | 2 | Hero CTA слева, не по центру |
| Membership | **0** | 3 | 2 | Нет CTA в hero |
| About | **0** | **0** | **0** | Ноль CTA на всей странице! |
| Contact | **0** | 1 | 0 | Нет CTA в hero |
| Education | **0** | 6 | 1 | Нет CTA в hero |
| Advocacy | **0** | **0** | 1 | Почти нет CTA |
| Programs | **0** | **0** | 2 | Только внизу |
| Events | **0** | 1 | 0 | Upcoming events без CTA! |
| News | **0** | 6 | 0 | Нет "все новости" |

### 12.5 Рекомендуемая карта CTA по страницам

**Главная:**
```
HEADER:  [Найти франшизу] [■ Вступить]        ← справа, Terminal Area
HERO:    [ ■ Найти свою франшизу ]             ← ЦЕНТР (не лево!)
         [ ○ Узнать о членстве ]               ← secondary рядом
STATS:   без кнопок                            ← чистые данные
COLUMNS: 3× [Подробнее →]                      ← link-style, нижний правый
NEWS:    "Все новости →" справа от заголовка    ← tertiary link
FRANCHISE CTA: [ ■ Перейти в каталог ]         ← ЦЕНТР, повтор primary
TESTIMONIALS:  [ ■ Получить консультацию ]     ← НОВАЯ секция + CTA
MEMBERSHIP:    [ ■ Начать моё членство ]       ← ЦЕНТР
FOOTER:  [■ Вступить] + соцсети + контакты     ← повтор main CTA
Правило: primary CTA повторяется каждые 2-3 секции = 4 раза
```

**Membership:**
```
HERO:       [ ■ Выбрать тариф ↓ ]             ← ДОБАВИТЬ! scroll-to pricing
BENEFITS:   без CTA                            ← ок
PRICING:    [○ Ghost] [■ PRIMARY] [○ Ghost]    ← иерархия! центр = solid
STICKY BAR: при скролле мимо pricing           ← ДОБАВИТЬ!
FAQ:        новая секция                       ← между pricing и final
FINAL:      [ ■ Начать ] + [ ○ Задать вопрос ] ← Primary слева
```

**About:**
```
HERO:     [ ■ Вступить в UFA ]                 ← ДОБАВИТЬ! сейчас = 0
VALUES:   без CTA                              ← ок
TIMELINE: без CTA                              ← ок
TEAM:     новая секция с фото команды          ← ДОБАВИТЬ
CTA:      [ ■ Стать частью UFA ]               ← ДОБАВИТЬ! сейчас = 0 CTA
          [ ○ Связаться с нами ]
```

**Events:**
```
HERO:      [ ■ Ближайшее событие ↓ ]           ← ДОБАВИТЬ!
FEATURED:  [ ■ Зарегистрироваться ] слева      ← уже есть ✓
UPCOMING:  каждое: [ ○ Подробнее ] справа       ← ДОБАВИТЬ! сейчас = 0
CTA:       [ ■ Подписаться на анонсы ]         ← ДОБАВИТЬ! newsletter
```

**Education:**
```
HERO:     [ ■ Начать обучение ]                ← ДОБАВИТЬ!
PROGRAMS: 6× [Подробнее] внизу карточек        ← уже есть ✓
CTA:      [ ■ Записаться ] + [ ○ Консультация ] ← улучшить текст
```

**Advocacy:**
```
HERO:       [ ■ Присоединиться ]               ← ДОБАВИТЬ!
PILLARS:    без CTA                            ← ок
STATS:      без CTA                            ← ок
INITIATIVES: 3× [Подробнее →]                  ← ДОБАВИТЬ! сейчас = 0
CTA:        [ ■ Присоединиться к сети ]        ← уже есть ✓
```

**Programs:**
```
HERO:      [ ■ Выбрать программу ]             ← ДОБАВИТЬ!
PROGRAMS:  6× [Подробнее] в карточках          ← ДОБАВИТЬ! сейчас = 0
STEPS:     без CTA                             ← ок
CTA:       уже есть ✓                          ← ок
```

**News:**
```
HERO:      [ ○ Подписаться на рассылку ]       ← ДОБАВИТЬ!
GRID:      6 кликабельных карточек             ← уже есть ✓
PAGINATION: [ Назад ] [1] [2] [3] [ Далее ]   ← ДОБАВИТЬ!
```

**Franchising Overview:**
```
HERO:      [ ■ Найти франшизу ]                ← ДОБАВИТЬ!
CONTENT:   боковая навигация (sticky)          ← уже есть ✓
LEARN MORE: 3× [Подробнее →]                   ← уже есть ✓
CTA:       [ ■ Перейти в каталог ]             ← ДОБАВИТЬ! нет final CTA
```

## 13. ЗАДАЧИ ПО РАСПОЛОЖЕНИЮ КНОПОК

- [ ] **Главная hero**: переместить CTA из левого выравнивания в центр (Z-паттерн, +682% кликов)
- [ ] **Главная hero**: добавить secondary CTA "Узнать о членстве" рядом с primary
- [ ] **Membership hero**: добавить CTA "Выбрать тариф ↓" со scroll-to pricing
- [ ] **Membership pricing**: сделать иерархию кнопок — центральный тариф solid primary, боковые ghost/outline
- [ ] **About**: добавить CTA "Вступить в UFA" в hero-секцию (сейчас 0 CTA на всей странице!)
- [ ] **About**: добавить финальную CTA-секцию внизу "Стать частью UFA" + "Связаться"
- [ ] **Events hero**: добавить CTA "Ближайшее событие ↓"
- [ ] **Events upcoming**: добавить кнопку "Подробнее" к каждому из 4 предстоящих событий (сейчас 0)
- [ ] **Events**: добавить финальную секцию "Подписаться на анонсы" (newsletter CTA)
- [ ] **Education hero**: добавить CTA "Начать обучение"
- [ ] **Advocacy hero**: добавить CTA "Присоединиться"
- [ ] **Advocacy initiatives**: добавить "Подробнее →" к 3 карточкам инициатив (сейчас 0)
- [ ] **Programs hero**: добавить CTA "Выбрать программу"
- [ ] **Programs cards**: добавить "Подробнее" к 6 карточкам программ (сейчас 0)
- [ ] **News hero**: добавить CTA "Подписаться на рассылку"
- [ ] **Franchising Overview hero**: добавить CTA "Найти франшизу"
- [ ] **Franchising Overview**: добавить финальную CTA-секцию "Перейти в каталог"
- [ ] **ContactForm submit**: выровнять кнопку по левому краю (на оси с полями, не по центру — Luke Wroblewski data)
- [ ] **Все карточки**: стандартизировать CTA в нижний правый угол (Terminal Area) или full-width снизу
- [ ] **Footer**: добавить CTA "Вступить в UFA" (повтор primary CTA в footer)

---

## Дополнительные источники (психология расположения)

- [Mapplinks — CTA Buttons & Gutenberg Principle](https://mapplinks.com/cta-buttons-gutenberg-principle-cro/)
- [Luke Wroblewski — Primary & Secondary Actions](https://www.lukew.com/ff/entry.asp?571=)
- [Nielsen Norman Group — OK-Cancel or Cancel-OK?](https://www.nngroup.com/articles/ok-cancel-or-cancel-ok/)
- [UXMovement — Form Button Alignment](https://uxmovement.com/forms/where-to-align-form-buttons-on-different-layouts/)
- [UXMovement — Mobile CTA Buttons](https://uxmovement.com/mobile/optimal-placement-for-mobile-call-to-action-buttons/)
- [Steven Hoober — How Do Users Really Hold Mobile Devices](https://www.uxmatters.com/mt/archives/2013/02/how-do-users-really-hold-mobile-devices.php)
- [Smashing Magazine — Thumb Zone](https://www.smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users/)
- [Conversion Rate Experts — Sticky CTA +25%](https://conversion-rate-experts.com/sticky-cta-win-report/)
- [Nielsen Norman Group — Hamburger Menus](https://www.nngroup.com/articles/hamburger-menus/)
- [Unbounce — CTA Placement Case Study](https://unbounce.com/conversion-rate-optimization/landing-page-cta-placement/)
- [InfluenceFlow — SaaS Pricing Best Practices 2026](https://influenceflow.io/resources/saas-pricing-page-best-practices-complete-guide-for-2026/)
- [Carbon Design System — Dialog Pattern](https://carbondesignsystem.com/patterns/dialog-pattern/)
- [Material Design 3 — FAB](https://m3.material.io/components/floating-action-button/overview)

---

## 14. ПСИХОЛОГИЯ, КОНВЕРСИЯ, SEO, СТРАТЕГИЯ

> Подробные данные: см. [DESIGN_PSYCHOLOGY.md](DESIGN_PSYCHOLOGY.md)

### 14.1 Цвета и типографика
- [ ] Рассмотреть Orange/Gold CTA (#FF6B2B или #F59E0B) для контраста на Navy фоне (+38% продаж)
- [ ] Подключить `next/font` в layout.tsx — Inter + Plus Jakarta Sans (устранить FOUT, CLS)
- [ ] Стандартизировать типографику: H1 56-72px, body 16-18px, line-height 1.55, max-width 65ch

### 14.2 Trust Signals и Social Proof
- [ ] Добавить видимый телефон в хедер (trust signal)
- [ ] Создать секцию "Нас упоминали в прессе" с логотипами СМИ (авторитет)
- [ ] Лого-стена: 8-16 логотипов, grayscale, ниже hero или выше fold
- [ ] Real-time social proof виджет ("12 компаний вступили в этом месяце") — +98%
- [ ] Видео-отзывы членов ассоциации (+80% конверсии vs текстовые)
- [ ] Рейтинг/бейдж на карточках франшиз в каталоге

### 14.3 Формы и микрокопи
- [ ] ContactForm: добавить on-blur inline-валидацию (+22% completion, Baymard)
- [ ] Membership: multi-step форма (3 шага) вместо редиректа на /contact (+86%)
- [ ] Добавить микрокопи под CTA: "Бесплатно · Без обязательств · Ответим за 24 часа"
- [ ] Добавить "Мы не передаём данные третьим лицам" под формой (конфиденциальность)
- [ ] Skeleton-экраны для динамических секций (новости, каталог)
- [ ] Дружелюбные ошибки: "Проверьте email — кажется, пропущен @"
- [ ] Поле телефона: маска формата + подпись "Для связи по вашему вопросу"

### 14.4 SEO и мета-данные
- [ ] Open Graph теги в layout.tsx (og:title, og:image 1200×600, og:url) — для Telegram/LinkedIn
- [ ] Schema.org JSON-LD: Organization + NGO + Event + Article + BreadcrumbList
- [ ] Создать sitemap.ts + robots.ts (нативный Next.js App Router)
- [ ] Google My Business для UFA Tashkent + Яндекс.Вебмастер
- [ ] Meta descriptions: 155-160 символов с CTA, уникальные для каждой страницы

### 14.5 Интернационализация (i18n)
- [ ] Внедрить next-intl с App Router: /uz/*, /en/* (ru как default)
- [ ] Переключатель языка в хедер: "RU | UZ | EN" (текст, не флаги)
- [ ] Перевести ключевые страницы: главная, о нас, членство, контакты
- [ ] hreflang теги через next-intl middleware

### 14.6 Email и Lead Magnets
- [ ] Создать lead magnet: "Руководство по покупке франшизы в Узбекистане" (PDF)
- [ ] Inline email-capture форма в /membership и конце статей
- [ ] Welcome email series: 4 письма за 14 дней (Resend или Mailchimp)

### 14.7 Продвинутая психология
- [ ] Pricing: показывать от дорогого к дешёвому (якорный эффект)
- [ ] Pricing: badge "Рекомендовано" + solid primary только на среднем (фон Ресторфф)
- [ ] Прогресс-бар "Профиль заполнен на X%" после регистрации (Зейгарник)
- [ ] Лестница микроконверсий: рассылка → гайд → вебинар → демо → членство (Cialdini)
- [ ] Hero: фото человека смотрящего в сторону CTA (прайминг, +10% кликов)
- [ ] Кейсы в формате Hero's Journey (не "Нам доверяют 2400", а история одного человека)
- [ ] Формулировки потери: "Вы потеряете доступ" вместо "Оформите членство"

### 14.8 Интерактивные инструменты
- [ ] ROI-калькулятор для франшиз (инвестиции → окупаемость)
- [ ] Квиз "Какая франшиза подходит вам?" (5-7 вопросов → персонализированный результат)
- [ ] AI-чатбот "Спросите эксперта" (Tidio/Intercom, 2.8× конверсия)

### 14.9 PWA и производительность
- [ ] Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1
- [ ] priority prop на все hero-изображения (next/image)
- [ ] Рассмотреть PWA: push-уведомления для членов (Next.js поддерживает)
- [ ] View Transitions API (experimental) для page-to-page навигации

### 14.10 Юридическое
- [ ] Cookie consent banner (Закон РУз №ZRU-547 о персональных данных)
- [ ] Проверить data localization: ПД граждан Узбекистана на серверах в УЗ
