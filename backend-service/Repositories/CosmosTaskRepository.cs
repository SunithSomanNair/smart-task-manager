using Microsoft.Azure.Cosmos;
using backend_service.Models;

public class CosmosTaskRepository : ITaskRepository
{
    private readonly Container _container;

    public CosmosTaskRepository(Container container)
    {
        _container = container; // reference to Cosmos DB container
    }

    // Get all tasks
    public async Task<List<TaskItem>> GetTasksAsync()
    {
        var query = _container.GetItemQueryIterator<TaskItem>("SELECT * FROM c");
        var tasks = new List<TaskItem>();

        while (query.HasMoreResults)
        {
            var response = await query.ReadNextAsync();
            tasks.AddRange(response);
        }

        return tasks;
    }

    // Add new task
    public async Task<TaskItem> AddTaskAsync(TaskItem task)
    {
        task.Id = Guid.NewGuid().ToString();
        await _container.CreateItemAsync(task, new PartitionKey(task.Id));
        return task;
    }

    // Update task
    public async Task<TaskItem?> UpdateTaskAsync(TaskItem task)
    {
        try
        {
            var response = await _container.ReplaceItemAsync(task, task.Id, new PartitionKey(task.Id));
            return response.Resource;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return null;
        }
    }

    // Delete task
    public async Task<bool> DeleteTaskAsync(string id)
    {
        try
        {
            await _container.DeleteItemAsync<TaskItem>(id, new PartitionKey(id));
            return true;
        }
        catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            return false;
        }
    }
}
