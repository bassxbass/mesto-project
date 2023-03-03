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

export function handleProfileFormSubmit(evt) {
  saveProfile.textContent = "Сохранение...";
  evt.preventDefault();

  updateProfileInfo(nameInput.value, jobInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
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

  updateProfilePhoto(photoInput.value)
    .then(() => {
      profileImage.src = photoInput.value;
      profileImage.alt = profileName;
      closePopup(photoEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      savePhoto.textContent = "Сохранить";
    });
}
