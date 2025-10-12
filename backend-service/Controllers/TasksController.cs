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

        [HttpPost]
        public ActionResult<TaskItem> AddTask(TaskItem newTask)
        {
            newTask.Id = tasks.Count + 1;
            tasks.Add(newTask);
            return Ok(newTask);
        }
    }
}