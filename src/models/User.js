class User {
    constructor(id, firstName, lastName, username, mobile, email, passwordHash, registeredAt, lastLogin, intro, profile) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.username = username;
      this.mobile = mobile;
      this.email = email;
      this.passwordHash = passwordHash;
      this.registeredAt = registeredAt;
      this.lastLogin = lastLogin;
      this.intro = intro;
      this.profile = profile;
    }
  }
  
  export default User;
  