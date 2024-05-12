import axios from 'axios';
import { set } from 'mongoose';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from './Loader';
export default function TableModify() {
    const [ documents,setDocuments] = useState([]) 
    const[loading,setLoading] = useState(false);
    const user = useSelector((state) => state);
    useEffect(() => {
        const fetchDocuments = async () => {
          setLoading(true);
          try {
            const userdata = {
           userId:user.userId,
            }
            const response = await axios.post("/api/legalRecords/modifyDocuments", userdata);
            if (response.status !== 200) {
                // Handle error response
                const errorData = response.data;
                console.error(errorData.error);
                setLoading(false);
                return;
            }
            const data = response.data;
            setLoading(false);
         console.log(data)
            setDocuments(data);
          } catch (error) {
            // Handle network or other errors
            setLoading(false);
            console.error('Error fetching documents:', error);
          }
        };
      
        if (user?.userId) {
          fetchDocuments();
        }
      }, [user?.userId]);
      
      async function handleOpen(tokenId) {
        setLoading(true);
        try {
          const response = await fetch(`/api/legalRecords/uploadDocuments/?tokenId=${tokenId}`);
          if (!response.ok) {
            setLoading(false);
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setLoading(false);
           window.location.href = "https://lavender-certain-yak-875.mypinata.cloud/ipfs/"+data.tokenUri;
        } catch (error) {
          setLoading(false);
          console.error(`Fetch Error: ${error}`);
        }
      }

      async function deleteDocument(documentId) {
        try {
          setLoading(true);
          const response = await axios.post('/api/legalRecords/deleteDocuments', { documentId,userId:user.userId});
          if (response.status !== 200) {
            setLoading(false);
            throw new Error('Server response was not ok');
          }
          setLoading(false);
           alert("Document Deleted Successfully")
           window.location.reload();
        } catch (error) {
          setLoading(false);
          console.error(`Delete Error: ${error}`);
        }
      }
  return (
    <div>
      {loading && <Loader/>}
        <div class="overflow-x-auto">
    <table class="min-w-full bg-white divide-y divide-gray-200 rounded-lg shadow-md">
        <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
     
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            {
                documents.map((index,item)=>(
                    <>
                     <tr key={item+1}>
                <td class="px-6 py-4 whitespace-nowrap">{index.documentId}</td>
                <td class="px-6 py-4 whitespace-nowrap">{index.userId}</td>
   
                
    
                <td class="px-6 py-4 whitespace-nowrap"><button onClick={()=>handleOpen(index.tokenId)} class="px-4 py-1.5 inline-flex text-md leading-5 font-semibold rounded-full bg-primary text-white">View Doument</button></td>
                <td class="px-6 py-4 whitespace-nowrap"><button onClick={()=> deleteDocument(index._id)} class="px-4 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Delete</button></td>
            </tr>
                    </>
                )
                    
                )
            }
           
         
            
        </tbody>
    </table>
</div>
    </div>
  )
}
