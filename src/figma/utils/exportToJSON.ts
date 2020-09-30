import request from 'request';

const api_endpoint = 'https://api.figma.com/v1';
const personal_access_token = 'FIGMA_ACCESS_TOKEN_HERE'; // https://www.figma.com/developers/docs#auth-dev-token

function downloadSvgFromAWS(url) {
  return new Promise((resolve, reject) => {
    request.get(
      url,
      {
        headers: {
          'Content-Type': 'images/svg+xml',
        },
      },
      function(error, _response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      }
    );
  });
}

function getComponentsFromChildren(children) {
  const components = [];
  const check = (c) => {
    if (c.type == 'COMPONENT') {
      components.push(c);
    } else if (c.children) {
      c.children.forEach(check);
    }
  };
  children.forEach(check);
  return components;
}

function getImageUrls(file_key, componentIds) {
  return new Promise((resolve, reject) => {
    request.get(
      `${api_endpoint}/images/${file_key}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-figma-token': personal_access_token,
        },
        qs: {
          ids: componentIds,
          format: 'svg',
        },
        json: true,
      },
      function(error, _response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(body.images);
        }
      }
    );
  });
}

function getJSONFromFigmaFile(file_key) {
  return new Promise((resolve, reject) => {
    request.get(
      `${api_endpoint}/files/${file_key}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-figma-token': personal_access_token,
        },
      },
      function(error, _response, body) {
        if (error) {
          reject(error);
        } else {
          const components = getComponentsFromChildren(
            JSON.parse(body).document.children
          );
          console.log(components);
          getImageUrls(file_key, components.map((c) => c.id).join(',')).then(
            (images) => {
              const imagesArray = Object.keys(images).map((key) => images[key]);
              downloadSvgFromAWS(imagesArray[0]).then((image) =>
                console.log(image)
              );
              resolve(imagesArray);
            }
          );
        }
      }
    );
  });
}

export default getJSONFromFigmaFile;
