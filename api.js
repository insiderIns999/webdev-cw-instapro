import { getToken } from "./main.js";
import { posts } from "./main.js";
// Замени на свой, чтобы получить независимый от других набор данных.
// "боевая" версия инстапро лежит в ключе prod
export const personalKey = "prod";
export const baseHost = "https://webdev-hw-api.vercel.app";
export const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;
export const likesHost = `${posts[id]}/like`;

//   Получение постов
export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

//    Регистрация
// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

//   Авторизация
export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}

//    Добавление поста
export function addPost({ description, imageUrl }) {
  return fetch(postsHost, {
    method: "POST",
    body: JSON.stringify({
      description: description,
      imageUrl: imageUrl,
    }),
    headers: {
      Authorization: getToken(),
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

// Добавление лайков
export let countLikes = 0;
export function addLikes({ token, postId }) {
  const likesElements = document.querySelectorAll(".like-button");
  likesElements.forEach((likeElement, postId) => {
    likeElement.addEventListener("click", (event) => {
      event.stopPropagation();
      if (token === null) {
        return alert("Авторизуйтесь, чтобы добавлять лайки");
      } else {
        
        return fetch(likesHost, {
          method: "POST",
          body: JSON.stringify({
            Id: postId,
            isLiked: true,
          }),
          headers: {
            Authorization: getToken(),
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            ++countLikes;
            return data.posts;
          });
        /*
        if (posts[postId].isLiked) {
          ++posts[postId].likes;
          ++countLikes;
        }
        else {
          --posts[postId].likes;
          --countLikes;
        }
        */
      }
    });
  });
}