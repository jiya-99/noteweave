# AGENTS.md — NoteWeave 開發規範

本文件是 AI 開發代理在維護 NoteWeave 時必須遵循的專案規則。若使用 Claude Code，也可將本文件內容作為 `CLAUDE.md` 的依據。

## 1. 專案目標
- NoteWeave 是以 Markdown 為核心的個人筆記與知識管理網站。
- 核心概念：Sources、Raw Notes、Knowledge Wiki 分層；原始筆記不得因整理流程而被覆寫。
- 第一階段部署於 GitHub Pages，必須維持純前端靜態網站相容性。
- 介面採 Obsidian-inspired 深色知識庫風格：深灰底色、低飽和紫色重點、清楚資訊層級、桌面與行動裝置響應式布局。

## 2. 技術架構
- React 18 + TypeScript + Vite。
- CSS 使用 `src/styles.css`，目前不使用 Tailwind。
- 資料持久化使用 IndexedDB，存取集中在 `src/lib/db.ts`。
- Markdown 解析使用 `marked`，輸出必須經 `DOMPurify` 清理。
- 圖示使用 `lucide-react`。
- 不得加入需要伺服器才能運作的必要依賴。

## 3. 目錄責任
- `src/App.tsx`：主要頁面狀態、導覽及功能流程；新增功能時避免持續把所有邏輯塞進單一元件，必要時拆至 pages/components/hooks。
- `src/components/`：可重用 UI 元件。
- `src/pages/`：獨立頁面。
- `src/lib/db.ts`：IndexedDB CRUD 與資料存取。
- `src/lib/markdown.ts`：Markdown 顯示、wikilinks 解析及安全處理。
- `src/lib/sample.ts`：可選用的示範資料；必須由使用者明確操作載入，且可清除，不可在首次啟動時自動混入正式資料。
- `src/types.ts`：共用資料型別。
- `docs/`：規格、架構及決策紀錄。

## 4. 資料規則
- `Note` 必須區分 `type: 'note' | 'wiki'`。
- 每筆資料至少包含 `id`、`title`、`content`、`type`、`category`、`tags`、`createdAt`、`updatedAt`。
- 原始筆記與知識文章分開管理；Wiki 可透過 `sourceNoteIds` 指向來源筆記。
- 刪除、清空、備份還原及覆蓋匯入等高風險操作必須先確認。
- 使用者資料預設留在瀏覽器 IndexedDB；不得未經同意上傳到外部服務。
- 匯入資料需檢查格式；匯出需提供可攜格式。
- 統計數字必須由實際資料計算，不可寫死。

## 5. Markdown 與知識連結
- Markdown 預覽必須經 HTML sanitizer 清理，禁止直接輸出未清理的 HTML。
- `[[文章名稱]]` 是內部連結格式；已存在目標可導覽，未存在目標需明確呈現為未建立連結。
- 反向連結應由內容中的 wikilinks 動態掃描，不可只靠手動欄位。
- 知識整理只能建立草稿；不得默默覆寫來源筆記。
- AI 生成內容（未來功能）必須保留來源引用、標示不確定處，並由使用者確認後才寫入。

## 6. UI/UX 規範
- 所有可見按鈕、表單及控制項都必須有實際功能；尚未實作的功能需明確標示「規劃中」。
- 保持深色視覺一致性、足夠對比、鍵盤可操作性與明確 hover/focus 狀態。
- 桌面使用側邊欄；手機側邊欄可收合或以抽屜呈現。
- 空資料、載入失敗、儲存失敗、匯入錯誤都要提供可理解訊息。
- 刪除與資料覆蓋操作需二次確認。

## 7. GitHub Pages 部署規則
- Vite `base` 必須與 Repository 名稱一致；目前預設 Repository 名稱為 `noteweave`。
- 若 Repository 名稱變更，必須同步修改 `vite.config.ts` 的 base 及 README 部署說明。
- 使用 `.github/workflows/deploy.yml` 建置並部署 `dist/`。
- 不得在前端程式碼、Git 歷史或公開 Repository 放入 API Key、密碼、私人筆記或個資。
- 前端路由採 hash 導覽或其他可支援 GitHub Pages 重新整理的方式；不得造成子路徑 404。

## 8. 開發流程
1. 先閱讀本文件、`README.md` 與 `docs/PROJECT_SPEC.md`。
2. 修改前檢查現有程式碼及資料模型，不可任意覆蓋既有功能。
3. 優先完成可驗證的小步驟，避免一次產生大量未測試程式碼。
4. 每次完成重要修改後執行 `npm run build`，修正 TypeScript 與建置錯誤。
5. 若新增套件，說明用途並確認支援靜態部署。
6. 更新 README 的功能狀態、啟動方式及已知限制。
7. 不得宣稱未實作的功能已完成。

## 9. 新增頁面或功能時
- 先定義使用情境、資料來源、空狀態及錯誤狀態。
- 共用元件放入 `src/components/`；頁面放入 `src/pages/`；資料操作放入 `src/lib/` 或獨立 service。
- 若涉及資料結構變更，提供相容既有 IndexedDB 資料的升級或遷移策略。
- 新增導覽項目時同步更新側邊欄、頁面標題及 README。
- 新增操作需確認可用滑鼠與鍵盤操作，並在桌面與手機測試。
- 完成後列出變更檔案、測試結果及尚未完成事項。

## 10. 已知限制
- IndexedDB 僅儲存在目前瀏覽器，不會自動跨裝置同步，也不會自動同步到 GitHub。
- AI 摘要、AI 問答與雲端同步目前不是已啟用功能。
- GitHub Pages 僅提供靜態網站託管，未來若串接正式 AI API，必須新增安全後端；不得將 API Key 放在前端。
