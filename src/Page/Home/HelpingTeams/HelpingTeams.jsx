import React from 'react';
import Marquee from "react-fast-marquee";
import team1 from '../../../assets/brands/amazon.png'
import team2 from '../../../assets/brands/amazon_vector.png'
import team3 from '../../../assets/brands/casio.png'
import team4 from '../../../assets/brands/moonstar.png'
import team5 from '../../../assets/brands/randstad.png'
import team6 from '../../../assets/brands/start-people 1.png'
import team7 from '../../../assets/brands/start.png'

const teamLogos = [team1, team2, team3, team4, team5, team6, team7];

const HelpingTeams = () => {
    return (
        <section className="py-16 px-4 md:px-10">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
                    We've helped thousands of sales teams.
                </h2>
            </div>

            <Marquee speed={50} gradient={false} pauseOnHover={true}>
                {teamLogos.map((logo, index) => (
                    <div key={index} className="mx-24">
                        <img
                            src={logo}
                            alt={`Team Logo ${index + 1}`}
                            className="h-4"
                        />
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default HelpingTeams;