import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Table() {
    const [ documents,setDocuments] = useState([]) 
    const user = useSelector((state) => state);
    useEffect(() => {
        const fetchDocuments = async () => {
          try {
            const userdata = {
           userId:user.userId,
            }
            const response = await axios.post("/api/getUserdocuments", userdata);
            if (response.status !== 200) {
                // Handle error response
                const errorData = response.data;
                console.error(errorData.error);
                return;
            }
            const data = response.data;
         console.log(data)
            setDocuments(data);
          } catch (error) {
            // Handle network or other errors
            console.error('Error fetching documents:', error);
          }
        };
      
        if (user?.userId) {
          fetchDocuments();
        }
      }, [user?.userId]);
      
      async function handleOpen(tokenId) {
        try {
          const response = await fetch(`/api/legalRecords/uploadDocuments/?tokenId=${tokenId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
           window.location.href = "https://lavender-certain-yak-875.mypinata.cloud/ipfs/"+data.tokenUri;
        } catch (error) {
          console.error(`Fetch Error: ${error}`);
        }
      }
  return (
    <div>
        <div class="overflow-x-auto">
    <table class="min-w-full bg-white divide-y divide-gray-200 rounded-lg shadow-md">
        <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            {
                documents.map((index,item)=>(
                    <>
                     <tr key={item+1}>
                <td class="px-6 py-4 whitespace-nowrap">{index.documentId}</td>
                <td class="px-6 py-4 whitespace-nowrap">{index.userId}</td>
   
                
                <td class="px-6 py-4 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">View+Modify</span></td>
                <td class="px-6 py-4 whitespace-nowrap"><button onClick={()=>handleOpen(index.tokenId)} class="px-4 py-1.5 inline-flex text-md leading-5 font-semibold rounded-full bg-primary text-white">View Doument</button></td>
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
