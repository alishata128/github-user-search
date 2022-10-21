class GithubUserSearch {
  constructor() {
    this.userDetails = [];
    this.$input = document.getElementById("search-bar-input").value;
    this.$searchMain = document.querySelector(".search-main");
    this.$user = document.querySelector(".user");
    this.$close = document.getElementById("close");
    this.$userName = document.querySelector(".user-name");
    this.$profileImg = document.getElementById("profileImg");
    this.$name = document.querySelector(".name");
    this.$type = document.querySelector(".type");
    this.$followers = document.querySelector(".followers span");
    this.$following = document.querySelector(".following span");
    this.$bio = document.querySelector(".bio");
    this.$publicReposNum = document.querySelector(".public-repos-num span");
    this.$publicGistsNum = document.querySelector(".public-gists-num span");
    this.$view = document.querySelector(".view");
    this.$header = document.querySelector(".header");
    this.$three = document.querySelector(".three");
    this.$user.style.display = "none";
    this.searchUser(this.$input);
    this.renderUser();
    this.profileRectCheck();
  }

  async searchUser(user = "alishata128") {
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        for (this.item in data) {
          // console.log(this.item, ":", data[this.item]);
          this.$userName.textContent = "@" + data.login;
          this.$profileImg.src = data.avatar_url;
          this.$name.textContent = data.name;
          this.$type.textContent = `from ${data.location}`;
          this.$bio.textContent = `"${data.bio}"`;
          this.$publicReposNum.textContent = data.public_repos;
          this.$publicGistsNum.textContent = data.public_gists;
          this.$followers.textContent = data.followers;
          this.$following.textContent = data.following;
          let githubLink = `https://www.github.com/${data.login}`;
          this.$view.setAttribute("href", githubLink);
          this.$view.setAttribute("target", "_blank");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  renderUser() {
    this.$searchMain.style.display = "none";
    this.$user.style.display = "flex";
    document.body.classList.add("user-shown");
    this.$header.style.display = "none";
    this.$input = "";
  }

  profileRectCheck() {
    // console.log(this.$profileImg.naturalWidth);
    if (this.$profileImg.style.width === this.$profileImg.style.height) {
      // console.log("ali ali ali");
    } else {
      // console.log("not not not");
    }
  }
}

document.querySelector(".three").addEventListener("click", function () {
  this.classList.toggle("gap-0");
  document.getElementById("line1").classList.toggle("collapsed1");
  document.getElementById("line3").classList.toggle("collapsed3");
  document.querySelector("#line2").classList.toggle("d-none");
  document.getElementById("ul").classList.toggle("nav-active");
});

document.getElementById("close").addEventListener("click", function () {
  document.querySelector(".search-main").style.display = "block";
  document.getElementById("search-bar-input").value = "";
  document.querySelector(".user").style.display = "none";
  document.body.classList.remove("user-shown");
  document.querySelector(".header").style.display = "block";
});

document.addEventListener("keydown", (e) => {
  if (document.getElementById("user").style.display !== "none") {
    if (e.key === "Escape") {
      document.querySelector(".search-main").style.display = "block";
      document.getElementById("search-bar-input").value = "";
      document.querySelector(".user").style.display = "none";
      document.body.classList.remove("user-shown");
      document.querySelector(".header").style.display = "block";
    } else {
      // console.log("no user entered 2");
    }
  }
});

document.getElementById("search-bar-input").addEventListener("keydown", (e) => {
  // e.preventDefault();
  if (document.getElementById("search-bar-input").value == "") {
    //TODO: modal to tell user to type
    // console.log("no user entered");
  } else {
    if (e.key === "Enter") {
      // console.log("searching");
      new GithubUserSearch();
    }
  }
});

document.querySelector(".octocat").addEventListener("click", function (e) {
  e.preventDefault();
  if (document.getElementById("search-bar-input").value == "") {
    //TODO: modal to tell user to type
    // console.log("no user entered");
  } else {
    new GithubUserSearch();
  }
});
