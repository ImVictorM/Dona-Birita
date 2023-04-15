async function requestWithCORS(endpoint, method, body) {
  const response = await fetch(endpoint, {
    method,
    mode: 'cors',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const formattedResponse = await response.json();
  return formattedResponse;
}

export default requestWithCORS;
