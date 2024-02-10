import data from "../data.json";

interface Column {
  name: string;
  tasks: {
    title: string;
    description: string;
    status: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  }[];
}
interface Board {
  name: string;
  id: string;
  columns: Column[];
}

export default function useBoardsData() {
  const boards: Board[] = data;

  return boards;
}
