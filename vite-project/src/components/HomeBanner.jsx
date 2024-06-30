import './HomeBanner.css'

const HomeBanner = () => {
    return (
        <div className="banner-background mb-5">
            <div className='d-flex justify-content-center align-items-center py-5 container flex-md-column flex-column flex-lg-row '>
                <div className='w-50 text-md-center text-sm-center text-lg-start mb-md-5 mb-sm-5 mb-lg-0'>
                    <h1  style={{color:'#001140'}}>Marketplace for</h1>
                    <h1 style={{color:'#2B62F5'}}>private capital</h1>
                    <h1 style={{color:'#001140'}}>investments</h1>
                    <h6 style={{color:"#001142"}}>Invest in vetted Investment products provided by </h6 >
                    <h6 style={{color:"#001142"}}>verified investment managers across the world</h6>
                </div>
                <img className="responsive-banner-img w-50"  src="/assets/images/bannerCompanyNames.png" alt="banner-image"/>

            </div>
            
        </div>
    );
};

export default HomeBanner;