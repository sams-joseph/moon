export const getPriceColor = (value) => {
  if (value > 0) {
    return "text-green-500";
  } else if (value === 0) {
    return "text-black dark:text-white";
  } else {
    return "text-red-600";
  }
};
