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
            <div className='container mx-auto'>
                <Banner></Banner>
            </div>
            <section className='container mx-auto'>
                <Works></Works>
            </section>
            <section>
                <Services></Services>
            </section>
            <section className='container mx-auto'>
                <HelpingTeams></HelpingTeams>
            </section>
            <section className='container mx-auto'>
                <Support></Support>
            </section>
            <section className='container mx-auto'>
                <Merchant></Merchant>
            </section>
            <section>
                <CustomerCards></CustomerCards>
            </section>
            <section className='container mx-auto'>
                <Frequently></Frequently>
            </section>
        </div>
    );
};

export default Home;