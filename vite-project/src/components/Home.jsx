import Footer from "./Footer";
import HomeBanner from "./HomeBanner";
import HomeNavbar1 from "./HomeNavbar1";
import HomeProjects from "./HomeProjects";



const Home = () => {
    return (
        <div>
            <HomeNavbar1/>
            {/* <HomeNavbar2/> */}
            <HomeBanner/>
            <HomeProjects/>
            <Footer/>
        </div>
    );
};

export default Home;