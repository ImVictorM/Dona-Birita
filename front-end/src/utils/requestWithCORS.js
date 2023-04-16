async function requestWithCORS(endpoint, method, body) {
  const response = await fetch(endpoint, {
    method,
    mode: 'cors',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseHasBody = response.headers.get('content-type');

  if (responseHasBody) {
    const formattedResponse = await response.json();
    return formattedResponse;
  }

  return {};
}

export default requestWithCORS;
