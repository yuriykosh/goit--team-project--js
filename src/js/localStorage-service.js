function save(key, value) {
    try {
      const usersDataSaved = JSON.stringify(value);
      localStorage.setItem(key, usersDataSaved);
    } catch (error) {
      console.error("Saving data error: ", error.message);
    }
};

function load(key) { 
  try {
    const usersDataSaved = localStorage.getItem(key);
    return usersDataSaved === null ? '' : JSON.parse(usersDataSaved);
  } catch (error) {
    console.error("Get data error: ", error.message);
  }
};

function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Remove data error: ", error.message);
  }
};

export default {
    save,
    load,
    remove
  };