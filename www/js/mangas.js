const divManga = `
<div class="col-12 col-md-4">
    <a href="__link__" target="_blank">
    <div class="card">
    <img src="__src__" class="card-img-top" />
    <div class="card-body">
        <h5 class="card-title">__top__. __title__</h5>
        <p class="card-text">
            __description__
        </p>
    </div>
    </div>
    </a>
</div>
`;

let json_data = JSON.parse(localStorage.getItem('listItems'));
let manga_list = [];

const htmlToElement = (html) => {
	const template = document.createElement('template');
	html = html.trim(); // Never return a text node of whitespace as the result
	template.innerHTML = html;
	return template.content.firstChild;
};

const buildMangaTop = () => {
	//To recover the selected list
	let parameters = location.search.substring(1).split('&');
	let splitUrlToId = parameters[0].split('=');

	//Select the good object in the list
	let currentList = json_data.filter((x) => x.id == splitUrlToId[1])[0];

	const divList = document.getElementById('list');

	console.log(currentList);
	currentList.mangas.forEach((manga, i) => {
		const newDivManga = divManga
			.replace('__link__', manga.link)
			.replace('__src__', manga.img)
			.replace('__top__', i + 1)
			.replace('__title__', manga.name)
			.replace('__description__', manga.description);
		divList.appendChild(htmlToElement(newDivManga));
	});
};

if ('cordova' in window) {
	document.addEventListener('deviceready', buildMangaTop);
} else {
	document.addEventListener('DOMContentLoaded', buildMangaTop);
}
