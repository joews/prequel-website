import "whatwg-fetch";
import debounce from "lodash.debounce"

import sql from "prequel";

// Make prequel available for eval
window.sql = sql;


//
// UI
//
function $(selector) {
  return document.querySelector(selector);
}

const dataInput = $('.js-data');
const queryInput = $('.js-query');
const output = $('.js-result');

function formatJson(object) {
  return JSON.stringify(object, null, 2);
}

function getSqlQuery() {
  return queryInput.value;
}

function showResult(result) {
  output.innerHTML = formatJson(result);
}

function onQueryChange() {
  runQuery();
}

queryInput.addEventListener("input", debounce(onQueryChange, 500))

//
// Data
//

// Make the argument available for eval
function setGlobalData(data) {
  window.data = data;
  return data;
}

function runQuery() {
  const queryText = getSqlQuery();
  const result = eval(queryText);
  showResult(result);
}

//
// Fetch data and run the first query
//
const dataUrl = "https://api.github.com/search/repositories?sort=stars&q=javascript&per_page=20";

fetch(dataUrl)
  .then(response => response.json())
  .then(result => {
    const data = setGlobalData(result.items);
    dataInput.innerHTML = formatJson(data);
  })
  .then(() => {
    runQuery();
  });
