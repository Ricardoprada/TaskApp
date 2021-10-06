const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", () => {

  before(async () => {
    this.tasksContract = await TasksContract.deployed();
  });


  it("Migrate deployed successfully", async () => {
    const address = this.tasksContract.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("Get Taks List", async () => {
    const tasksCounter = await this.tasksContract.taskCounter();
    const task = await this.tasksContract.tasks(tasksCounter);

    assert.equal(task.id.toNumber(), tasksCounter);
  });

  it("Task created successfully", async () => {
    const result = await this.tasksContract.createTask("Some task", "Some description");
    const taskEvent = result.logs[0].args;
    const tasksCounter = await this.tasksContract.taskCounter();

    assert.equal(tasksCounter, 2);
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.title, "Some task");
    assert.equal(taskEvent.description, "Some description");
    assert.equal(taskEvent.done, false);
  });

  it("Task Toggle Done", async () => {
    const result = await this.tasksContract.toggleDone(1);
    const tasksEvent = result.logs[0].args;
    const tasks = await this.tasksContract.tasks(1);

    assert.equal(tasks.done, true);
    assert.equal(tasksEvent.done, true);
    assert.equal(tasksEvent.id, 1);
  });

});