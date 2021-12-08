export default class UserInfo {
  constructor({ profileName, jobName }) {
    this._profileName = document.querySelector(profileName);
    this._jobName = document.querySelector(jobName);
  }
  //возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      profileName: this._profileName.textContent,
      jobName: this._jobName.textContent
    }
    return userInfo;
  }
  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ profileName, jobName }) {
    this._profileName.textContent = profileName;
    this._jobName.textContent = jobName;
  }
}
