# indie-dev-fayang.com

This is the personal website of Fayang (Fay), an indie game developer. It hosts the privacy policies and terms of service for Fayang's games.

這是獨立遊戲開發者 Fayang（Fay）的個人網站，放置 Fayang 各款遊戲的隱私權政策與服務條款。

https://indie-dev-fayang.com/

## Nuxt 遷移預覽

使用 `.node-version` 指定的 Node.js 版本與 `package.json` 指定的 npm 版本。

```sh
npm ci
npm run generate
python -m http.server 8000 --directory .output/public
```

純靜態預覽沿用 `/mountaindog/privacy.html` 與 `/mountaindog/privacy-en.html`。Nuxt 使用既有 HTML 作為政策內容來源，將兩頁分別產生為 `.output/public/mountaindog/privacy.html` 與 `.output/public/mountaindog/privacy-en.html`。建置完成後會將其餘頁面、資源和根目錄 `app-ads.txt` 複製到原有位置。

建置後執行 `npx playwright install --only-shell chromium` 和 `npm test`，可檢查靜態 HTTP 回應、政策正文和瀏覽器操作。PR 的 **Nuxt static preview** 工作流程通過檢查後會提供 `nuxt-static-preview` 下載檔。解壓後可直接將其根目錄指定給靜態伺服器。
