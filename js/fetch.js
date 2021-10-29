const url = "../asset/videoData.json";
let response;

export const fetchJson = async () => {
  try {
    const data = await fetch(url,{
  credentials: "include"
});
    response = await data.json();
    return response;
  } catch (error) {
    console.log(error);
  }
};
