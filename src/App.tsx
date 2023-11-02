import { useState, useEffect } from 'react';
import './App.css';
import Loader from './components/Loader';
import Todo from './components/Todo';
import { TodoType } from './types/Todo.types';

function App() {
	const [todos, setTodos] = useState([]);
	const [filter, setFilter] = useState('All');
	const [error, setError] = useState({});

	const handleFilerOnChange = (event) => {
		console.log(event.target.value);
		setFilter(event.target.value);
	};

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((res) => setTodos(res))
			.catch((err) => setError(err));
	}, []);

	return (
		<div className="App">
			<section className="vh-100">
				<div className="container py-5 h-100">
					<div className="row d-flex justify-content-center align-items-center h-100">
						<div className="col">
							<div className="card todo-card-border" id="list1">
								<div className="card-body py-4 px-4 px-md-5">
									<p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
										<i className="fas fa-check-square me-1"></i>
										My Todo-s
									</p>

									<div className="pb-2">
										<div className="card">
											<div className="card-body">
												<div className="d-flex flex-row align-items-center">
													<input
														type="text"
														className="form-control form-control-lg"
														id="exampleFormControlInput1"
														placeholder="Add new..."
													/>
													<a
														href="#!"
														data-mdb-toggle="tooltip"
														title="Set due date"
													>
														<i className="fas fa-calendar-alt fa-lg me-3"></i>
													</a>
													<div>
														<button
															type="button"
															className="btn btn-primary"
														>
															Add
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>

									<hr className="my-4" />

									<div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
										<p className="small mb-0 me-2 text-muted">Filter</p>
										<select
											className="select"
											value={filter}
											onChange={handleFilerOnChange}
										>
											<option value="All">All</option>
											<option value="Completed">Completed</option>
											<option value="Active">Active</option>
										</select>
										<a
											href="#!"
											data-mdb-toggle="tooltip"
											title="Ascending"
											className="todo-link"
										>
											<i className="fas fa-sort-amount-down-alt ms-2"></i>
										</a>
									</div>

									<table className="table mb-0">
										<thead>
											<tr>
												<th scope="col">Team Member</th>
												<th scope="col">Task</th>
												<th scope="col">Is done?</th>
												<th scope="col">Actions</th>
											</tr>
										</thead>
										<tbody>
											{todos.length > 0 ? (
												todos
													.filter((todo: TodoType) => {
														if (filter == 'All') return todo;
														else if (
															filter == 'Completed' &&
															todo.completed
														)
															return todo;
														else if (
															filter == 'Active' &&
															!todo.completed
														)
															return todo;
													})
													.map((todo: TodoType) => <Todo todo={todo} />)
											) : (
												<Loader />
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default App;
