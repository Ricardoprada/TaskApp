// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {

  uint256 public taskCounter = 0;

  constructor() {
    createTask("My first Task", "Task description");
  }

  event TaskCreated(
    uint id,
    string title,
    string description,
    bool done,
    uint256 creatAt
  );

  event TaskToggleDone(uint id, bool done);

  struct Task {
    uint256 id;
    string title;
    string description;
    bool done;
    uint256 creatAt;
  }

  mapping (uint256 => Task) public tasks;

  function createTask(string memory _title, string memory _description) public {
    taskCounter++;
    tasks[taskCounter] = Task(
      taskCounter,
      _title,
      _description,
      false,
      block.timestamp
      );
    emit TaskCreated(
      taskCounter,
      _title,
      _description,
      false,
      block.timestamp);
  }

  function toggleDone(uint256 _id) public {
    Task memory _tasks = tasks[_id];
    _tasks.done = !_tasks.done;
    tasks[_id] = _tasks;
    emit TaskToggleDone(_id, _tasks.done);
  }

}