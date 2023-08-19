<?php

require_once __DIR__ . '/Driver.php';

$selectedDriver = isset($_GET['driver']) ? $_GET['driver'] : 'in-memory';

if ($selectedDriver === 'mysql') {
    require_once __DIR__ . '/MySQLDriver.php';

    $driver = new MySQLDriver();
} else {
    require_once __DIR__ . '/InMemoryDriver.php';

    $driver = new InMemoryDriver();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];

    if ($action === 'addTask' && isset($_POST['taskText'])) {
        $taskText = $_POST['taskText'];
        $driver->addTask($taskText);
    } elseif ($action === 'toggleTask' && isset($_POST['index'])) {
        $index = $_POST['index'];
        $driver->toggleTask($index);
    } elseif ($action === 'deleteTask' && isset($_POST['index'])) {
        $index = $_POST['index'];
        $driver->deleteTask($index);
    }
}

header('Content-Type: application/json');
echo json_encode($driver->getTaskList());
