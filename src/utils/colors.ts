const commonGrey = '#6c7a89';
const flatRed = '#d91e18';

const greyWithAlpha = (alpha: number): string => {
  if (alpha > 1 || alpha < 0) {
    return commonGrey;
  }

  return `rgba(108,122,137, ${alpha})`;
};

export {greyWithAlpha, flatRed, commonGrey};
