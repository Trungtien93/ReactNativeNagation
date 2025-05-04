export const fetchContacts = async () => {
  const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
  const data = await response.json();

  // Chuẩn hóa dữ liệu
  const contacts = data.results.map((user) => ({
    name: `${user.name.first} ${user.name.last}`,
    phone: user.phone,
    avatar: user.picture.large,
    email: user.email,          // Thêm email vào
    cell: user.cell,            // Thêm số điện thoại cá nhân vào
    favorite: Math.random() > 0.5,
  }));

  return contacts;
};

  export const fetchUserContact = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const { results } = await response.json();
    return results[0];
  };
  

// Lấy ngẫu nhiên một người
export const fetchRandomContact = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const data = await response.json();
  const user = data.results[0];

  return {
    name: {
      title: user.name.title,
      first: user.name.first,
      last: user.name.last,
    },
    phone: user.phone,
    avatar: user.picture.large,
    email: user.email,
    cell: user.cell,
    favorite: Math.random() > 0.5,
  };
};