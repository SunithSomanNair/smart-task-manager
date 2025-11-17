using Newtonsoft.Json;

namespace backend_service.Models
{
    public class TaskItem
    {
        [JsonProperty(PropertyName = "id")]
        public string? Id { get; set; }
        public string Title { get; set; } = "";
        public bool IsCompleted { get; set; }
    }
}