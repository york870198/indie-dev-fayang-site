# Fayang 開發者網站

Fayang 所有遊戲共用的開發者網站：Google Play 的「開發者網站」與 AdMob 的 `app-ads.txt` 都指向這裡。純靜態 HTML，沒有建置步驟。

```
index.html                    開發者首頁（遊戲列表與聯絡方式）
app-ads.txt                   必須在網域根目錄
style.css
mountaindog/privacy.html      隱私權政策（中文版為準）
mountaindog/privacy-en.html   Privacy Policy（英文譯本）
mountaindog/terms.html        服務條款
mountaindog/terms-en.html     Terms of Service
```

新遊戲：加一個 `<遊戲>/` 資料夾放它的政策，並在 `index.html` 列出。`app-ads.txt` 全部遊戲共用一份。

## 上線前要換掉的佔位字

| 佔位字 | 換成 |
|---|---|
| `2026-11-XX` | 政策正式公開的日期（中英四頁要一致） |
| `pub-0000000000000000` | AdMob 發布商 ID（`app-ads.txt`，AdMob 後台「應用程式 > app-ads.txt」可複製整行） |

網域已換成 `indie-dev-fayang.com`。

```bash
grep -rn "2026-11-XX\|pub-0000000000000000" .
```

## 部署：GitHub Pages + 自有網域（Cloudflare 管 DNS 與信箱轉寄）

為什麼這樣選，見遊戲 repo 的 `docs/adr/0005-developer-site.md`。

1. **信箱轉寄**：Cloudflare「Email Routing」建立 `support@indie-dev-fayang.com`，轉寄到你的收件匣。Cloudflare 會自動加上 MX 和 SPF 記錄。這是免費的，但只能收信；要用這個地址回信，之後再設定 Gmail「以其他地址寄送」並搭配 SMTP 服務。
2. **換掉佔位字**（見上表）並 commit。發布商 ID 還沒有的話可以先留著，AdMob 驗證會等到換掉之後才通過。
3. **隱藏 commit 信箱**：這是 public repo，commit 的作者信箱會公開。推上去之前：
   - 把 repo 的 `user.email` 設成 GitHub 的 noreply 地址。
   - 用 `git commit --amend --reset-author` 或 rebase 改寫還沒推過的 commit。
   - 在 GitHub「Settings > Emails」勾選「Keep my email addresses private」和「Block command line pushes that expose my email」。
4. **驗證網域擁有權**，防止網域被別人的 Pages 接管：
   - 到 GitHub 帳號 Settings → Pages → Add a domain，在 Cloudflare 加上它給的 `TXT` 記錄（`_github-pages-challenge-<帳號>`），再按 Verify。
   - 這筆記錄要永久保留。
5. **建 public repo**（例如 `fayang-site`），把這個資料夾推上去。
6. **GitHub Pages**：
   - repo Settings → Pages → Source 選「Deploy from a branch」→ `main` / `(root)`。
   - Custom domain 填裸網域，GitHub 會自動 commit 一個 `CNAME` 檔，之後記得先 `git pull`。
7. **DNS**：在 Cloudflare 把 Proxy 設為「DNS only」（灰色雲），否則 GitHub 簽不到也續不了 HTTPS 憑證。
   - 裸網域 `A` → `185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
   - 裸網域 `AAAA`（選填）→ `2606:50c0:8000::153`、`2606:50c0:8001::153`、`2606:50c0:8002::153`、`2606:50c0:8003::153`
   - `www` `CNAME` → `<GitHub 帳號>.github.io`（不含 repo 名稱）
8. **HTTPS**：DNS 檢查通過、憑證簽好後（最多 24 小時），勾選「Enforce HTTPS」。
9. **填 Play Console**：開發者網站填 `https://indie-dev-fayang.com/`，隱私權政策填 `https://indie-dev-fayang.com/mountaindog/privacy.html`。
10. **AdMob**：填完 Play 商店資訊後，在 AdMob「應用程式 > app-ads.txt」按「檢查更新」，最多可能要等 24 小時。

## 檢查清單

- [ ] 四頁政策公開可讀、不用登入，手機寬度正常
- [ ] `https://indie-dev-fayang.com/app-ads.txt` 回傳純文字，內容是正式的發布商 ID
- [ ] 寄信到 `support@indie-dev-fayang.com` 收得到
- [ ] 遊戲內有隱私權政策連結（Play 要求「商店資訊和 App 內」都要有）

## 備選方案

- **Cloudflare Pages**：可以直接從 private repo 免費部署，也能用自有網域；選它就不需要另開 public repo。缺點是多一個建置整合要維護。
- **不買網域**：`<GitHub 帳號>.github.io`（repo 必須命名為 `<帳號>.github.io` 才能把 `app-ads.txt` 放在根目錄），或 `<專案>.pages.dev`。免費，但之後換主機時 Play 與 AdMob 都要改，網址也綁著平台帳號名稱。

## 免責

政策內容依目前程式行為（只有 Google AdMob／UMP 會連網；存檔只在裝置與 Android 自動備份；年齡篩選答案不上傳、不備份）撰寫，不是法律意見。遊戲加入新的 SDK 或連網功能時，要同步更新政策與 Play 資料安全表單。
