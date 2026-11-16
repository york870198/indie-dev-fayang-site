# GitHub Pages 發布與回復

正式網址是 `https://indie-dev-fayang.com`。目前正式版的回復基準是提交 `e3a6244153cdd74012ce59cd45cbd62c51d97cce`。公開部署紀錄顯示該提交成功由 `main` 發布，基準檔案也已與正式網域的回應比對。 [基準部署紀錄](https://github.com/york870198/indie-dev-fayang-site/actions/runs/43851355020)

## 首次切換

1. 推送功能分支並開啟 PR。確認 **Nuxt static preview and Pages release** 通過全部測試，並下載 `nuxt-static-preview`。
2. 從 GitHub 的 **Settings → Pages** 記錄目前的發布來源、分支與資料夾。確認自訂網域是 `indie-dev-fayang.com`，以及 **Enforce HTTPS** 的狀態。Cloudflare 公開 DNS 解析到 GitHub Pages，後台仍需確認代理狀態。保留現有 DNS、代理及網域設定。
   - 核對 Play Console 的隱私權政策網址與開發者網站，以及 App 內政策入口。若需要帳號權限，將未確認項目記入發布紀錄，先完成公開網址檢查。
3. 確認回復基準提交可用。工作流程的 `rollback` 模式可重新封裝該提交的原始網站檔案。將 **Build and deployment → Source** 切到 **GitHub Actions**。 [GitHub Pages 發布來源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
4. 合併已通過預覽驗收的 PR。此後 push 更新 `main` 會觸發建置、測試及部署。短時間連續推送時，GitHub 只保留最新待執行的工作流程，已被取代的提交也會在部署前被擋下。如果先合併才切換發布來源，切換完成後可在 Actions 手動選擇 `main` 和 `release` 補跑。部署後，工作流程會用未登入的 HTTP 請求比對正式站與實際發布產物，包含政策全文、`app-ads.txt`、頁面、靜態資源、自訂 404 與 HTTPS 導向。確認部署與驗證均為成功，並從手機與桌面抽驗封閉測試頁和法律文件目錄。 [GitHub Actions 並行規則](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency)
5. 上線後核對 AdMob 對 `/app-ads.txt` 的抓取狀態，或記錄尚待具權限者確認。在發布紀錄中保存工作流程連結、驗證結果及 Console 確認結果。

## 正式站回復

若驗證確認出現政策正文缺漏、舊網址失效、廣告授權檔錯誤或網站操作退步，先暫停推送 `main` 並取消仍在等待的發布執行，再在同一個工作流程選擇 `main` 和 `rollback`。新的推送可能取代尚未開始的回復，請確認回復實際開始並通過公開驗證。用手機和桌面重新抽驗受影響的頁面，並記錄失敗與回復的兩個工作流程連結。

發布前會再次核對提交仍是 `main` 最新版本。回復之後若需再次發布，請將已驗收的修正推送到 `main`，或從 `main` 開始新的手動執行。重新執行舊工作流程會沿用原本的提交及模式。

若 Actions 無法部署，先用該基準提交準備一個可供 Pages 讀取的 GitHub 分支，再於 Pages 設定將發布來源切回分支，選擇該分支的 `/ (root)`。保留其根目錄的 `CNAME`，並再次確認 Pages 的自訂網域及 HTTPS 設定。回復完成後，用基準檔案重新執行公開驗證。

```sh
mkdir rollback-site
git archive e3a6244153cdd74012ce59cd45cbd62c51d97cce -- index.html 404.html app-ads.txt favicon.svg style.css toc.js mountaindog | tar -x -C rollback-site
python scripts/verify-pages.py rollback-site
```
