<?php

class MySQLDriver extends Driver
{
    private $db;

    public function __construct()
    {
        $host = 'localhost';
        $username = 'your_username';
        $password = 'your_password';
        $dbname = 'your_database';

        // Create a new mysqli connection
        $this->db = new mysqli($host, $username, $password, $dbname);

        if ($this->db->connect_error) {
            die('Connection failed: ' . $this->db->connect_error);
        }
    }

    public function getTaskList()
    {
        $tasks = [];

        $query = "SELECT * FROM tasks";
        $result = $this->db->query($query);

        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $tasks[] = [
                    'text' => $row['task_text'],
                    'completed' => $row['completed']
                ];
            }
            $result->free();
        }

        return $tasks;
    }

    public function addTask($taskText)
    {
        $taskText = $this->db->real_escape_string($taskText);
        $query = "INSERT INTO tasks (task_text, completed) VALUES ('$taskText', 0)";
        $this->db->query($query);
    }

    public function toggleTask($index)
    {
        $index = intval($index);
        $query = "UPDATE tasks SET completed = NOT completed WHERE id = $index";
        $this->db->query($query);
    }

    public function deleteTask($index)
    {
        $index = intval($index);
        $query = "DELETE FROM tasks WHERE id = $index";
        $this->db->query($query);
    }
}
