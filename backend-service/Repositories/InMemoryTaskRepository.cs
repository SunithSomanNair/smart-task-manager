using backend_service.Models;

public class InMemoryTaskRepository : ITaskRepository
{
    private readonly List<TaskItem> _tasks = new();

    public Task<List<TaskItem>> GetTasksAsync()
    {
        return Task.FromResult(_tasks);
    }

    public Task<TaskItem> AddTaskAsync(TaskItem task)
    {
        task.Id = Guid.NewGuid().ToString(); // generate unique ID
        _tasks.Add(task);
        return Task.FromResult(task);
    }

    public Task<TaskItem?> UpdateTaskAsync(TaskItem task)
    {
        var existing = _tasks.FirstOrDefault(t => t.Id == task.Id);
        if (existing != null)
        {
            existing.Title = task.Title;
            existing.IsCompleted = task.IsCompleted;
            return Task.FromResult<TaskItem?>(existing);
        }
        return Task.FromResult<TaskItem?>(null); // not found
    }

    public Task<bool> DeleteTaskAsync(string id)
    {
        var toDelete = _tasks.FirstOrDefault(t => t.Id == id);
        if (toDelete != null)
        {
            _tasks.Remove(toDelete);
            return Task.FromResult(true);
        }
        return Task.FromResult(false);
    }
}
