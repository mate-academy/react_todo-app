export interface TodoHandlers {
  onUpdate: (id: number, newCompleted: boolean) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onEdit: (id: number, title: string) => Promise<void>;
}
