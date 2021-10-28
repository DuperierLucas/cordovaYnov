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

const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

const fetchApiDone = (json) => {
  const divList = document.getElementById("list");
  json.forEach((manga, i) => {
    const newDivManga = divManga
      .replace("__link__", manga.link)
      .replace("__src__", manga.img)
      .replace("__top__", i + 1)
      .replace("__title__", manga.name)
      .replace("__description__", manga.description);
    divList.appendChild(htmlToElement(newDivManga));
  });
};

const fetchLocal = (url) => {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(new Response(xhr.response, { status: xhr.status }));
    };
    xhr.onerror = function () {
      reject(new TypeError("Local request failed"));
    };
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.send(null);
  });
};

const fetchApiMangas = () => {
  fetchLocal("api/mangas.json").then((response) =>
    response.json().then(fetchApiDone)
  );
};

const onBatteryStatus = (status) => {
  console.log(status);
  // alert("Level: " + status.level + " isPlugged: " + status.isPlugged);
};

if ("cordova" in window) {
  document.addEventListener("deviceready", fetchApiMangas);
} else {
  document.addEventListener("DOMContentLoaded", fetchApiMangas);
}
