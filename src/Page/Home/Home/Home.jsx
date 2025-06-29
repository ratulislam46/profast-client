import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import HelpingTeams from '../HelpingTeams/HelpingTeams';
import Merchant from '../Merchant/Merchant';
import Works from '../Works/Works';
import Support from '../Support/Support';
import Frequently from '../Frequently/Frequently';
import CustomerCards from '../CustomerCards/CustomerCards';

const Home = () => {
    return (
        <div>
            <div className='mt-10'>
                <Banner></Banner>
            </div>
            <section>
                <Works></Works>
            </section>
            <section>
                <Services></Services>
            </section>
            <section>
                <HelpingTeams></HelpingTeams>
            </section>
            <section>
                <Support></Support>
            </section>
            <section>
                <Merchant></Merchant>
            </section>
            <section>
                <CustomerCards></CustomerCards>
            </section>
            <section>
                <Frequently></Frequently>
            </section>
        </div>
    );
};

export default Home;