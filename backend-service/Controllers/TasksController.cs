using Microsoft.AspNetCore.Mvc;
using backend_service.Models;

namespace backend_service.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private static List<TaskItem> tasks = new();

        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks()
        {
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public ActionResult<TaskItem> GetTaskById(int id)
        {
            var task = tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost]
        public ActionResult<TaskItem> AddTask(TaskItem newTask)
        {
            newTask.Id = tasks.Count + 1;
            tasks.Add(newTask);
            return Ok(newTask);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, TaskItem updatedTask)
        {
            var existingTask = tasks.FirstOrDefault(t => t.Id == id);
            if (existingTask == null)
            {
                return NotFound();
            }

            existingTask.Title = updatedTask.Title;
            existingTask.IsCompleted = updatedTask.IsCompleted;

            return Ok(existingTask);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var taskToDelete = tasks.FirstOrDefault(t => t.Id == id);
            if (taskToDelete == null)
            {
                return NotFound();
            }

            tasks.Remove(taskToDelete);
            return Ok(new { message = "Task deleted successfully." });
        }
    }
}