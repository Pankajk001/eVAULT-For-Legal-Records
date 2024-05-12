export const NavbarItems =[
   
    {
        name: 'About',
        href: 'about',
       
    },
    {
        name: 'Features',
        href: 'Features',
       
    },
    {
        name: 'Legal Records',  
        href: '/dashBoard/legalRecords',
        innerItems: [
            {
                name: 'Upload Documents',
                href: '/dashBoard/legalRecords/uploadDocuments',
            },
            {
                name: 'View Documents',
                href: '/dashBoard/legalRecords/viewDocuments',
            },
            {
                name: 'Modify Documents',
                href: '/dashBoard/legalRecords/modifyDocuments',
            },
           
        ]
      
    },
    {
        name: 'Statics',
        href: '/statics',
      
    },
    {
        name: 'Contact',
        href: 'contact',
      
    },
   
    
]
