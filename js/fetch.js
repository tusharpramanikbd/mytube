export const fetchJson = async (url) => {
  try {
    const data = await fetch(url, {
      credentials: "include",
    });
    const response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
