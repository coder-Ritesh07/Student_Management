import AdminPage from "./Admin/AdminPage";
import Header from "./Header";

function HomePage(){
    return<>
    <div className="bg-[#f1c6aae4] min-h-screen overflow-hidden">
    <Header/>
    <main>
        <AdminPage/>
    </main>

    </div>
    </>
}

export default HomePage;