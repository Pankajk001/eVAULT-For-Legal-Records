'use client'
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Select from 'react-select';
import Loader from "@/components/utlis/Loader";
import Table from "@/components/utlis/Table";
import { set } from "mongoose";

export default function Home() {
  const [file, setFile] = useState(null); // Change to null initial state
  const [uploading, setUploading] = useState(false);
  const user = useSelector(state => state);
  const [users, setUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const inputFile = useRef(null);
  const [viewPermissions, setViewPermissions] = useState([]);
  const [modifyPermissions, setModifyPermissions] = useState([]);

  const fetchUsers = async () => {
    try {
      setUploading(true);
      const response = await fetch('/api/users/getallusers');
      if (response.ok) {
        setUploading(false);
        const data = await response.json();
        setUsers(data.data);
      } else {
        setUploading(false);
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      setUploading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (user.userId) {
      fetchUsers();
    }
  }, [user.userId]);

  useEffect(() => {
    // Transform users into options array
    const newOptions = users.map(user => ({
      value: user.username,
      label: user.username
    }));
    setOptions(newOptions);
  }, [users]);

  const handleOptionChange = (selectedOptions, permissionType) => {
    const usernames = selectedOptions.map(option => option.label);
    if (permissionType === 'view') {
      setViewPermissions(usernames);
    } else if (permissionType === 'modify') {
      setModifyPermissions(usernames);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Set the file in state
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("userId", user.userId);
      data.append("viewPermissions", viewPermissions);
      data.append("modifypermissions", modifyPermissions);

      const res = await fetch("/api/legalRecords/uploadDocuments", {
        method: "POST",
        body: data,
      });

      const resData = await res.json();
      if (res.ok) {
        const { status, message } = resData;
        setUploading(false);
        alert(message);
        setFile(null); // Reset the file state after successful upload
      } else {
        console.error("Error during upload");
      }

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      {uploading ? (
        <Loader />
      ) : (
        <>
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Legal Records information
                </h3>
              </div>
              <div className="p-7">
                <div className="rounded-sm border border-stroke px-4 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                      <label className="mb-3 block text-black font-medium ">
                        Upload Document
                      </label>
                      <input
                        type="file"
                        ref={inputFile}
                        onChange={(e)=>handleChange(e)}
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#793938] file:py-3 file:px-5 file:hover:bg-black file:hover:bg-opacity-10 focus:border-black active:border-black disabled:cursor-default disabled:bg-[#C5F2DD] dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30  text-black dark:focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="flex gap-5.5 p-6.5">
                    <div className="w-full sm:w-1/2">
                      <div className="mb-3 block text-lg font-medium text-black">View Permissions</div>
                      <Select options={options} isMulti onChange={selectedOptions => handleOptionChange(selectedOptions, 'view')} />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="mb-3 block text-lg font-medium text-black">Modify Permissions</div>
                      <Select options={options} isMulti onChange={selectedOptions => handleOptionChange(selectedOptions, 'modify')} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4.5 my-5">
                    <button
                      onClick={uploadFile}
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
                    >
                      Upload
                    </button>
                  </div>
                </div>
             
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-8 my-5">
          <div className="col-span-5 ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  History
                </h3>
              </div>
              <div className="p-7">
               <Table/>
             
              </div>
            </div>
          </div>
        </div>
        
        </>
      )}
    </>
  );
}
