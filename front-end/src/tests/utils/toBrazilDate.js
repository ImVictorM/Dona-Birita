function toBrazilDate(datestr) {
  const onlyDateIndex = 10;
  const brDate = datestr
    .toLocaleString()
    .substring(0, onlyDateIndex)
    .split('-').reverse()
    .join('/');

  return brDate;
}

export default toBrazilDate;
