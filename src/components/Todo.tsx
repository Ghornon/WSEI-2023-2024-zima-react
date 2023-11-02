import React from 'react';
import { TodoType } from '../types/Todo.types';

interface Props {
	todo: TodoType;
}

const Todo: React.FC<Props> = ({ todo }) => {
	return (
		<div className="todo">
			<h2 className="title">{todo.title}</h2>
			<input type="checkbox" checked={todo.completed} />
		</div>
	);
};

export default Todo;
