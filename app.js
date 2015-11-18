import sql from "prequel";
import "whatwg-fetch";

window.sql = sql;

const dataUrl = "https://api.github.com/search/repositories?sort=stars&q=javascript&per_page=20";

const dataInput = $('.js-data');
const queryInput = $('.js-query');
const output = $('.js-result');

function $(selector) {
  return document.querySelector(selector);
}

function formatJson(object) {
  return JSON.stringify(object, null, 2);
}

function getSqlQuery() {
  return queryInput.textContent;
}

function showResult(result) {
  output.innerHTML = formatJson(result);
}

function runQuery() {
  const queryText = getSqlQuery();
  const result = eval("sql`" + queryText + "`");
  showResult(result);
}

fetch(dataUrl)
  .then(response => response.json())
  .then(result => {
    const data = result.items;
    window.data = data;
    dataInput.innerHTML = formatJson(data);
  })
  .then(() => {
    runQuery();
  });
