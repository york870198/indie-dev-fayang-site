# Fayang

<!-- impeccable:product-schema 1 -->

## Platform

web

## Purpose
Fayang 的獨立遊戲開發者網站，提供遊戲簡介、繁體中文與英文隱私權政策、服務條款及聯絡入口。依據 README 與目前頁面整理。

## Audience and tasks
玩家與家長可查閱資料儲存、備份、刪除、廣告及遊戲規則；審查人員可直接取得各語言政策網址。

## Confirmed product facts
- Mountain Dog 為 Android 遊戲；以輸入食物餵養伯恩山犬為核心介紹。
- 現正進行 Google Play 封閉測試招募（測試說明頁：mountaindog/testing.html）；首頁與遊戲主頁已更新招募狀態與指引入口。
- 聯絡信箱：support@indie-dev-fayang.com。
- 原始 HTML 是內容來源，Nuxt 讀取原始文件並產生靜態網站；`npm run generate` 建置至 `.output/public`，`npm test` 驗證靜態產物。頁面主要使用 HTML / CSS 與少量目錄 JavaScript，沒有網站登入流程。
- 遊戲的資料、廣告及年齡設定描述以現有政策為依據；本專案未包含遊戲程式，不能當作實作驗證。

## Content constraints
中英文文件同步維護。封閉測試指引依 Google Play 規範引導測試者加入 Google Groups 白名單、取得測試身分與下載測試版本。政策的事實與法律意義不可因視覺調整而改變。

## Available assets
包含 mountaindog/icon.png、favicon.svg 與 mountaindog/screenshots/ 下的遊戲畫面；產品主頁已使用 screenshots/v2/ 的實際遊戲截圖，來源及裁切紀錄見該目錄的 README.md 與 provenance.json。

## Positioning

現有頁面以陪伴伯恩山犬、輸入想像的食物及逐漸長大的玩法介紹 Mountain Dog；沒有已確認的競品優勢或比較數據，不應補寫。

## Operating Context

訪客先查看遊戲介紹，再前往 Android 封閉測試指引或中英文政策文件。封測指引在 mountaindog/testing.html；正式政策與條款須能從既有網址直接開啟。

## Evidence on Hand

- 遊戲畫面：mountaindog/screenshots/v2/，保留 provenance.json 的來源紀錄。
- 內容來源：index.html、mountaindog/index.html 及各政策 HTML；app/pages/ 透過 SiteDocument 讀取。
- 驗證：tests/static-preview.test.mjs 檢查原始與靜態產物、導覽、圖片及無 JavaScript 操作。
- 本專案未提供遊戲程式或玩家研究；受眾偏好、成效數據與正式上架時間仍未確認。

## Product Principles

- 以實際遊戲畫面介紹玩法，不以生成素材代替遊戲證據。
- 清楚區分封閉測試與正式上架，使用現有測試指引承接加入流程。
- 維持中英文政策內容、語意與既有入口完整。
- 保留鍵盤、手機與無 JavaScript 的主要操作路徑。
