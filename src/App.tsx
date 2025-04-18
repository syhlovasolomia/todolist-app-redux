import "./App.css";
import { TaskType, Todolist } from "./Todolist";

function App() {
  const tasks1 = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
  ];

  const tasks2: Array<TaskType> = [
    { id: 1, title: "Sample", isDone: true },
    { id: 2, title: "Sample2", isDone: false },
    { id: 3, title: "Sample3", isDone: true },
  ];

  const tasks3 = [
    { id: 1, title: "Desc", isDone: false },
    { id: 2, title: "Desc", isDone: false },
    { id: 3, title: "Desc", isDone: true },
  ];

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasks1} />
      <Todolist title="Movies" tasks={tasks2} />
      <Todolist title="Books" tasks={tasks3} />

      {/* <input type="checkbox"></input>
      <input type="date"></input>
      <input placeholder="sample description"></input> */}
    </div>
  );
}

export default App;
