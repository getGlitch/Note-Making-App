import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; 

function SavedNotes() {
  const [fetchedNotes, setFetchedNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [currentNote, setCurrentNote] = useState({}); 
  const hasFetchedNotes = useRef(false);

  useEffect(() => {
    if(hasFetchedNotes.current) return
    hasFetchedNotes.current=true
    let message = fetchAllNotes();
    message.then((msg)=>{
      toast.success(msg);
    }).catch((err)=>{
      toast.info(err);
    })
   
  }, []);

  const fetchAllNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/notes/getAllNotes`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const { message, notes, success, error } = data;

      if (success) {
        setFetchedNotes(notes);
        return message;

      } else if (error) {
        return error.details[0].message;
      } else {
        return message;
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching notes.');
    }
  };

  const handleEditClick = (note) => {
    setCurrentNote({...note}); 
    setIsModalOpen(true); 

  };
  const handleDelete = async(note)=>{
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}notes/delete/${note._id}`, {
        method: 'Delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
        
      });
      const data = await response.json();
        const {message,error,success} = data;
      if (success) {
        toast.success(message);
        
        fetchAllNotes();
        handleCloseModal(); 
      } else {
        toast.error(error.details[0].message);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while deleting the note.');
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateNote = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/notes/update/${currentNote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(currentNote), 
      });
      const data = await response.json();
        const {message,error,success} = data;
      if (success) {
        toast.success(message);
        
        fetchAllNotes();
        handleCloseModal(); 
      } else {
        toast.error(error.details[0].message);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating the note.');
    }
  };

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <h2 className="text-2xl font-semibold text-center col-span-full mb-6">Your Saved Notes</h2>
      {fetchedNotes.length > 0 ? (
        fetchedNotes.map((note, index) => (
          <div
            key={note._id}
            className="relative bg-yellow-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 group border border-gray-300 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-200"
          >
            
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 flex justify-center items-center space-x-4">
              <button
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
                onClick={() => handleEditClick(note)} // Open the modal and pass the note data
              >
                <FaEdit />
              </button>
              <button
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                onClick={() => handleDelete(note)}
              >
                <FaTrashAlt />
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-800 break-words">{note.title}</h3>
            <p className="text-gray-600 mt-2 break-words">{note.description}</p>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-lg text-gray-500">
          No Notes Found, Add a Note to begin with ❤️
        </div>
      )}

      {/* Modal for editing */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Edit Note</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700">Title</label>
              <input
                type="text"
                id="title"
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                value={currentNote.title}
                onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700">Description</label>
              <textarea
                id="description"
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                rows="4"
                value={currentNote.description}
                onChange={(e) => setCurrentNote({ ...currentNote, description: e.target.value })}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateNote}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedNotes;
