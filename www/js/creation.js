let json_data = JSON.parse(localStorage.getItem('listItems'));
let manga_list = [];

//Temp stock the stored manga list
const setMangaList = (mangaList) => {
	manga_list = mangaList;
};

const fetchLocal = (url) => {
	return new Promise(function (resolve, reject) {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(new Response(xhr.response, { status: xhr.status }));
		};
		xhr.onerror = function () {
			reject(new TypeError('Local request failed'));
		};
		xhr.open('GET', url);
		xhr.responseType = 'arraybuffer';
		xhr.send(null);
	});
};

const fetchMangaList = () => {
	fetchLocal('../api/mangas.json')
		.then((response) => {
			response.json().then(setMangaList);
		})
		.catch((err) => {
			alert(err);
		});
};

function addNewList(list) {
	list.id = json_data.length + 1;
	json_data.push(list);

	console.log(json_data);
	localStorage.setItem('listItems', JSON.stringify(json_data));
}

function formatMangas(list) {
	let formatedList = [];

	list.forEach((item) => {
		if (item.checked)
			formatedList.push(
				manga_list.find((manga_list_item) => manga_list_item.id == item.value)
			);
	});

	return formatedList;
}

function validateForm() {
	let name = document.getElementById('listName').value;
	let description = document.getElementById('listDescription').value;
	let unFormatedMangas = document.getElementsByName('listItem');
	let formatedManga = formatMangas(unFormatedMangas);

	console.log(formatedManga);

	if (name === '' || description === '') {
		alert('All fields may not to be blanks !!');
	} else {
		addNewList({ name: name, description: description, mangas: formatedManga });
	}
}

const onBatteryStatus = (status) => {
	console.log(status);
	// alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
};

if ('cordova' in window) {
	document.addEventListener('deviceready', fetchMangaList);
} else {
	document.addEventListener('DOMContentLoaded', fetchMangaList);
}
