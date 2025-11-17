using Microsoft.AspNetCore.Mvc;
using backend_service.Models;

namespace backend_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskRepository _repository;

        // Repository is injected (Cosmos or InMemory depending on Program.cs)
        public TasksController(ITaskRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _repository.GetTasksAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(string id)
        {
            var tasks = await _repository.GetTasksAsync();
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> AddTask([FromBody] TaskItem newTask)
        {
            var task = await _repository.AddTaskAsync(newTask);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(string id, [FromBody] TaskItem updatedTask)
        {
            updatedTask.Id = id;
            var task = await _repository.UpdateTaskAsync(updatedTask);
            if (task == null)
            {
                return NotFound(new { message = "Task not found." });
            }
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(string id)
        {
            var deleted = await _repository.DeleteTaskAsync(id);
            if (!deleted)
            {
                return NotFound(new { message = "Task not found." });
            }
            return Ok(new { message = "Task deleted successfully." });
        }
    }
}
