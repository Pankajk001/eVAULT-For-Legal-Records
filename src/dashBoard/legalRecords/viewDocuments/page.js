'use client'
import DefaultLayout from '@/components/other/DefaultLayout'
import Table from '@/components/utlis/Table'
import React from 'react'

export default function Home() {
  return (
    <div>
        <div className="grid grid-cols-5 gap-8 my-5">
          <div className="col-span-5 ">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Modify Documents
                </h3>
              </div>
              <div className="p-7">
               <Table/>
             
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}