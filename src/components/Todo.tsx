import React from 'react';
import { TodoType } from '../types/Todo.types';

interface Props {
	todo: TodoType;
	handleTaskStatusChange: (id: number) => void;
	handleTaskDelete: (id: number) => void;
}

const Todo: React.FC<Props> = ({ todo, handleTaskStatusChange, handleTaskDelete }) => {
	return (
		<tr className="fw-normal">
			<th>
				<span className="ms-2">{todo.userId}</span>
			</th>
			<td className="align-middle">{todo.title}</td>
			<td className="align-middle">
				<input
					type="checkbox"
					className="todo-checkbox"
					checked={todo.completed}
					onChange={() => handleTaskStatusChange(todo.id)}
				/>
			</td>
			<td className="align-middle">
				<a
					href="#!"
					data-mdb-toggle="tooltip"
					title="Remove"
					onClick={() => handleTaskDelete(todo.id)}
				>
					<i className="bi bi-trash todo-action"></i>
				</a>
			</td>
		</tr>
	);
};

export default Todo;
