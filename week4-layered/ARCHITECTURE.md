# Architecture Diagram

## High-Level Architecture


```
+---------------------------+
| CLIENT (Browser)          |
| (HTML/CSS/JavaScript)    |
+---------------------------+
           |
           | HTTP Requests
           v
+---------------------------+
| PRESENTATION LAYER        |
| (Controllers)             |
|                           |
| Task Controller --------> |
|    | - Input Validation    |
|    | - Response Formatting |
|    | - HTTP Error Handling |
+---------------------------+
           |
           v
+---------------------------+
| BUSINESS LOGIC LAYER      |
| (Services)                |
|                           |
| Task Service -------->    |
|    | - Business Rules      |
|    | - Validation Logic    |
|    | - Orchestration       |
+---------------------------+
           |
           v
+---------------------------+
| DATA ACCESS LAYER         |
| (Repositories)            |
|                           |
| Task Repository --------> |
|    | - CRUD Operations     |
|    | - Query Execution     |
|    | - Data Mapping        |
+---------------------------+
           |
           v
+---------------------------+
| DATABASE (SQLite)         |
+---------------------------+
```


## Data Flow Example: Create Task

1. Client sends POST /api/tasks
   ↓
2. TaskController.createTask()
   - Validates HTTP request
   - Extracts data
   ↓
3. TaskService.createTask(data)
   - Validates business rules
   - Applies business logic
   ↓
4. TaskRepository.create(task)
   - Executes SQL INSERT
   - Returns created task
   ↓
5. Response flows back up
   Repository → Service → Controller → Client
