const logOutButton = document.querySelector(".log-out");
if (logOutButton)
  logOutButton.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "get",
        url: "http://127.0.0.1:8000/api/v1/users/logout",
      });
      // location.reload(true);
      location.assign("./");
    } catch (err) {
      console.log(err);
    }
  });
