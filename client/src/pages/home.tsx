import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Trash2, CheckCircle2, Circle, ClipboardList } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import type { Todo, FilterType } from "@shared/schema";
import { nanoid } from "nanoid";

export default function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useState<FilterType>("all");
  const [newTaskText, setNewTaskText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTodo: Todo = {
      id: nanoid(),
      text: newTaskText.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([newTodo, ...todos]);
    setNewTaskText("");
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (!editText.trim() || !editingId) {
      setEditingId(null);
      return;
    }

    setTodos(todos.map((todo) =>
      todo.id === editingId ? { ...todo, text: editText.trim() } : todo
    ));
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between h-16 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary">
              <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-foreground" data-testid="text-app-title">
                TaskFlow
              </h1>
              {todos.length > 0 && (
                <p className="text-xs text-muted-foreground" data-testid="text-task-counter">
                  {activeTodosCount} {activeTodosCount === 1 ? "task" : "tasks"} active
                </p>
              )}
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            className="transition-transform duration-300"
            data-testid="button-theme-toggle"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.div>
          </Button>
        </header>

        {/* Task Input */}
        <motion.form
          onSubmit={addTodo}
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              className="flex-1 h-11 text-base rounded-lg transition-all duration-200 focus:scale-[1.01]"
              data-testid="input-new-task"
            />
            <Button
              type="submit"
              className="h-11 px-6"
              disabled={!newTaskText.trim()}
              data-testid="button-add-task"
            >
              Add
            </Button>
          </div>
        </motion.form>

        {/* Filter Bar */}
        {todos.length > 0 && (
          <motion.div
            className="flex gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {(["all", "active", "completed"] as FilterType[]).map((filterType) => (
              <Button
                key={filterType}
                size="sm"
                variant={filter === filterType ? "default" : "ghost"}
                onClick={() => setFilter(filterType)}
                className="capitalize"
                data-testid={`button-filter-${filterType}`}
              >
                {filterType}
              </Button>
            ))}
          </motion.div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTodos.length === 0 && todos.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center py-16 text-center"
                data-testid="empty-state-no-tasks"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-muted">
                  <ClipboardList className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  No tasks yet
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add a task above to get started!
                </p>
              </motion.div>
            )}

            {filteredTodos.length === 0 && todos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center py-16 text-center"
                data-testid={`empty-state-${filter}`}
              >
                <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-muted">
                  {filter === "completed" ? (
                    <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
                  ) : (
                    <Circle className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  No {filter} tasks
                </h3>
                <p className="text-sm text-muted-foreground">
                  {filter === "completed"
                    ? "Complete some tasks to see them here"
                    : "All tasks are completed!"}
                </p>
              </motion.div>
            )}

            {filteredTodos.map((todo) => (
              <motion.div
                key={todo.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="group bg-card border border-card-border rounded-lg p-4 hover-elevate transition-all duration-200"
                data-testid={`task-item-${todo.id}`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="mt-0.5 flex-shrink-0 transition-transform duration-200 hover:scale-110"
                    data-testid={`button-toggle-${todo.id}`}
                    aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                  >
                    <motion.div
                      initial={false}
                      animate={{ scale: todo.completed ? 1.1 : 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </motion.div>
                  </button>

                  <div className="flex-1 min-w-0">
                    {editingId === todo.id ? (
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") cancelEdit();
                          }}
                          className="flex-1 h-9"
                          autoFocus
                          data-testid={`input-edit-${todo.id}`}
                        />
                        <Button
                          size="sm"
                          onClick={saveEdit}
                          data-testid={`button-save-${todo.id}`}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={cancelEdit}
                          data-testid={`button-cancel-${todo.id}`}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEditing(todo)}
                        className="text-left w-full"
                        data-testid={`button-edit-${todo.id}`}
                      >
                        <motion.p
                          className={`text-base transition-all duration-200 ${
                            todo.completed
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }`}
                          initial={false}
                          animate={{
                            opacity: todo.completed ? 0.6 : 1,
                          }}
                          transition={{ duration: 0.2 }}
                          data-testid={`text-task-${todo.id}`}
                        >
                          {todo.text}
                        </motion.p>
                      </button>
                    )}
                  </div>

                  {editingId !== todo.id && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
                      data-testid={`button-delete-${todo.id}`}
                      aria-label="Delete task"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Clear Completed Button */}
        {completedTodosCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-6 text-center"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCompleted}
              className="text-muted-foreground hover:text-destructive"
              data-testid="button-clear-completed"
            >
              Clear {completedTodosCount} completed {completedTodosCount === 1 ? "task" : "tasks"}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
