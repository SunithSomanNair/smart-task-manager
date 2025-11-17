using backend_service.Models;

public interface ITaskRepository
{
    Task<List<TaskItem>> GetTasksAsync();        
    Task<TaskItem> AddTaskAsync(TaskItem task);  
    Task<TaskItem?> UpdateTaskAsync(TaskItem task);
    Task<bool> DeleteTaskAsync(string id);            
}
