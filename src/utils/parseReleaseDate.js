function ReleasedObj(released) {
  const getYear = () => {
    let year = '';
    for (let i = 0; i < 4; i++) {
      year += released[i];
    }
    return year;
  };

  const getMonth = () => {
    let month = '';
    for (let i = 5; i < 7; i++) {
      month += released[i];
    }
    return month;
  };

  const getDate = () => {
    let date = '';
    for (let i = 8; i < 10; i++) {
      date += released[i];
    }
    return date;
  };

  const result = () => {
    return {
      date: getDate(),
      month: getMonth(),
      year: getYear()
    };
  };

  return {
    result
  };
}

export default ReleasedObj;
