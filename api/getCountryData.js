export async function getCountryData() {
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "API_KEY");

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const result = await fetch(
      "https://api.countrystatecity.in/v1/countries/IN",
      requestOptions
    );
    console.log(result);
  } catch (error) {}
}

export async function getCityOfCountry() {
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "API_KEY");

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const result = await fetch(
      "https://api.countrystatecity.in/v1/countries/IN/cities",
      requestOptions
    );
    console.log(result);
  } catch (error) {}
}

export async function getCityData() {
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", "API_KEY");

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  try {
    const result = await fetch(
      "https://api.countrystatecity.in/v1/countries/IN/cities",
      requestOptions
    );
    console.log(result);
  } catch (error) {}
}
