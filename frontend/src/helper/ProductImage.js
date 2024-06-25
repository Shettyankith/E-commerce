const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;

const ProductImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "E_commerce");

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  return response.json();
};

export default ProductImage;
