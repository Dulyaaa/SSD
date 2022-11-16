const baseUrl = "https://localhost:8080/user/";

//Hashes everyting together to prevent pssword from being picked up
export async function registerUser(newUserDetails) {
  try {
    const response = await fetch(baseUrl + "register", {
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify(newUserDetails),

      // Adding headers to the request
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw response;
    } else {
      return "ok";
    }
  } catch (error) {
    let responseTxt = await error.text();
    return responseTxt;
  }
}
