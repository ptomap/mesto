export default class UserInfo {
  constructor({ profileName, jobName, avatar }) {
    this._profileName = document.querySelector(profileName);
    this._jobName = document.querySelector(jobName);
    this._avatar = document.querySelector(avatar);
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      profileName: this._profileName.textContent,
      jobName: this._jobName.textContent,
      avatar: this._avatar.src
    }
    return userInfo;
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._jobName.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
