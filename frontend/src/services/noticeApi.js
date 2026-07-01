import axios from "axios";

const API_URL = "http://localhost:5000";

export const getNotices = async (category) => {
  const url = category
    ? `${API_URL}/notices?category=${encodeURIComponent(category)}`
    : `${API_URL}/notices`;

  const response = await axios.get(url);
  return response.data;
};

export const getLatestNotices = async () => {
  const response = await axios.get(
    `${API_URL}/latest`
  );

  return response.data;
};

export const getNoticeById = async (id) => {
  const response = await axios.get(
    `${API_URL}/notice/${id}`
  );

  return response.data;
};