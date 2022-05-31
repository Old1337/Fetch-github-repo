"use strict";

const textInput = document.querySelector(".get-repos input");
const btn = document.querySelector(".button");
const showData = document.querySelector(".show-data");

btn.onclick = () => {
  getRepos();
};

function getRepos() {
  if (textInput.value.trim() === "") {
    showData.innerHTML = "<div> Please write your github username </div>";
  } else {
    showData.innerHTML = "loading <span>.</span> <span>.</span> <span>.</span>";
    get();
  }
}

async function get() {
  const url = `https://api.github.com/users/${textInput.value}/repos`;
  try {
    const response = await fetch(url);

    const datas = await response.json();

    showData.innerHTML = "";
    addDataToPage(datas);
  } catch (error) {
    console.error(`Failed to fetch repo from ${textInput.value} ${error}`);
    showData.innerHTML = `${textInput.value} does not exist`;
  }
}

function addDataToPage(datas) {
  datas.forEach((data) => {
    const mainDiv = document.createElement("div");

    const repoName = document.createTextNode(data.name);

    mainDiv.appendChild(repoName);

    const repoURL = document.createElement("a");

    const repoURLTEXT = document.createTextNode("visit");

    repoURL.href = `https://github.com/${textInput.value}/${data.name}`;

    repoURL.setAttribute("target", "_blank");

    repoURL.appendChild(repoURLTEXT);

    const starSpan = document.createElement("span");

    const starText = document.createTextNode(`${data.stargazers_count} stars`);

    starSpan.appendChild(starText);

    const infoContainer = document.createElement("div");

    infoContainer.appendChild(starSpan);
    infoContainer.appendChild(repoURL);
    infoContainer.className = "info-container";

    mainDiv.appendChild(infoContainer);
    mainDiv.className = "repo-container";
    showData.appendChild(mainDiv);
  });
}
