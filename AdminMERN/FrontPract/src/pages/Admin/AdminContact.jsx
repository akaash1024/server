import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../AuthContextStore";
import axios from "axios";

export const AdminContact = () => {
  const [contactData, setContactData] = useState([]);
  const { authorizationToken, API } = useAuth();

  

  const getContactsData = async () => {
    try {
      const response = await axios.get(`${API}/api/admin/contacts`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = response.data;
      console.log("Contact data:", data);
      
      if (Array.isArray(data)) {
        setContactData(data);
      } else {
        console.log("Invalid contact data format", data);
      }
    } catch (error) {
      console.log("Error fetching contact data:", error);
    }
  };

  const deleteContactById = async (id) => {
    try {
      const response = await axios.delete(
        `${API}/api/admin/contacts/delete/${id}`,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.status === 200) {
        getContactsData();
        toast.success("Deleted successfully");
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      console.log("Error deleting contact:", error);
    }
  };

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contact Data</h1>

        <div className="container admin-users">
          {contactData.map((curContactData, index) => {
            const { username, email, message, _id } = curContactData;

            return (
              <div key={index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button className="btn" onClick={() => deleteContactById(_id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
