import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../../../lib/axios-config";
import { useNavigate, useParams } from "react-router-dom";

export type TaskType = {
  id?: string;
  board_id?: string;
  title: string;
  description: string;
  column_id: string;
  subtasks: { id?: string; title: string; iscompleted?: boolean }[];
};

export type Boards = { id: string; name: string };
export type Column = { id: string; name: string; color: string };
export type Board = { name: string; id: string; columns: Column[] };
function useBoards() {
  const queryClient = useQueryClient();
  const { boardID } = useParams();
  const navigate = useNavigate();
  const getBoards = async () => {
    return await api
      .get("/boards")
      .then((res) => {
        return res.data as Boards[];
      })
      .catch((err) => console.error(err));
  };

  const getBoard = async () => {
    if (!boardID) return;
    return await api
      .get(`/boards/${boardID}`)
      .then((res) => {
        return res.data as Board;
      })
      .catch((err) => console.error(err));
  };

  const createBoard = async (data: {
    name: string;
    columns: { name: string }[];
  }) => {
    return await api
      .post("/boards", data)
      .then((res) => {
        navigate(res.data.id);
        return res.data;
      })
      .catch((err) => console.error(err));
  };

  const editBoard = async (data: Board) => {
    return await api
      .put(`boards/${boardID}`, data)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  };

  const deleteBoard = async () => {
    if (!boardID) return;

    return await api
      .delete(`/boards/${boardID}`)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  };

  const invalidateBoardsQuery = () => queryClient.invalidateQueries("boards");
  const invalidateBoardQuery = () =>
    queryClient.invalidateQueries(["board", boardID]);

  const boardsQuery = useQuery("boards", getBoards);
  const boardQuery = useQuery(["board", boardID], getBoard);
  const createMutation = useMutation({
    mutationFn: createBoard,
    onSuccess: invalidateBoardsQuery,
  });

  const updateMutation = useMutation({
    mutationFn: editBoard,
    onSuccess: () => {
      invalidateBoardQuery();
      invalidateBoardsQuery();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBoard,
    onSuccess: (data) => {
      invalidateBoardsQuery();
      if (data.length < 1) {
        navigate("/");
      } else {
        navigate(data[data.length - 1].id);
      }
    },
  });

  return {
    boardsQuery,
    boardQuery,
    updateMutation,
    createMutation,
    deleteMutation,
  };
}

function useTasks() {
  const queryClient = useQueryClient();
  const { boardID } = useParams();
  const getTasks = async () => {
    return await api
      .get(`/tasks/${boardID}`)
      .then((res) => res.data as TaskType[])
      .catch((err) => console.error(err));
  };

  const createTask = async (data: TaskType) => {
    return await api
      .post("/tasks", data)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  };

  const editTask = async (data: TaskType) => {
    return await api
      .put(`tasks/${data.id}`, data)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  };

  const deleteTask = async (id: string) => {
    return await api
      .delete(`tasks/${id}`)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  };

  const invalidateTasksQuery = () =>
    queryClient.invalidateQueries(["tasks", boardID]);

  const tasksQuery = useQuery(["tasks", boardID], getTasks);
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: invalidateTasksQuery,
  });
  const editMutation = useMutation({
    mutationFn: editTask,
    onSuccess: invalidateTasksQuery,
  });

  const deleteMutation = useMutation(deleteTask, {
    onSuccess: invalidateTasksQuery,
  });

  return { tasksQuery, createMutation, editMutation, deleteMutation };
}

function useSubtasks() {
  const queryClient = useQueryClient();
  const { boardID } = useParams();
  const updateSubtask = async (subtask: {
    id: string;
    title: string;
    iscompleted: boolean;
  }) => {
    return await api
      .put(`/subtasks/${subtask.id}`, subtask)
      .then((res) => res.data)
      .catch((err) => console.error(err));
  };

  const updateMutation = useMutation({
    mutationFn: updateSubtask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", boardID]);
    },
  });

  return { updateMutation };
}

export { useBoards, useTasks, useSubtasks };
