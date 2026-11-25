# Mountain Dog 網站圖片更新（工票 04）

## 畫面目標

2026-11-25 使用者確認：展示遊戲現況與狗狗日常為主，加入封閉測試為次要行動。保留 Fayang 品牌、現有語言結構及政策／聯絡入口。

閱讀順序：狗狗與平房主圖 → 翻滾與睡覺 → 輸入食物與餵食預覽 → 長成山 → 封閉測試及政策。

## 素材來源

- 每張 WebP 的來源 SHA-256、裁切座標及輸出寬度列於 `provenance.json`。座標採原圖像素，順序為 left、top、right、bottom；null 表示完整畫面。縮放維持比例，以 Pillow LANCZOS、WebP quality 88 / method 6 輸出。
- `house`、`house-close`、`mountain`、`preview` 來自 MountainDog 專案素材 v2 的 10 吋平板繁中成品；版本 1.4.2-debug，來源提交 1855522，裝置與原始紀錄見該專案 `screenshots/tablet-provenance.json`。
- `serve`、`preview-phone` 來自同批手機繁中成品，來源提交 4f18888。避開已有按鍵裁切缺陷的手機橫向預覽。
- `sleep`、`roll` 另於 2026-11-25 使用當前遊戲（提交 6753903，工作區僅版號變更）在隔離 Chromium 1000×750 視窗補拍；示範資料為麻糬、營養 420、餵食 30 次。使用遊戲自然活動，僅以既有 activityIdle=1 縮短待機等待並隱藏開發滑桿，沒有替換狗狗或背景。原圖及來源紀錄存於 MountainDog 專案的 `assets/store-listing-v2/website/`。
- 場景與日常圖裁去系統列及操作區；玩法圖完整保留所有操作介面。沒有生成新美術，也沒有用修圖掩蓋遊戲缺陷。
- v1 圖片保留供開發者首頁與封測說明頁使用，本票只更新 Mountain Dog 產品頁。

## 預覽與發布

在網站專案執行 `npm run generate`、`npm test`、`npm run preview`，開啟 `http://127.0.0.1:8000/mountaindog/`。Nuxt 頁面直接讀取產品 HTML，生成結果在 `.output/public/`；靜態網站不需要客戶端 JavaScript。

本票不部署。現有 GitHub Actions 會在 main 推送時建置、測試並部署 Pages，因此在工票 06 確認以下事項前不要推送發布：

- 圖片所示內容已在玩家可取得的版本中。
- 封閉測試招募狀態、測試指南、QR code 的目標與實際發行狀態一致。
- 遊戲若在驗收後調整版面，重拍受影響畫面並同步來源紀錄。
- 發布後核對手機與桌面頁面、圖片、四個政策入口及聯絡方式。

## 驗收

產品頁既有自動測試已調整為「首屏先看見狗狗，QR 在展示內容之後」。其他既有靜態輸出、無 JavaScript 導覽、政策與測試指南行為持續執行原測試。

目視證據存於 MountainDog 專案 `.scratch/store-refresh/evidence/`，包含手機、平板、桌面、窄螢幕與手機深色。另檢查 200% 文字、跳到主內容、全部圖片及內部連結。
