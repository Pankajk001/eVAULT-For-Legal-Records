"use client";

import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Home() {
  const [file, setFile] = useState("");
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [tokenUri, setTokenUri] = useState("");
  const user = useSelector(state => state)

  const inputFile = useRef(null);

  const fetchTokenURI = async (tokenId) => {
    try {
      const res = await fetch("/api/legalRecords/uploadDocuments/?tokenId=${tokenId}");
      if (res.ok) {
        const data = await res.json();
        setTokenUri(data.tokenUri);
      } else {
        console.error("Error fetching token URI");
      }
    } catch (e) {
      console.error("Error fetching token URI:", e);
    }
  };

  const uploadFile = async (fileToUpload) => {
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", fileToUpload);
      const res = await fetch("/api/legalRecords/uploadDocuments", {
        method: "POST",
        body: data,
      });

      const resData = await res.json();

      if (res.ok) {
        // Assuming the server returns a token ID after uploading
        const { tokenId } = resData;
        toast.success("Document uploaded to Blockchain") // Retrieve tokenId from server response

      } else {
        console.error("Error during upload");
      }

      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
     
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    uploadFile(e.target.files[0]);
  };


  return (
   
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
               Document Information
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
                        onChange={handleChange}
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#793938] file:py-3 file:px-5 file:hover:bg-black file:hover:bg-opacity-10 focus:border-black active:border-black disabled:cursor-default disabled:bg-[#C5F2DD] dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30  text-black dark:focus:border-black"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-4.5 my-5">
            <button
              onClick={() => uploadFile(file)}
              className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90"
            // disabled={isSubmitting} 
            >
Upload
            </button>
          </div>
                </div>




            </div>

          </div>

         
          </div >
      </div>
  
       
      
  
  );
}