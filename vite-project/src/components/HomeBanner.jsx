import './HomeBanner.css'

const HomeBanner = () => {
    return (
        <div className="banner-background">
            <div className='d-flex justify-content-center align-items-center py-5'>
                <div className='w-25'>
                    <h1>Marketplace for</h1>
                    <h2>Private Capital</h2>
                    <h1>Investments</h1>
                    <h6>Invest in vetted Investment products provided by verified investment managers across the world</h6>
                </div>
                <img src="/assets/images/bannerCompanyNames.png" alt=""/>

            </div>
            
        </div>
    );
};

export default HomeBanner;