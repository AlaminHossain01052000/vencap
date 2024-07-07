
import HomeBanner from "./HomeBanner";

import HomeProjects from "./HomeProjects";
import RecommendedProjects from "./RecommendedProjects";



const Home = () => {
    return (
        <div>
            
            
            <HomeBanner/>
            <RecommendedProjects/>
            <HomeProjects/>
            
        </div>
    );
};

export default Home;