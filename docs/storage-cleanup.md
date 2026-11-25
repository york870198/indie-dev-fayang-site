# 專案檔案保留範圍

2026-11-25 核對頁面引用、Nuxt 建置、測試與發布流程。

實際移除 6,497 個檔案，共 1,247,394,924 bytes（約 1.16 GiB）。`npm run generate` 成功、既有 25 項測試全部通過；另確認發布產物排除兩張未引用圖片及素材維護紀錄，保留字型授權，素材來源紀錄所列尺寸均有對應檔案。建置後保留預覽產物供本機檢查。

## 清理項目

- `.scratch/npm-cache/`：npm 下載快取。
- `.scratch/playwright/`：與 `.scratch/playwright-browsers/` 重複的測試瀏覽器。
- `.taste-skill/` 的瀏覽器設定檔、暫存套件、JSON 報告與截圖；保留 Markdown 計畫及驗收紀錄。
- `shots/`、`mountaindog/.taste-skill/`、`.scratch/` 根目錄的 audit/layout PNG：舊版面檢查輸出。
- `.scratch/vue-migration/rollback-site/`、`rollback-site.tar`：可由 Git 基準提交重建的網站副本，重建方式見 `pages-release.md`。
- `.scratch/vue-migration/actionlint.exe`：一次性檢查工具。
- `mountaindog/screenshots/scene-1080.webp`、`mountaindog/screenshots/v2/preview-960.webp`：未被目前頁面、樣式或測試引用的圖片尺寸。

## 保留項目

- 原始 HTML：`app/pages/` 在建置時仍直接匯入，並非重複產物。
- 其他遊戲截圖、字型及其授權：網站內容仍使用。`README.md` 與 `provenance.json` 保留素材來源紀錄，但不隨圖片目錄複製至網站。
- `.scratch/` 中的工票、規格、已接受的設計參考與相關證據：供進行中的工作追溯，不整個忽略或刪除。
- `.agents/`、`.claude/`、`.impeccable/`：本機工具與設定；已由 Git 忽略，不是網站資產。
- `node_modules/` 與 `.scratch/playwright-browsers/`：本機建置與測試依賴，已忽略。使用保留的瀏覽器執行測試：

  ```powershell
  $env:PLAYWRIGHT_BROWSERS_PATH = "$PWD/.scratch/playwright-browsers"
  npm run generate
  npm test
  ```

`.nuxt/`、`.output/` 與 `dist`（指向 `.output/public` 的連結）是可重建的預覽產物，已由 Git 忽略。清除後需先執行 `npm run generate` 才能預覽或執行靜態網站測試。

刪除已追蹤檔案只會縮小目前版本與之後的發布產物；不會回收 Git 歷史中的物件。本次不改寫歷史。
