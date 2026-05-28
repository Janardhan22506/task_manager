import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, ChevronLeft, ChevronRight, X, Loader2, Calendar, ClipboardList } from 'lucide-react';
import { getTasks, createTask, updateTask, deleteTask } from '../utils/api';

const STAGES = ['To Do', 'In Progress', 'Done'];

export default function TaskBoard() {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', stage: 'To Do' });
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setIsLoading(true);
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (err) {
            setError(err.message || 'Failed to fetch tasks.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (task = null) => {
        if (task) {
            setEditingTask(task);
            setFormData({ title: task.title, description: task.description, stage: task.stage });
        } else {
            setEditingTask(null);
            setFormData({ title: '', description: '', stage: 'To Do' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
        setFormData({ title: '', description: '', stage: 'To Do' });
    };

        const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        setFormLoading(true);
        try {
            if (editingTask) {
                const response = await updateTask(editingTask.id, formData);
                setTasks(prev => prev.map(t => t.id === editingTask.id ? response.data : t));
            } else {
                const response = await createTask(formData);
                setTasks(prev => [response.data, ...prev]);
            }
            handleCloseModal();
        } catch (err) {
            alert(err.message || 'Error saving task');
        } finally {
            setFormLoading(false);
        }
    };

    const handleMoveStage = async (task, direction) => {
        const currentIndex = STAGES.indexOf(task.stage);
        let nextIndex = currentIndex + direction;
        
        if (nextIndex < 0 || nextIndex >= STAGES.length) return;
        const nextStage = STAGES[nextIndex];

        // Optimistic UI update
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, stage: nextStage } : t));

        try {
            await updateTask(task.id, { stage: nextStage });
        } catch (err) {
            // Revert on error
            setTasks(prev => prev.map(t => t.id === task.id ? { ...t, stage: task.stage } : t));
            alert(err.message || 'Error updating task status');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        // Optimistic UI update
        const backupTasks = [...tasks];
        setTasks(prev => prev.filter(t => t.id !== id));

        try {
            await deleteTask(id);
        } catch (err) {
            setTasks(backupTasks);
            alert(err.message || 'Error deleting task');
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
                <p className="text-sm font-medium">Loading workspace tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-950/40 border border-red-900/60 p-6 rounded-2xl text-center max-w-lg mx-auto">
                <p className="text-red-300 font-semibold mb-2">Failed to load tasks</p>
                <p className="text-slate-400 text-sm mb-4">{error}</p>
                <button 
                    onClick={fetchTasks}
                    className="bg-red-900 hover:bg-red-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                >
                    Retry Connection
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header / Metrics Summary */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <ClipboardList className="w-6 h-6 text-indigo-400" />
                        Workspace Tasks
                    </h2>
                    <p className="text-slate-400 text-sm mt-0.5">Manage and track your private items</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 active:scale-[0.98] transition-all duration-200"
                >
                    <Plus className="w-5 h-5" />
                    New Task
                </button>
            </div>

            {/* Kanban Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STAGES.map(stage => {
                    const stageTasks = tasks.filter(t => t.stage === stage);
                    const colorClass = 
                        stage === 'To Do' ? 'indigo' : 
                        stage === 'In Progress' ? 'amber' : 'emerald';

                    return (
                        <div 
                            key={stage} 
                            className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex flex-col min-h-[500px]"
                        >
                            {/* Column Title Header */}
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-3 h-3 rounded-full bg-${colorClass}-500 shadow-md shadow-${colorClass}-500/20`}></div>
                                    <h3 className="font-bold text-white text-base">{stage}</h3>
                                </div>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-${colorClass}-500/10 text-${colorClass}-400 border border-${colorClass}-500/20`}>
                                    {stageTasks.length}
                                </span>
                            </div>

                            {/* Task Cards Container */}
                            <div className="flex-grow space-y-4 overflow-y-auto max-h-[600px] pr-1.5 -mr-1.5">
                                {stageTasks.length === 0 ? (
                                    <div className="border border-dashed border-slate-800/60 rounded-xl py-12 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-2">
                                        No tasks in {stage}
                                    </div>
                                ) : (
                                    stageTasks.map(task => (
                                        <div 
                                            key={task.id} 
                                            className="bg-slate-950/60 hover:bg-slate-900/60 border border-slate-800/60 hover:border-slate-700/80 rounded-xl p-4.5 shadow-md hover:shadow-lg transition-all duration-200 group relative flex flex-col justify-between"
                                        >
                                            <div className="space-y-2">
                                                <h4 className="font-semibold text-white text-sm break-words line-clamp-2">
                                                    {task.title}
                                                </h4>
                                                {task.description && (
                                                    <p className="text-slate-400 text-xs leading-relaxed break-words line-clamp-3">
                                                        {task.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Card Footer Actions */}
                                            <div className="mt-4 pt-3.5 border-t border-slate-900/80 flex items-center justify-between">
                                                {/* Date indicator */}
                                                <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {formatDate(task.createdAt)}
                                                </span>

                                                {/* Navigation & Modification controls */}
                                                <div className="flex items-center gap-1">
                                                    {/* Move backward */}
                                                    <button
                                                        onClick={() => handleMoveStage(task, -1)}
                                                        disabled={task.stage === 'To Do'}
                                                        className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                                        title="Move backward"
                                                    >
                                                        <ChevronLeft className="w-4 h-4" />
                                                    </button>

                                                    {/* Edit */}
                                                    <button
                                                        onClick={() => handleOpenModal(task)}
                                                        className="p-1.5 text-slate-500 hover:text-indigo-400 rounded-lg hover:bg-slate-800 transition-colors"
                                                        title="Edit task"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>

                                                    {/* Delete */}
                                                    <button
                                                        onClick={() => handleDelete(task.id)}
                                                        className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                                                        title="Delete task"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>

                                                    {/* Move forward */}
                                                    <button
                                                        onClick={() => handleMoveStage(task, 1)}
                                                        disabled={task.stage === 'Done'}
                                                        className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                                        title="Move forward"
                                                    >
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal for Creation & Modification */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-6 relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 p-1 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-bold text-white mb-6">
                            {editingTask ? 'Edit Task Details' : 'Create New Task'}
                        </h3>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="task-title">
                                    Task Title
                                </label>
                                <input
                                    id="task-title"
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))}
                                    placeholder="Enter task title"
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="task-desc">
                                    Description (Optional)
                                </label>
                                <textarea
                                    id="task-desc"
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))}
                                    placeholder="Describe the task parameters..."
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 outline-none transition-all resize-none"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="task-stage">
                                    Task Stage / Status
                                </label>
                                <select
                                    id="task-stage"
                                    value={formData.stage}
                                    onChange={(e) => setFormData(p => ({ ...p, stage: e.target.value }))}
                                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl py-3 px-4 text-white text-sm outline-none transition-all cursor-pointer [&>option]:bg-slate-900"
                                >
                                    {STAGES.map(stageOption => (
                                        <option key={stageOption} value={stageOption}>
                                            {stageOption}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-3 justify-end mt-8">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-5 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold text-sm transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={formLoading}
                                    className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2"
                                >
                                    {formLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Save Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
