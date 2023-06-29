const form = document.querySelector('#add-task');
const button = document.querySelector('.btn');
const msg = document.querySelector('.msg');
const tasks = document.querySelector('.tasks');
const taskField = document.querySelector('#task');
const dayField = document.querySelector('#day');
const checkBox = document.querySelector('#check');
checkBox.checked = false;
console.log(checkBox);

button.addEventListener('click', (e) => {
	if (button.innerText === 'Close') {
		button.addEventListener('click', (e) => close());
	} else if (button.innerText === 'Add') {
		button.addEventListener('click', (e) => open());
	}
});

function close () {
	form.classList.add('d-none');
	button.innerText = 'Add';
	button.style.backgroundColor = '#008000';

}

function open () {
	form.classList.remove('d-none');
	button.innerText = 'Close';
	button.style.backgroundColor = '#ff0000';
}

getTasks();

async function getTasks () {
	const res = await fetch('http://localhost/api/api/task.php');
	const result = await res.json();
	console.log(result);

	if(result.message.length){
		msg.innerText = `${result.message}`;
	}else{
		msg.innerText = ''
	}
	result.task_data.forEach(task => {
		const div = document.createElement('div');
		div.classList.add('task', task.reminder === 1 ? 'reminder' : null);
		div.dataset.id = `${task.id}`;

		div.innerHTML = `
		<div>
			<h4>${task.task}</h4>
			<p>${task.day_and_time}</p>
		</div>
		<button class="delete">
		<i class="far fa-times"></i>
		</button>
		`

		console.log(task)
		tasks.appendChild(div);
	});
	deleteTask();

// 	document.querySelectorAll('.delete').forEach(btn => {btn.addEventListener('click', deleteTask();});
}
let data;


form.addEventListener('submit', (e) => {
	e.preventDefault();

	// if () {

	// 	addTask();
	// }
	if (taskField.value === '' && dayField.value === '') {
		alert('Fill field Please');
	} else {
		if (taskField.value !== '' && dayField.value !== '') {
			data = new FormData(form);
			addTask();
		}
	}
});


function addTask () {
	fetch('http://localhost/api/api/create.php', {
		method: 'POST',
		// headers: {
		// 	// 'Accept': 'application/json, text/plain, */*',
		// 	// 'Content-Type': 'application/json'
		// },
		body: data
	}).then(setTimeout(() => {
		location.href = './index.html';
	}, 1000));
}


function deleteTask () {
	const task = tasks.querySelectorAll('.task');
	console.log(task)

	task.forEach(element => {
		console.log(element)
		const task_id = element.dataset.id;
		const _delete = element.querySelectorAll('button.delete');
		_delete.forEach(button => {
			button.addEventListener('click', (e) => {
				const info = new FormData();
				info.append('task_id', task_id)
				fetch('http://localhost:/api/api/delete.php', {
					method: 'POST',
// 					headers: {
// 						'Content-Type': 'multipart/form-data;'
// 					},
					body: info
				}).then(res => res.json()).then(setTimeout(() => {
					location.href = './index.html';
				}, 1000));

			});
		})
		// });
	});
}

