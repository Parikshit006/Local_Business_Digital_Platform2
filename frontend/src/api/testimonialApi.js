const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/testimonials`;

export const getTestimonials = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return res.json();
};

export const getTestimonialById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch testimonial");
  return res.json();
};

export const getPublicTestimonials = async () => {
  const res = await fetch(`${BASE_URL}/public`);
  if (!res.ok) throw new Error("Failed to fetch public testimonials");
  return res.json();
};

export const getHomepageTestimonials = async () => {
  const res = await fetch(`${BASE_URL}/homepage`);
  if (!res.ok) throw new Error("Failed to fetch homepage testimonials");
  return res.json();
};

export const createTestimonial = async (data, token) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create testimonial");
  return res.json();
};

export const updateTestimonial = async (id, data, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update testimonial");
  return res.json();
};

export const deleteTestimonial = async (id, token) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete testimonial");
  return res.json();
};
