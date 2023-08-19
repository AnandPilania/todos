<?php

class InMemoryDriver extends Driver
{
    private $tasks = [];

    public function __construct()
    {
        session_start();
        if (isset($_SESSION['tasks'])) {
            $this->tasks = $_SESSION['tasks'];
        }
    }

    public function getTaskList()
    {
        return $this->tasks;
    }

    public function addTask($taskText)
    {
        if (!empty($taskText)) {
            array_unshift($this->tasks, ['text' => $taskText, 'completed' => false]);
            $this->saveTasks();
        }
    }

    public function toggleTask($index)
    {
        if (isset($this->tasks[$index])) {
            $this->tasks[$index]['completed'] = !$this->tasks[$index]['completed'];
            $this->saveTasks();
        }
    }

    public function deleteTask($index)
    {
        if (isset($this->tasks[$index])) {
            unset($this->tasks[$index]);
            $this->tasks = array_values($this->tasks);
            $this->saveTasks();
        }
    }

    private function saveTasks()
    {
        $_SESSION['tasks'] = $this->tasks;
    }
}
