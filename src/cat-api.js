import axios from 'axios';
import Notiflix from 'notiflix';

const catSelect = [];

const fetchBreed = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_MtAj6fiscgUtYAGNGJasQGRpuGdGQZCATkGMmRj6Tz5OZxzFxR0HI2tg0uNd1o0o';
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      response.data.map(({ id, name }) =>
        catSelect.push({ text: name, value: id })
      );
      return catSelect;
    })
    .catch(error =>
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
      )
    );
};

const fetchCatByBreed = breedId => {
  axios.defaults.headers.common['x-api-key'] =
    'live_MtAj6fiscgUtYAGNGJasQGRpuGdGQZCATkGMmRj6Tz5OZxzFxR0HI2tg0uNd1o0o';
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.data.length === 0) {
        Notiflix.Notify.failure(
          'Oops! Something went wrong! Try reloading the page!'
        );
      }
      return response.data[0];
    })
    .catch(error =>
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
      )
    );
};

export { fetchBreed, fetchCatByBreed };
