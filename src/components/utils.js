export function showLoading(
  loaderElement = document.querySelector('#loading'),
) {
  loaderElement.setAttribute('active', 'true');
}

export function hideLoading(
  loaderElement = document.querySelector('#loading'),
) {
  loaderElement.removeAttribute('active');
}

export function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
