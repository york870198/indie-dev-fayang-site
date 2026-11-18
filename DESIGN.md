---
name: Fayang
description: A warm developer site with a product catalogue and bilingual policies
colors:
  bg: "#f5f2eb"
  surface: "#ebe6db"
  card: "#fdfcf9"
  ink: "#201e1b"
  muted: "#5f5951"
  accent: "#8a3b12"
  dark-bg: "#151413"
  dark-ink: "#edeae4"
  dark-muted: "#a39e96"
  dark-accent: "#f0a070"
  source-color-0: "#000"
  source-color-1: "#151413"
  source-color-2: "#1b1917"
  source-color-3: "#1f1d1b"
  source-color-4: "#201e1b"
  source-color-5: "#2e2b28"
  source-color-6: "#433f3a"
  source-color-7: "#444"
  source-color-8: "#543623"
  source-color-9: "#5f5951"
  source-color-10: "#8a3b12"
  source-color-11: "#a39e96"
  source-color-12: "#bcd9f3"
  source-color-13: "#c5bdb0"
  source-color-14: "#ccc"
  source-color-15: "#dcd6c9"
  source-color-16: "#e48f5c"
  source-color-17: "#ebe6db"
  source-color-18: "#edeae4"
  source-color-19: "#f0a070"
  source-color-20: "#f2d8c7"
  source-color-21: "#f5f2eb"
  source-color-22: "#f6f6f6"
  source-color-23: "#fdfcf9"
  source-color-24: "#fff"
typography:
  body:
    fontFamily: "Funnel Sans, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontSize: "16.5px"
    fontWeight: 400
    lineHeight: 1.72
  display:
    fontFamily: "Funnel Display, Noto Sans TC, PingFang TC, Microsoft JhengHei, system-ui, sans-serif"
    fontWeight: 500
  source-size-0:
    fontSize: "0.8125rem"
  source-size-1:
    fontSize: "0.86em"
  source-size-2:
    fontSize: "0.875rem"
  source-size-3:
    fontSize: "0.88em"
  source-size-4:
    fontSize: "0.9375rem"
  source-size-5:
    fontSize: "0.94em"
  source-size-6:
    fontSize: "0.9rem"
  source-size-7:
    fontSize: "1.05rem"
  source-size-8:
    fontSize: "clamp(1.02rem, 0.98rem + 0.2vw, 1.125rem)"
  source-size-9:
    fontSize: "clamp(1.22rem, 1.12rem + 0.35vw, 1.42rem)"
  source-size-10:
    fontSize: "clamp(1.32rem, 1.2rem + 0.45vw, 1.55rem)"
  source-size-11:
    fontSize: "clamp(1.9rem, 1.55rem + 1.5vw, 2.55rem)"
  source-size-12:
    fontSize: "clamp(2.35rem, 1.85rem + 2.2vw, 3.5rem)"
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
  button: "10px"
  source-radius-0: "11px"
  source-radius-1: "22.5%"
  source-radius-2: "4px"
  source-radius-3: "5px"
  source-radius-4: "6px"
  source-radius-5: "999px"
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
---

## Overview
首頁先介紹獨立開發者 Fayang，再列出產品與作品。各項產品使用同級列表，產品主頁承接封測與政策，開發者頁尾放品牌和聯絡方式。首頁與 Mountain Dog 主頁共用 `style.css` 和 `assets/brand/fayang.css`，產品主頁的版面規則另在 `mountaindog/product.css`。

## Colors
使用 --bg、--surface、--card 三層背景；正文 --ink，次要文字 --muted，一般連結 --accent。新版品牌頁導覽和次要行動預設使用 --ink，滑鼠懸停與鍵盤焦點時使用 --accent。深色模式依 prefers-color-scheme 自動切換，完整對應值見 style.css。遊戲底色由 --game-tint 指定。Logo 固定品牌色不隨主題變更。

## Typography
新版品牌頁自託管 Outfit（拉丁字元、400–500），中文使用 Noto Sans TC、PingFang TC、Microsoft JhengHei 或系統無襯線。字型不按固定文案裁切。首頁 Fayang 標題桌機用 7rem、窄版用 4.5rem，跟隨使用者字級。其餘既有頁面維持 Funnel Display／Funnel Sans 及雙語編排；文件分中英文頁面。

## Layout
新版品牌頁內容寬度上限 1280px，兩側頁邊相等：24px、640px 起 48px、1024px 起 80px。目錄並排時圖寬 240px／300px；手機依名稱與狀態、圖片、說明、行動排序，主按鈕滿寬。新增產品只需在 `index.html` 的 `product-list` 下追加同級項目，維持原生清單與每列 h3。文件維持原有 39rem 閱讀寬度與桌面目錄。

## Elevation & Depth
目錄用分隔線和留白區分產品。Mountain Dog 主頁的遊戲場景直接與文案並排或堆疊，政策區以 `--surface` 區分。文件閱讀頁保持平坦背景。

## Shapes
品牌主按鈕最小高度 48px、圓角 8px。Mountain Dog 的場景從 `screen-2.jpg` 裁出，保留狗狗全身並排除手機系統列和遊戲操作面板。目錄與產品主頁共用 420w／720w WebP，產品主頁另提供 1080w。以固有尺寸預留空間，直角呈現並保持比例。

## Components
- 產品列：名稱、類型、平台、狀態、實際畫面、簡介與明確的產品入口。各產品依需要提供次要行動，例如 Mountain Dog 的「加入封閉測試」。
- 語言切換：最小高度 44px，清楚標示目標語言。
- Mountain Dog 主頁：1024px 起大型名稱與場景左右分欄，較窄時先讀介紹與行動，再看場景。手機主要行動滿寬，各區隨文字自然增高。主要行動前往既有封測指南，次要行動跳至政策區。
- 產品政策入口：隱私權政策及服務條款各提供中英文連結，標出文件語言。每列最小高度 72px，640px 起為 88px。標誌及頁尾連回開發者首頁。
- 目錄：原生 details/summary，窄版可收合，桌面常開；每個章節 ID 必須唯一。
- 鍵盤焦點：2px accent 外框，整卡連結將焦點顯示在卡片外圍。
- 減少動態：針對既有互動關閉轉場與位移，保留焦點、色彩與目錄開合狀態，不使用全域極短動畫覆寫。

## Do's and Don'ts
- Do：沿用 CSS tokens、共享頁邊與雙語文字規則。
- Do：政策內容變更時同步檢查中英文及摘要。
- Do：新增頁面檢查窄版、桌面、深色、鍵盤與減少動態。
- Don't：未確認上架就啟用下載入口。
- Don't：以生成畫面代替實際遊戲截圖。
- Don't：為純政策網站加入無資料支撐的宣傳數據。
