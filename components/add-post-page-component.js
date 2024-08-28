import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {

    let imageUrl;
    const changeImage = (url) => {
        imageUrl = url
    }

  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
        <div class="page-container">
            <div class="header-container"></div>
            <div class="form">
                <h3 class="form-title">Добавить пост</h3>
                <div class="form-inputs">
                    <div id="imageEl" class="upload-image-container">
                        <div class="upload=image">
                            <div class="file-upload-image-container">
                                <img class="file-upload-image" />
                                <button class="file-upload-remove-button button">
                                    Заменить фото
                                </button>
                            </div>
                        </div>
                    </div>
                    <label>
                        Опишите фотографию:
                        <textarea
                            class="input textarea"
                            id="desc-photo"
                            rows="4"
                        ></textarea>
                    </label>
                    <button class="button" id="add-button">Добавить</button>
                </div>
            </div>
        </div>`;

    appEl.innerHTML = appHtml;

    const opisImg = document.getElementById('desc-photo');

    const uploadImageContainer = appEl.querySelector('.upload-image-container');
    renderUploadImageComponent({ element: uploadImageContainer, onImageUrlChange: changeImage });

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: opisImg.value,
        imageUrl: imageUrl,
      });
    });
  };

  render();
}
