function createCanvasElement(width = 600, height = 600) {
  const element = document.createElement('canvas');

  element.setAttribute('width', width);
  element.setAttribute('height', height);

  document.body.appendChild(element);

  return element.getContext('2d');
}

function initialize(width = 600, height = 600) {
  const context = createCanvasElement(width, height);

  return context;
}

export default initialize;
