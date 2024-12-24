// src/pages/Home.jsx
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [userInfo, setUserInfo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState({
    title:"",
    description:""
  });
  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo(localStorage.getItem("user"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const handleChange = (e)=>{
        const {name, value} = e.target;
        setNote({...note,[name]:value})
        
  }

  const handleSaveNote = async() => {
    if(!note.title || !note.description){
      return toast.error("Title and Description are required....");
    }
    try {
      const token = localStorage.getItem("token");
   const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/notes/add`,{
    method:"POST",
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`

    },
    body:JSON.stringify(note)
   })
   const data = await response.json();
   const {message, success} = data;
   console.log(message,success);
   if(success){
    toast.success(message);
    setIsModalOpen(false);
    setNote({
      title:"",
      description:""
    })
   }else{
    toast.error(message)
   }
    } catch (error) {
      console.log(error);
    }
    
   
  };

  const handleSeeSavedNotes = () => {
    navigate('/saved-notes'); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-semibold text-gray-700">Welcome to Your Dashboard</h1>
          <p className="text-lg text-gray-600 mt-2">
            Hello, {userInfo}!
            <br />
            Welcome back, dear user!
          </p>
        </div>

        {/* Centered Plus Sign for Opening Modal */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-16 h-16 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 focus:outline-none"
          >
            <span className="text-3xl">+</span>
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create a Note</h2>
              {/* Title */}
              <div className="mb-4">
                <label htmlFor="noteTitle" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={note.title}
                  required
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Note Title"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={note.description}
                  onChange={handleChange}
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Note Description"
                  rows="4"
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-between">
                <button
                  onClick={handleSaveNote}
                  className="py-2 px-6 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Save
                </button>
                <button
                  onClick={() => {setIsModalOpen(false); setNote({title:"",description:""})}}
                  className="py-2 px-6 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User info */}
        <div className="space-y-4 mt-6">
          <p className="text-xl text-gray-800">
            Welcome to your personalized home page. Here, you can access all your features.
          </p>
          <div className="bg-blue-50 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-gray-800">What can you do here?</h2>
            <ul className="list-disc pl-5 mt-2 text-gray-700">
              <li>Click on Plus sign to add a note.</li>
              <li>Check your recent activity.</li>
              <li>Manage your account settings.</li>
            </ul>
          </div>
        </div>

        {/* "See My Saved Notes" Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSeeSavedNotes}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-700"
          >
            See My Saved Notes
          </button>
        </div>

        {/* Logout Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
