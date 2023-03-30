export default class UserInfo {
  // Конструктор, принимающий поля для обновления и экземпляр api
  constructor(userName, userAbout, userAvatar, api) {
    this.userName = userName;
    this.userAbout = userAbout;
    this.userAvatar = userAvatar;
    this.api = api;
  }

  // Получить данные пользователя с сервера
  getUserInfo = () => {
    return this.api.getProfileInfo().then((data) => {
      this.name = data.name;
      this.about = data.about;
      this.avatar = data.avatar;
      this._userId = data._id;
      return { ...data };
    });
  };

  // Обновить данные пользователя на сервере и на странице
  setUserInfo = ({ name, about }) => {
    return this.api.updateProfileInfo(name, about).then((data) => {
      this.userName.textContent = data.name;
      this.userAbout.textContent = data.about;
      this.userAvatar.src = data.avatar;
      this._userId = data._id;
      return { ...data };
    });
  };

  // Обновить аватар пользователя на сервере и на странице
  setUserAvatar = (avatar) => {
    return this.api.updateProfilePhoto(avatar).then((data) => {
      this.userAvatar.src = data.avatar;
      return { ...data };
    });
  };

  // Получить id пользователя
  getUserId = () => {
    return this._userId;
  };
}
