import './HomeBanner.css'

const HomeBanner = () => {
    return (
        <div className="banner-background">
            <div className='d-lg-flex justify-content-center align-items-center py-5'>
                <div className='w-lg-25 w-md-100 w-sm-100 p-md-5 p-sm-5'>
                    <h1>Marketplace for</h1>
                    <h2>Private Capital</h2>
                    <h1>Investments</h1>
                    <h6>Invest in vetted Investment products provided by verified investment managers across the world</h6>
                </div>
                <img className="p-md-5 p-sm-5"  src="/assets/images/bannerCompanyNames.png" alt=""/>

            </div>
            
        </div>
    );
};

export default HomeBanner;