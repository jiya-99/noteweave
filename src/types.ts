export type NoteType = 'note' | 'wiki'
export interface Note {
  id: string; title: string; content: string; type: NoteType; category: string;
  tags: string[]; isPinned: boolean; createdAt: string; updatedAt: string;
  sourceNoteIds?: string[]; aliases?: string[]
}
export type Page = 'dashboard' | 'notes' | 'wiki' | 'organize' | 'search' | 'import-export' | 'settings'
