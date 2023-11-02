import React from 'react';
import { TodoType } from '../types/Todo.types';

interface Props {
	todo: TodoType;
}

const Todo: React.FC<Props> = ({ todo }) => {
	return (
		<tr className="fw-normal">
			<th>
				<span className="ms-2">{todo.userId}</span>
			</th>
			<td className="align-middle">{todo.title}</td>
			<td className="align-middle">
				<input type="checkbox" className="todo-checkbox" checked={todo.completed} />
			</td>
			<td className="align-middle">
				<a href="#!" data-mdb-toggle="tooltip" title="Done">
					<i className="bi bi-pencil todo-action"></i>
				</a>
				<a href="#!" data-mdb-toggle="tooltip" title="Remove">
					<i className="bi bi-trash todo-action"></i>
				</a>
			</td>
		</tr>
	);
};

export default Todo;
