import googleLogo from "../../assets/google.jpeg";
import facebookLogo from "../../assets/facebook.jpeg";
import youtubeLogo from "../../assets/youtube.jpeg";
import pinterestLogo from "../../assets/pinterest.jpeg";
import twitchLogo from "../../assets/twitch.jpeg";
import webflowLogo from "../../assets/webflow.jpeg";


const Partners = () => {
  const partners = [
    { id: 1, name: 'Google', image: googleLogo },
    { id: 2, name: 'Facebook', image: facebookLogo },
    { id: 3, name: 'YouTube', image: youtubeLogo },
    { id: 4, name: 'Pinterest', image: pinterestLogo },
    { id: 5, name: 'Twitch', image: twitchLogo },
    { id: 6, name: 'Webflow', image: webflowLogo },
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300">
      <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">
        Temukan KonsulQ di Berbagai Partner
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {partners.map((partner) => (
          <div key={partner.id} className="flex items-center justify-center w-36 h-20 bg-white shadow-lg rounded-lg transform hover:scale-110 transition-all duration-300">
            <img
              src={partner.image}
              alt={partner.name}
              className="h-12 object-contain transition-all duration-300 transform hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
