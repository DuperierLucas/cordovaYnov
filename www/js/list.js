const divList = `
<div class="col-12 col-md-4">
    <a href="pages/listItemMangas.html?id= __listId__" target="_blank">
    <div class="card">
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
  const tempDivList = document.getElementById("list");
  json.forEach((list, i) => {
    const newDivList = divList
      .replace("__top__", i + 1)
      .replace(" __listId__", list.id)
      .replace("__title__", list.name)
      .replace("__description__", list.description);
    tempDivList.appendChild(htmlToElement(newDivList));
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

const fetchList = () => {
  fetchLocal("api/list.json")
    .then((response) => {
      response.json().then(fetchApiDone);
    })
    .catch((err) => {
      alert(err);
    });
};

if ("cordova" in window) {
  document.addEventListener("deviceready", fetchList);
} else {
  document.addEventListener("DOMContentLoaded", fetchList);
}
