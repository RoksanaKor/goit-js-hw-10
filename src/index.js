import Notiflix from 'notiflix';
import { fetchBreed, fetchCatByBreed } from './cat-api.js';
// axios.defaults.headers.common['x-api-key'] =
//   'live_MtAj6fiscgUtYAGNGJasQGRpuGdGQZCATkGMmRj6Tz5OZxzFxR0HI2tg0uNd1o0o';

const content = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
select.insertAdjacentHTML(
  'afterbegin',
  `<option value="" disabled selected hidden>Choose cat breed</option>`
);
const loader = document.querySelector('.loader');
const errorDisplay = document.querySelector('.error');

loader.style.display = 'block';
errorDisplay.style.display = 'none';
try {
  select.style.display = 'none';
  fetchBreed().then(response => {
    response.map(cat =>
      select.insertAdjacentHTML(
        'beforeend',
        `<option value="${cat.value}">${cat.text}</option>`
      )
    );
    select.style.display = 'block';
    loader.style.display = 'none';
  });
} catch {
  Notiflix.Notify.failure(
    `Oops! Something went wrong! Try reloading the page!`
  );
}

try {
  select.addEventListener('change', event => {
    loader.style.display = 'block';
    content.style.visibility = 'hidden';
    content.innerHTML = '';
    fetchCatByBreed(event.target.value).then(data => {
      loader.style.display = 'none';

      const { temperament, life_span, origin, description, name } =
        data.breeds[0];
      content.insertAdjacentHTML(
        'beforeend',
        `<p>Name: <span style="font-weight:bold;">${name}</span></p>
         <p>Character: <span style="font-weight:bold;">${temperament}</span></p>
      <p>Comes from <span style="font-weight:bold;">${origin}</span>.</p>
      <p><span style="font-weight:bold;">${description}</span></p>
      <p>Lives <span style="font-weight:bold;">${life_span}</span> years.</p>
      <img src="${data.url}" alt="kitty picture" width="192" height="120"/>`
      );
      content.style.visibility = 'visible';
    });
  });
} catch {
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
