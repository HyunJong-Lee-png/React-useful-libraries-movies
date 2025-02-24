const API_KEY = "f9b0067fa47ccc733736de1f79a4f59e";
const BASE_PATH = "https://api.themoviedb.org/3";

export async function fetchMovies(){
  await new Promise((res)=> setTimeout(res,3000));
  return (await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)).json();
}