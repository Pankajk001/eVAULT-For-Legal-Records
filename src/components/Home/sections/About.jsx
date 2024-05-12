import React from 'react'
import Lottie from 'lottie-react'
import anime2 from '/public/anime2.json'

export default () => {
    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto md:px-8">
                <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                    <div className="flex-1 sm:hidden lg:block">
                    <Lottie animationData={anime2}/>
                    </div>
                    <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                        <h3 className="text-[#792938] text-2xl font-semibold">
                            About us
                        </h3>
                        <p className="text-gray-800 text-4xl font-semibold sm:text-4xl">
                        Empowering Legal Accessibility and Transparency Through Innovative Blockchain Technology
                        </p>
                        <p className="mt-3 text-2xl text-gray-600">
                        At the heart of our project is a commitment to enhancing accessibility, security, and transparency within the legal sector. By leveraging cutting-edge blockchain technology and intuitive design principles, we aim to empower lawyers, judges, clients, and other stakeholders with seamless access to their legal records.
                        </p>
                       
                    </div>
                </div>
            </div>
        </section>
    )
}
