import axios from "axios";

const token = "5814eda3-c696-11ee-b38e-f6f098158c7e";

export const getProvince = async () => {
  try {
    const data = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
      {
        headers: { "Content-Type": "application/json", Token: token },
      }
    );
    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDistrict = async (provinceID) => {
  try {
    const data = await axios.get(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceID}`,
      {
        headers: { "Content-Type": "application/json", Token: token },
      }
    );
    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getVillage = async (districtID) => {
  try {
    const data = await axios.post(
      `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id`,
      {
        district_id: districtID,
      },
      {
        headers: { "Content-Type": "application/json", Token: token },
      }
    );
    return data.data.data;
  } catch (error) {
    console.log(error);
  }
};
