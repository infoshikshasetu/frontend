async function loginUser(email, password) {
  try {
    const res = await apiRequest("/student/login", "POST", {
      email,
      password
    });

    if (res.success) {
      localStorage.setItem("token", res.token);
      window.location.href = "/student/dashboard/index.html";
    } else {
      alert(res.message);
    }

  } catch (error) {
    alert("Server error");
  }
}