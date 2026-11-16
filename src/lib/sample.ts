import type { Note } from '../types'
const now = new Date().toISOString()
export const samples: Note[] = [
 {id:'sample-1',title:'資料庫正規化',type:'note',category:'資料庫',tags:['SQL','資料庫設計'],isPinned:true,createdAt:now,updatedAt:now,content:'# 資料庫正規化\n\n資料庫正規化是透過資料表結構調整，降低資料重複與更新異常的設計方法。\n\n## 正規化階段\n- **第一正規化（1NF）**：欄位值保持原子性。\n- **第二正規化（2NF）**：符合 1NF，且非主鍵欄位完全依賴整個候選鍵。\n- **第三正規化（3NF）**：符合 2NF，並避免非主鍵欄位間的遞移相依。\n\n延伸閱讀：[[SQL 基礎]]'},
 {id:'sample-2',title:'SQL 基礎',type:'note',category:'資料庫',tags:['SQL','入門'],isPinned:false,createdAt:now,updatedAt:now,content:'# SQL 基礎\n\nSQL（Structured Query Language）是用來管理與查詢關聯式資料庫的語言。\n\n## 常見指令\n- `SELECT`：查詢資料\n- `INSERT`：新增資料\n- `UPDATE`：更新資料\n- `DELETE`：刪除資料\n\n相關概念：[[資料庫正規化]]'},
 {id:'sample-3',title:'知識管理工作流',type:'wiki',category:'個人知識管理',tags:['Wiki','工作流'],isPinned:true,createdAt:now,updatedAt:now,sourceNoteIds:['sample-1','sample-2'],content:'# 知識管理工作流\n\n有效的知識管理不只是保存資料，更重要的是建立脈絡、連結與可回溯的來源。\n\n## 建議流程\n1. 收集原始資料。\n2. 整理成可搜尋的筆記。\n3. 將多篇筆記吸收為主題文章。\n4. 建立內部連結並定期檢查。\n\n## 參考筆記\n- [[資料庫正規化]]\n- [[SQL 基礎]]'}
]
