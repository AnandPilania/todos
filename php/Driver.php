<?php

abstract class Driver
{
    abstract public function getTaskList();
    abstract public function addTask($taskText);
    abstract public function toggleTask($index);
    abstract public function deleteTask($index);
}
