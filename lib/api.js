export async function fetcher(url, options = {}) {
  let response;
  let data;
  if (!options) {
    response = await fetch(url)
      .then((response) => response.json())
      .then((dataResp) =>data= dataResp)
      .catch(() => {
        data = null;
      });
  } else {
    response = await fetch(url, options)
      .then((response) => response.json())
      .then((dataResp) =>data= dataResp)
      .catch(() => {
        data = null;
      });
  }
  return data;
}
