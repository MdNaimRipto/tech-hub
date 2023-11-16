import { envConfig } from "@/config/envConfig";

export function uploadImage({ img, setImg }: { img: any; setImg: any }) {
  const formData = new FormData();
  formData.append("image", img);

  const url = `https://api.imgbb.com/1/upload?key=${envConfig.image_api_key}`;

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then(res => res.json())
    .then(imgData => {
      setImg(imgData?.data?.url);
    });
}
