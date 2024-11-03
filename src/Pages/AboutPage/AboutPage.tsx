const AboutPage = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen gap-4 py-12 bg-gradient-to-r from-blue-200 via-white to-gray-100 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-white">
            <div className="w-full px-4 sm:w-4/5 lg:w-3/5 xl:w-2/5">
                <h1 className="mt-8 mb-10 font-mono text-5xl text-center text-gray-800 dark:text-white">
                    About Our Platform
                </h1>
                <p className="px-5 mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    Discover our innovative React-based platform, created to empower business owners and individuals seeking reliable services or products. This project was designed as a fully interactive business directory, showcasing essential tools and intuitive features.
                    
                    With our platform, businesses can craft unique profiles and showcase their offerings, while users benefit from a streamlined search experience that quickly connects them to the services they need.
                </p>

                <h2 className="mt-8 mb-5 text-3xl text-center text-gray-800 dark:text-white">Core Features</h2>
                <ul className="pl-8 mb-6 text-lg text-gray-700 list-disc dark:text-gray-300">
                    <li>**Personalized Business Cards**: Businesses can create dynamic profiles that highlight their services, enhancing visibility.</li>
                    <li>**Advanced Search**: Find businesses and services using tailored keyword searches.</li>
                    <li>**Interactive Likes**: Show support by liking businesses, creating a sense of community and credibility.</li>
                    <li>**Secure Registration**: Register and log in with confidence, knowing your data is protected with our secure system.</li>
                </ul>

                <h2 className="mt-8 mb-5 text-3xl text-center text-gray-800 dark:text-white">API Integration</h2>
                <p className="px-5 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    With our API integration, data is retrieved and stored seamlessly, ensuring efficient, real-time access to business information. This integration provides a responsive experience that allows users to effortlessly connect with businesses.
                    
                    Whether promoting your services or finding the resources you need, our platform connects individuals with businesses in a modern, meaningful way.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
