---
name: Fayang
description: Warm, bilingual game and policy website
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
既有網站使用暖紙色背景與栗色重點色，遊戲圖示承載角色識別。維持目前精簡入口與長文閱讀結構；style.css 是完整可執行樣式來源。

## Colors
使用 --bg、--surface、--card 三層背景；正文 --ink，次要文字 --muted，連結 --accent。深色模式依 prefers-color-scheme 自動切換，完整對應值見 style.css。遊戲底色由 --game-tint 指定。Logo 固定品牌色不隨主題變更。

## Typography
標題 Funnel Display、正文 Funnel Sans，中文使用系統後備字型。首頁標題 clamp(2.35rem, 1.85rem + 2.2vw, 3.5rem)，其他 h1 為 clamp(1.9rem, 1.55rem + 1.5vw, 2.55rem)。正文 16.5px / 1.72。英文輔助文字以較淡顏色區分，內容不省略；文件分中英文頁面。

## Layout
共用容器 --wrap: 68rem；文件 --measure: 39rem。頁邊距 20px，40rem 起 36px，64rem 起 56px。單遊戲卡片在 42rem 起左右排列；文件在 64rem 起顯示 15.5rem 側欄與 3.5rem 欄距。郵件地址允許換行。

## Elevation & Depth
卡片用細框與內側柔和高光。滑鼠懸停時遊戲卡片微升 2px，圖示放大；文件閱讀頁保持平坦背景。

## Shapes
遊戲卡片 20px，內層舞台 12px，按鈕 10px。平台標記與語言切換使用膠囊形狀。

## Components
- 遊戲卡片：圖示、名稱、平台、發行狀態、雙語玩法與政策入口；首頁整卡可點擊。
- 語言切換：最小高度 44px，清楚標示目標語言。
- 政策入口：每列最小高度 52px，各語言獨立連結。
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
