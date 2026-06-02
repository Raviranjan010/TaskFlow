import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchTasks = async (statusFilter = filter) => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/tasks?status=${statusFilter}`);
      setTasks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks.');
      toast.error('Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks(filter);
    } else {
      setTasks([]);
    }
  }, [isAuthenticated, filter]);

  const addTask = async (taskData) => {
    try {
      const response = await api.post('/api/tasks', taskData);
      setTasks((prev) => [response.data, ...prev]);
      toast.success('Task created successfully!');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add task.');
      return false;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/api/tasks/${id}`, taskData);
      setTasks((prev) => prev.map((t) => (t._id === id ? response.data : t)));
      toast.success('Task updated successfully!');
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update task.');
      return false;
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await api.patch(`/api/tasks/${id}/complete`);
      // Update locally
      setTasks((prev) => prev.map((t) => (t._id === id ? response.data : t)));
      if (response.data.isCompleted) {
        toast.success('Task completed!');
      } else {
        toast.success('Task marked as pending.');
      }
    } catch (err) {
      toast.error('Failed to toggle task completeness.');
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success('Task deleted.');
    } catch (err) {
      toast.error('Failed to delete task.');
    }
  };

  const pendingCount = tasks.filter((t) => !t.isCompleted).length;
  const completedCount = tasks.filter((t) => t.isCompleted).length;

  return (
    <TaskContext.Provider value={{
      tasks,
      filter,
      setFilter,
      loading,
      error,
      fetchTasks,
      addTask,
      updateTask,
      toggleComplete,
      deleteTask,
      pendingCount,
      completedCount
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
