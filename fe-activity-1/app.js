const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
const blogIdtoUpdate = 1;
const updatedData = { title: 'Updated Blog', body: 'This blog has been updated.' };
const blogIdToDelete = 1;
const blogId = 1;

const blog = {
  title: 'New Blog',
  body: 'This is the content ot the new blog',
  userId: 1,
};

const addBlog = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add a new blog");
    }

    const json = await response.json();
    console.log('New Blog added:', json);
  } catch (error) {
    console.log('Error adding blog:', error.message);
  }
};

const fetchBlogs = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log('All blogs:', data);
  } catch (error) {
    console.log('Error fetching blogs:', error.message);
  }
};

const fetchBlog = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();

    console.log("Single Blog:", data);
  } catch (error) {
    console.error("Error fetching a blog:", error.message);
  }
};

const updateBlog = async (blogId, updatedData) => {
  try {
    const response = await fetch(`${apiUrl}/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update the blog");
    }

    const updatedBlog = await response.json();
    console.log('Blog updated:', updatedBlog);
  } catch (error) {
    console.log('Error updating blog:', error.message);
  }
};

const deleteBlog = async (blogId) => {
  try {
    const response = await fetch(`${apiUrl}/${blogId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error("Failed to delete the blog");
    }

    console.log('Blog deleted successfully');
  } catch (error) {
    console.log('Error deleting blog:', error.message);
  }
};


// usage
//addBlog();
//fetchBlogs();
//fetchBlog(blogId);
//updateBlog(blogIdtoUpdate, updatedData);
//deleteBlog(blogIdToDelete);