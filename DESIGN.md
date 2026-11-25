---
name: Fayang
description: A warm paper developer studio site with a product catalogue, Mountain Dog showcase, and bilingual policies
colors:
  bg: "#f5f2eb"
  surface: "#ebe6db"
  card: "#fdfcf9"
  ink: "#201e1b"
  muted: "#5f5951"
  accent: "#8a3b12"
  action: "#8a3b12"
  action-hover: "#743210"
  action-ink: "#fdfcf9"
  line-hex: "#dcd6c9"
  line-strong-hex: "#c5bdb0"
  select: "#f2d8c7"
  dark-bg: "#151413"
  dark-surface: "#1f1d1b"
  dark-card: "#1b1917"
  dark-ink: "#edeae4"
  dark-muted: "#a39e96"
  dark-accent: "#f0a070"
  dark-action: "#e48f5c"
  dark-action-hover: "#e79b6f"
  dark-action-ink: "#151413"
  dark-line-hex: "#2e2b28"
  dark-line-strong-hex: "#433f3a"
  dark-select: "#543623"
  print-bg: "#fff"
  print-surface: "#f6f6f6"
  print-ink: "#000"
  print-muted: "#444"
  print-line: "#ccc"
  print-line-strong: "#999"
typography:
  brand-display:
    fontFamily: "Outfit, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontWeight: 400
  brand-body:
    fontFamily: "Outfit, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.72
  catalog-h1-sm:
    fontFamily: "Outfit, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.055em"
  catalog-h1-md:
    fontFamily: "Outfit, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "5.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.055em"
  catalog-h1-lg:
    fontFamily: "Outfit, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "7rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.055em"
  product-h1:
    fontFamily: "Outfit, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  product-h2:
    fontFamily: "Outfit, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.35
  product-genre:
    fontFamily: "Outfit, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.45
  product-h3:
    fontFamily: "Outfit, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.5
  doc-display:
    fontFamily: "Funnel Display, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontWeight: 500
  doc-body:
    fontFamily: "Funnel Sans, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.72
  label:
    fontFamily: "Outfit, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  none: "0px"
  focus: "4px"
  sm: "8px"
  brand-button: "8px"
  doc-button: "10px"
  md: "12px"
  lg: "20px"
  pill: "999px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  header-sm: "56px"
  header-md: "72px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.brand-button}"
    padding: "9px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.brand-button}"
    padding: "9px 24px"
    height: "48px"
  brand-link:
    textColor: "{colors.ink}"
    height: "44px"
  brand-link-hover:
    textColor: "{colors.accent}"
    height: "44px"
  policy-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    height: "72px"
  lang-pill:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px"
---

# Design System: Fayang

## Overview

**Creative North Star: "暖紙工作室手札（The Warm Paper Studio Notebook）"**

Fayang 的設計系統像一本攤開在自然光下的獨立開發者手札：以暖米紙底、炭墨正文與單一栗紅陶土強調色構成安靜而踏實的閱讀介面，讓實際遊戲畫面與中英文政策條款各自從容安放。整個網站不依賴執行期 JavaScript，優先使用語意 HTML、原生控制項與精準的留白節奏，確保玩家、家長與審查人員在手機、桌面、鍵盤與列印環境下都能直接完成閱讀與操作。

本系統明確拒絕兩種視覺反例：其一，拒絕霓虹色、紫藍漸層與過度玻璃擬態等通用科技 SaaS 套版視覺；其二，拒絕以 AI 生成畫面、浮誇宣傳數據或假評價取代實際遊戲截圖與真實的封閉測試狀態。

**Key Characteristics:**
- 暖紙三階中性色（底色、區塊面、卡片面）搭配單一栗紅陶土強調色，亮／暗色全面通過 WCAG AA 並接近 AAA 對比。
- 實際遊戲截圖直角無裁切圓角呈現，附帶可驗證來源紀錄，與精簡中文文案並置。
- 克制且踏實的原生互動：44–48px 點擊熱區、細微的 90–200ms 觸感回饋，減少動態時保留靜態色彩與焦點提示。
- 清楚分層的零 JS 靜態樣式架構：`assets/brand/fayang.css`（共用品牌基礎）、`assets/brand/catalog.css`（開發者首頁目錄）、`mountaindog/product.css`（產品展示頁），以及政策與封測頁沿用的 `style.css` 與 `mountaindog/testing.css`。

## Colors

全站以 90–95% 暖紙中性色建立低疲勞閱讀基底，僅在主要行動與互動焦點釋放單一栗紅陶土色，並透過 `prefers-color-scheme: dark` 與 `@media print` 完整切換深色及黑白列印色票。

### Primary
- **栗紅陶土（Chestnut Terracotta）**（亮色 `#8a3b12`／深色 `#f0a070`；主按鈕底色 `#8a3b12`／`#e48f5c`，懸停與焦點混色降級值 `#743210`／`#e79b6f`）：僅用於品牌標誌底色、主要行動按鈕、連結懸停／鍵盤焦點外框與文字選取延伸色（`#f2d8c7`／`#543623`）。亮色底上對比達 6.92:1（`--surface` 上 6.22:1），深色底上達 8.73:1（`--surface` 上 7.97:1）。

### Neutral
- **暖米紙（Warm Paper）**（`--bg`，亮色 `#f5f2eb`／深色 `#151413`）：全站頁面主底色與瀏覽器 `theme-color`。
- **溫沙面（Warm Sand Surface）**（`--surface`，亮色 `#ebe6db`／深色 `#1f1d1b`）：用於產品主頁政策與條款全寬區塊，以柔和色差區分遊戲展示與法務入口。
- **象牙卡片（Ivory Card）**（`--card`，亮色 `#fdfcf9`／深色 `#1b1917`）：用於跳至主內容連結、亮色主按鈕反白字色（`--action-ink`）與文件頁卡片／語言切換膠囊。
- **炭墨（Charcoal Ink）**（`--ink`，亮色 `#201e1b`／深色 `#edeae4`）：標題、正文、導覽列與次要連結預設字色，確保主閱讀對比穩定高於 WCAG AAA。
- **暖灰褐（Warm Slate Muted）**（`--muted`，亮色 `#5f5951`／深色 `#a39e96`）：次要說明、語言標籤、裝置支援與頁尾資訊；亮色在 `--surface` 上仍達 5.56:1（`--bg` 上 6.19:1），深色在 `--surface` 上達 6.31:1。
- **紙緣細線（Hairline Dividers）**（`--line`／`--line-strong`，實體降級 `#dcd6c9`／`#c5bdb0`、深色 `#2e2b28`／`#433f3a`）：於支援瀏覽器透過 `@supports (color: color-mix(in oklab, red, blue))` 升級為 11%–12% 與 21%–22% 的 `oklab` 混色，用於章節分隔、連結底線與政策列底線。

### Named Rules
**The Single Chestnut Accent Rule.** 全站僅保留栗紅陶土單一品牌強調色，不引入第二強調色或漸層裝飾；導覽與次要連結平時維持炭墨色，僅在懸停與鍵盤焦點時轉為強調色。

**The Print Monochrome Rule.** `@media print` 必須同步覆寫 `--action`（`#000`）、`--action-ink`（`#fff`）與 `--line-strong`（`#999`）並完整隱藏 `<header>` 與 `<footer>`，確保紙本列印無殘留棕色底或頂端孤線。

## Typography

**Brand Display & Body Font:** 自託管 `Outfit`（拉丁字元 400–500，`outfit-latin.woff2` 預載並使用 `font-display: swap`），中文與系統退回依序為 `"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif`。
**Legacy Document & Recruitment Fonts:** 既有政策文件與封測說明頁維持 `Funnel Display`（標題 500）與 `Funnel Sans`（正文 `16.5px`／`1.72`），搭配相同繁中無襯線退回。

**Character:** 幾何溫和的無襯線拉丁字型與繁體中文無襯線自然銜接；不依賴單頁固定文案裁切字集，以字級差距與字重 400／500 區分層級，中文標題開啟 `text-wrap: balance` 與 `font-feature-settings: "kern" 1`。

### Hierarchy
- **Brand Hero Display**（400，`4.5rem` → `5.5rem` → `7rem`，行高 `1`，字距 `-0.055em`）：僅用於開發者首頁 `Fayang` 品牌大標，跟隨使用者根字級縮放。
- **Product Display (H1)**（400，`clamp(2.25rem, 4.5vw, 4rem)`，行高 `1.1`，字距 `-0.035em`）：產品主頁英文名稱（如 `Mountain Dog`），標註 `lang="en"`。
- **Section Headline (H2)**（400，`clamp(1.75rem, 3vw, 2.75rem)`，行高 `1.35`）：產品主頁各章節標題，寬螢幕與右側說明形成雙欄端線對齊。
- **Product Lead / Genre**（400，`clamp(1.5rem, 2.6vw, 2.25rem)`，行高 `1.45`）：首屏中文核心一句話介紹。
- **Step / Subheading (H3)**（500，`1.25rem`，行高 `1.5`）：餵食步驟標題與次級項目名稱。
- **Body**（400，`1rem`／文件頁 `16.5px`，行高 `1.72`）：主要敘述文字，產品說明寬度限制在 `28em–30em`，政策長文限制在 `39rem`（約 62ch）。
- **Label / Meta**（400，`0.8125rem–0.9375rem`，行高 `1.5`）：產品狀態、雙語副標、截圖開啟提示與政策語言標記，確保所有功能文字高於 13px 清晰可讀。

### Named Rules
**The Bilingual Markup Rule.** 英文產品名、副標與英文政策連結必須加上 `lang="en"`（跨語頁面連結同步標註 `hreflang`），讓螢幕閱讀器正確切換發音且排版比例一致。

## Layout

全站採用 4／8px 基準間距尺規（`--s-1` `4px` 至 `--s-9` `96px`），品牌與產品頁內容最大寬度為 `1280px`，兩側等寬頁邊依視窗寬度遞進：`24px`（預設）、`48px`（`640px` 起）、`80px`（`1024px` 起）。頁首高度以共用 Token `--header-h` 管理（窄版 `56px`、`640px` 起 `72px`），並在 `< 360px` 精簡標誌字級與導覽間距使 `320px` 仍維持單行不折行。

- **開發者首頁（`catalog.css`）**：`640px` 起採雙欄產品列（左圖 `240px`、`1024px` 起 `300px`），手機版單欄依標題狀態 → 圖片 → 簡介 → 滿寬行動按鈕排序，並僅於 `.catalog + .brand-footer` 窄版頁尾加上分隔線，避免樣式外溢至產品頁。
- **Mountain Dog 產品主頁（`product.css`）**：`1024px` 起首屏採 `0.85fr / 1.6fr` 左右分欄；`768px` 起日常雙圖採 `1.4fr / 1fr` 並排、餵食步驟採兩欄 `320px` 置中並排。在視窗同時滿足 `min-width: 64rem` 與 `min-height: 44rem` 時啟用一屏一區：首屏 `min-height: calc(100svh - var(--header-h))` 並設 `scroll-margin-top: var(--header-h)`，其餘主要章節 `min-height: 100svh`，政策區與 `7rem` 頁尾共用最後一屏。根容器採 `scroll-snap-type: y proximity` 並於 `prefers-reduced-motion: reduce` 關閉為 `none`。所有圖片高度上限保留 `280px` 安全下限（一般場景 `calc(100svh - 18rem)`、成長大圖 `calc(100svh - 16rem)` 且置中、直向玩法圖 `calc(100svh - 28rem)`），且僅設 `min-height` 使 200% 文字縮放時內容自然延展不裁切。
- **政策與封測頁（`style.css`、`testing.css`）**：政策文件維持 `39rem` 閱讀寬度搭配桌機側欄目錄；封測招募頁採 `80rem` 容器與桌機三欄步驟格線。

## Elevation & Depth

本系統採「預設平坦、以留白與三階紙色差區分層次（Flat-by-default tonal layering）」。新版品牌首頁與 Mountain Dog 產品主頁全程零投影，透過 `--bg` 與 `--surface` 色塊切換、1px 細線（`--line`／`--line-strong`）與 `48px–96px` 區段留白建立視覺深度。僅既有政策／封測頁的舊版卡片與應用圖示保留極輕微頂部內高光（`inset 0 1px 0 var(--card-hi)`）與低模糊陰影（`0 2px 6px rgb(0 0 0 / .08)`）。

### Named Rules
**The Flat-By-Default Rule.** 新版品牌與產品展示介面不堆疊卡片陰影或玻璃模糊；層次一律由背景色差、1px 紙緣細線與慷慨留白構成。

## Shapes

- **實際遊戲畫面直角呈現（`0px`）**：產品主頁與首頁遊戲截圖皆以直角呈現、保持原始長寬比並標註固有 `width`／`height` 防止版面位移；場景與日常圖裁去系統列與操作區，玩法步驟圖保留完整手機介面。
- **柔和幾何控制項圓角**：品牌主按鈕與小型容器採 `8px`（`--r-btn`／`--r-sm`）、鍵盤焦點外框 `4px`、舊版文件主按鈕 `10px`、中等舞台 `12px`、卡片 `20px`、雙語切換膠囊 `999px`。品牌 Logo 維持固定栗紅底 `6px` 圓角方塊，不隨深淺色模式反轉。

## Components

元件整體追求「克制且踏實（Restrained & tactile）」：優先採用原生連結、按鈕、有序／無序清單與 `<details>/<summary>`，所有互動目標確保至少 `44×44px`（主按鈕 `48px` 高），互動回饋維持 `90ms–200ms` 的 `cubic-bezier(.2, .8, .2, 1)` 細微動態，並在減少動態模式下完全停用轉場與位移，保留清晰色彩與靜態箭頭／焦點提示。

### Buttons
- **Shape:** 溫和圓角（`8px`，`--r-btn`），高度至少 `48px`（`.brand-button`），水平內距 `24px`（`--s-5`）；手機版滿寬、640px 起自動寬度。
- **Primary:** 實心栗紅陶土底（`--action`）配象牙反白字（`--action-ink`）；可選內嵌 `.m-arrow` SVG 箭頭（靜止呈現箭頭尖、懸停／聚焦展開箭桿並右移 `3px`；減少動態模式靜止即顯示完整箭頭）。
- **Hover / Focus / Active:** 桌機精細指標懸停時底色轉為 `--action-hover` 並上移 `1px`（`140ms`）；按下時下壓 `1px` 並縮放 `0.985`（`90ms`）；鍵盤焦點固定顯示 `2px solid var(--accent)` 外框（間距 `3px`，不對 `outline-offset` 執行動畫）並切換底色為 `--action-hover`。

### Brand Text Links
- **Style:** 原生 `<a>`（`.brand-link`），最小高度 `44px`，平時為 `--ink` 搭配 `--line-strong` 底線（`text-underline-offset: 0.45em`）。
- **Hover / Focus:** 文字與底線同步轉為 `--accent`，清晰辨識且不依賴顏色以外的突兀底框。

### Navigation
- **Style:** 頂部全寬列（`.brand-header`）配底部分隔線，左為固定品牌色 Logo 與 `Fayang` 連結（最小高度 `44px`，含完整 `aria-label`），右為精簡頁內／站內文字導覽（平時 `--ink`，懸停／焦點 `--accent`）。
- **Mobile & Skip Link:** `< 360px` 縮減字級與間距防止折行；頁面最前配置 `.skip` 跳轉至 `<main id="content" tabindex="-1">`，且 `main:focus-visible` 與 `#policies:focus-visible` 均設 `outline-offset: -4px` 防止外框在視窗邊緣被裁切。

### Feeding Steps & Screenshot Links
- **Style:** 使用原生 `<ol role="list">` 依「1. 輸入食物 → 2. 查看反應」排序，標題與說明在圖前；每張直向截圖由 `.game-shot-link` 包覆並於底部常駐 `.game-shot-hint`（「查看完整圖片 ↗」搭配 `.sr-only` 新分頁說明，最小高度 `44px`），另於段落後提供「查看完整橫向畫面 ↗」文字連結，統一以 `target="_blank" rel="noopener"` 開啟原圖。
- **Hover / Focus:** 圖片外圍顯示 `1px`（hover）或 `2px`（focus-visible）`--accent` 外框（`outline-offset: 5px`），底部提示文字同步轉為 `--accent`。

### Closed Testing CTA & QR Block
- **Style:** 左側標題、狀態與品牌實色主按鈕（下方配次要政策文字連結），`640px` 起右側並排 `148×148px` 高對比白底黑碼 `testing-qr.svg`（保留 `4` 單位安靜區，深色模式亦不反色以確保相機掃描率）；`< 640px` 隱藏 QR code 改以滿寬主按鈕直接前往測試指引。

### Bilingual Policy Directory
- **Style:** 置於全寬 `--surface` 區塊中，左側為標題（中文主標＋次級 `lang="en"` 副標）與客服信箱入口，右側為原生 `<ul role="list">` 四列雙語連結（隱私權政策／服務條款之中英文頁），每列最小高度 `72px`（`640px` 起 `88px`），以 `--line-strong` 底線分隔、右側附 `→` 提示。

### Document TOC & Language Switcher
- **TOC:** 政策頁使用原生 `<details class="toc"><summary>`，窄版預設收合、桌機自動展開，所有章節 ID 唯一，無 JS 仍可正常開合跳轉。
- **Language Switcher:** `.btn-lang` 膠囊按鈕（`999px` 圓角、最小高度 `44px`），清楚標示目標語言並標註 `lang` 與 `hreflang`。

## Do's and Don'ts

### Do:
- **Do** 沿用 `assets/brand/fayang.css` 的語意 CSS Tokens、共享 `--header-h`／等寬頁邊與雙語 `lang`/`hreflang` 標記。
- **Do** 保持品牌共用樣式（`fayang.css`）、首頁目錄（`catalog.css`）與產品展示（`product.css`）分層，不把單頁規則寫入全站共用層。
- **Do** 新增或調整頁面時實測窄版（含 `320px`）、桌面（含 `1024×704` 與 `1280×800`）、200% 文字縮放、深色模式、列印、鍵盤導覽與減少動態。
- **Do** 政策內容異動時同步校對繁體中文、英文譯本與摘要一致性。

### Don't:
- **Don't** 以 AI 生成畫面代替實際遊戲截圖，或在圖片加入裝飾性圓角與投影。
- **Don't** 在未確認正式上架前啟用正式商店下載入口，或加入無資料支撐的宣傳數據與假評價。
- **Don't** 使用全域 `0.01ms` 動畫歸零覆寫取代精準的 `prefers-reduced-motion` 處理，或對 `outline-offset` 等非合成屬性執行動畫。
- **Don't** 在品牌與產品頁引入霓虹漸層、紫藍色系、厚重陰影卡片牆或破壞閱讀流的多餘彈窗。
