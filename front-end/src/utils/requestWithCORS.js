async function requestWithCORS(options, body, auth) {
  const response = await fetch(options.endpoint, {
    method: options.method,
    mode: 'cors',
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });

  const responseHasBody = response.headers.get('content-type');

  if (responseHasBody) {
    const formattedResponse = await response.json();
    if (formattedResponse.message) {
      throw new Error(formattedResponse.message);
    }
    return formattedResponse;
  }

  return {};
}

export default requestWithCORS;
