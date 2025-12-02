import Footer from "./footer/Footer";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

function UserMasterLayout({ child }) {
    return (
        <div className="wrapper">
            <Header />
            <Sidebar />
            <div className="content-wrapper">
                {child}
            </div>
            <Footer />
        </div>
    );
}

export default UserMasterLayout;