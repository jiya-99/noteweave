# NoteWeave — Personal Knowledge Space

NoteWeave 是一個以 Markdown 為核心的個人筆記與知識管理網站。它將原始筆記、整理後的 Wiki 知識文章及彼此的內部連結放在同一個工作空間，協助使用者逐步建立可搜尋、可追溯的個人知識庫。

## 專案特色

- Obsidian-inspired 深色知識管理介面。
- Dashboard 統計、最近編輯與快速入口。
- 可由使用者手動載入示範資料，不會在首次開啟時自動混入範例筆記。
- 筆記新增、編輯、刪除、釘選、分類及標籤。
- Markdown 編輯與安全預覽。
- IndexedDB 本機保存，重新整理後資料仍會保留。
- Wiki 知識文章、`[[wikilinks]]`、相關連結及反向連結。
- 多篇筆記人工吸收成知識文章草稿。
- 全文搜尋、Markdown 匯入／匯出、JSON 備份與還原。
- GitHub Actions 自動部署 GitHub Pages。

## 技術

React 18、TypeScript、Vite、CSS、IndexedDB、marked、DOMPurify、lucide-react。

## 本機啟動

需要 Node.js 20 或更新版本。

```bash
npm install
npm run dev
```

開啟終端機顯示的本機網址即可使用。

## 建置檢查

```bash
npm run build
npm run preview
```

## GitHub Pages 部署

1. 在 GitHub 建立名為 **noteweave** 的 Repository。
2. 將本專案所有檔案上傳至 Repository 根目錄。
3. 到 Repository 的 **Settings → Pages → Build and deployment**。
4. Source 選擇 **GitHub Actions**。
5. 推送至 `main` 分支後，Actions 會自動執行建置與部署。
6. 成功後網址通常為 `https://你的GitHub帳號.github.io/noteweave/`。

> 如果 Repository 名稱不是 `noteweave`，請修改 `vite.config.ts` 的 `base`，並確認部署網址。若使用 GitHub Actions 環境，設定 `base` 為 `/${Repository名稱}/`。

## 資料保存與隱私

筆記存在使用者目前瀏覽器的 IndexedDB，不會自動同步到 GitHub 或其他裝置。請定期使用「匯入／匯出」頁面下載 JSON 備份。清除瀏覽器資料、更換瀏覽器或裝置可能造成資料無法直接存取。

不要將私人筆記、密碼、API Key 或個人敏感資料提交到公開 Repository。GitHub Pages 是靜態託管，不提供資料庫或安全的 AI API 後端。

## AI 開發規則

請先閱讀根目錄的 [`AGENTS.md`](./AGENTS.md)。它定義專案目標、技術架構、資料規則、Markdown 安全要求、UI 規範、部署方式及新增頁面的流程。未來使用 Claude Code 時，可將相同規則放入 `CLAUDE.md`，或直接要求代理遵循 `AGENTS.md`。

### 未來新增頁面時，規則如何幫助 AI？

AI 會先理解現有架構，再決定頁面、共用元件與資料存取層應放置的位置；同時遵守深色介面規範、IndexedDB 資料保存方式、Markdown 安全處理及 GitHub Pages 靜態部署限制。每次修改後都必須執行建置檢查、更新文件，並回報測試結果，降低新功能破壞既有功能的風險。

## 目前版本範圍

已提供可操作的第一版核心流程。AI 自動摘要、AI 問答、雲端同步、帳號登入及跨裝置同步尚未實作；知識整理目前是人工確認的草稿流程。
