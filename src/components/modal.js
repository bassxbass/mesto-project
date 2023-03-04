// редактирование профиля
import {
  profileName,
  profileJob,
  nameInput,
  jobInput,
  editPopup,
  photoInput,
  profileImage,
  photoEditPopup,
  saveProfile,
  savePhoto,
} from "../index.js";
import { closePopup } from "./utils.js";
import { updateProfileInfo, updateProfilePhoto } from "./api.js";
import { data } from "autoprefixer";

export function handleProfileFormSubmit(evt) {
  saveProfile.textContent = "Сохранение...";
  evt.preventDefault();

  updateProfileInfo(data.name, data.job)
    .then(data => {
      profileName.textContent = data.name;
      profileJob.textContent = data.job;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveProfile.textContent = "Сохранить";
    });
}

export function handleProfilePhotoFormSubmit(evt) {
  savePhoto.textContent = "Сохранение...";
  evt.preventDefault();

  updateProfilePhoto(data)
    .then(data => {
      profileImage.src = data.avatar;
      closePopup(photoEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      savePhoto.textContent = "Сохранить";
    });
}
