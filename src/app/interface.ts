export interface uTask {
  id: number;
  description: string;
  assigneeId: any;
  assignee: string;
  completed: boolean;
};

export interface iUser {
  label: string,
  value: number
}