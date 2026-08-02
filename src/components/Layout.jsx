import Sidebar from "./Sidebar";

function Layout({ children }) {

    return (

        <div className="md:flex min-h-screen">

            <Sidebar />

            <div className="flex-1 bg-gray-100 p-4 sm:p-6 overflow-x-auto md:ml-0">

                {children}

            </div>

        </div>
    );
}

export default Layout;