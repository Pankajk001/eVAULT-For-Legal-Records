import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loader from './Loader';
import { set } from 'mongoose';

export default function TableView() {
    const [ documents,setDocuments] = useState([]) 
    const[loading,setLoading] = useState(false);
    const[open,setOpen] = useState(false);
    const[ LogDocumentId,setLogDocumentId] = useState(null);
    const user = useSelector((state) => state);
    useEffect(() => {
        const fetchDocuments = async () => {
            setLoading(true);
          try {
            const userdata = {
           userId:user.userId,
            }
            const response = await axios.post("/api/legalRecords/viewDocuments", userdata);
            if (response.status !== 200) {
                // Handle error response
                const errorData = response.data;
                console.error(errorData.error);
                setLoading(false);
                return;
            }
            const data = response.data;
         console.log(data)
         setLoading(false);
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

      const handleOpenLogs = (documentId) => {
        setLogDocumentId(documentId);
        setOpen(true);
      }
  return (
    <div>
        { loading && <Loader/>}
        <div class="overflow-x-auto">
    <table class="w-full bg-white divide-y divide-gray-200 rounded-lg shadow-md">
        <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document </th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Permissions</th>
            
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                <th scope="col" class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logs</th>
                </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            {
                documents.map((index,item)=>(
                    <>
                     <tr key={item+1}>
                <td class="px-3 py-4 whitespace-nowrap">{index.documentId}</td>
                <td class="px-3 py-4 whitespace-nowrap">{index.userId}</td>
   
                
                <td class="px-3 py-4 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">View</span></td>
                <td class="px-3 py-4 whitespace-nowrap"><button onClick={()=>handleOpen(index.tokenId)} class="px-4 py-1.5 inline-flex text-md leading-5 font-semibold rounded-full bg-primary text-white">View Doument</button></td>
                <td class="px-3 py-4 whitespace-nowrap"><span onClick={()=>handleOpenLogs(index.documentId)} class="px-2 cursor-pointer inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Logs</span></td>
            </tr>
                    </>
                )
                    
                )
            }
           
         
            
        </tbody>
    </table>

    {
        open && <Logs documentId={LogDocumentId} setOpen={setOpen}/>
    
    }
</div>
    </div>
  )
}

const Logs = ({documentId,setOpen}) => {
    const [ logs,setLogs] = useState([])
     const[loading,setLoading] = useState(false);
    useEffect(() => {
        const fetchLogs = async () => {
            setLoading(true);
          try {
            const userdata = {
           documentId:documentId,
            }
            const response = await axios.post("/api/legalRecords/viewLogs", userdata);
            if (response.status !== 200) {
                // Handle error response
                const errorData = response.data;
                console.error(errorData.error);
                setLoading(false);
                return;
            }
            const data = response.data;
         console.log(data)
         setLoading(false);
            setLogs(data);
          } catch (error) {
            // Handle network or other errors
            setLoading(false);
            console.error('Error fetching documents:', error);
          }
        };
      
        fetchLogs();
      }, [documentId]);
    
    return(
        <div onClick={()=>setOpen(false)} className=' fixed top-0 left-0 z-[1000000000] bg-white   bg-opacity-60 h-screen w-full flex justify-center items-center'> 
         <table class="w-1/2 rounded-xl bg-white divide-y divide-gray-400  shadow-md">
        <thead class="bg-gray-100">
            <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Document </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"> User</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Operation</th>
            
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Timestamp</th>
                </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            {
                logs.map((index,item)=>(
                    <>
                     <tr key={item+1}>
                <td class="px-6 py-4 whitespace-nowrap">{index.documentId}</td>
                <td class="px-6 py-4 whitespace-nowrap">{index.userId}</td>
   
                
                <td class="px-6 py-4 whitespace-nowrap"><span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">{index.operationPerformed}</span></td>
                <td class="px-6 py-4 whitespace-nowrap">{index.timestamp}</td>
               
            </tr>
                    </>
                )
                    
                )
            }
           
         
            
        </tbody>
    </table>
        {loading && <Loader/>}
        </div>
    )
}
