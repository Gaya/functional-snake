function createCanvasElement(width = 600, height = 600) {
  const element = document.createElement('canvas');

  element.setAttribute('width', width);
  element.setAttribute('height', height);

  document.body.appendChild(element);

  return element.getContext('2d');
}

function getContext() {
  return this.context;
}

function initialize(width = 600, height = 600) {
  const instance = {
    context: createCanvasElement(width, height),
    getContext,
  };

  return instance;
}

export default initialize;
