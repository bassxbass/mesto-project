// редактирование профиля
import {
  profileName,
  profileJob,
  nameInput,
  jobInput,
  editPopup,
} from "../index.js";
import { closePopup } from "./utils.js";

export function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(editPopup);
}
