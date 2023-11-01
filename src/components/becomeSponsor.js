import React from 'react';
import './becomeSponsor.css'
import sponsImage from '../assets/spons-img.png';
const SponsorSection = () => {
  return (
    <div className="sponsor-section">
      <h2>Become a Sponsor</h2>
      <img src={sponsImage} alt="Become a Sponsor" />
      <p>
      Donec vitae mi vulputate, suscipit urna in, malesuada nisl. Pellentesque laoreet pretium nisl, et pulvinar massa eleifend sed. Curabitur maximus mollis diam, vel varius sapien suscipit eget. Cras sollicitudin ligula at volutpat ultrices. Nunc arcu enim, rhoncus eu maximus id, malesuada eu neque. Nunc aliquet cursus tortor id pellentesque. Quisque tempus arcu sed felis tempus, vel rutrum diam egestas. Suspendisse non magna nisi. Duis quis risus mi. Morbi velit leo, pellentesque nec odio sit amet, fringilla sollicitudin nulla. Sed consectetur eu leo sed sodales. Quisque porta, ante vitae auctor pellentesque, dolor neque vestibulum urna, sit amet consectetur ex lectus vel enim. Maecenas tellus erat, interdum vel tristique ac, rhoncus id ante. Donec vitae mi vulputate, suscipit urna in, malesuada nisl. Pellentesque laoreet pretium nisl, et pulvinar massa eleifend sed. Curabitur maximus mollis diam, vel varius sapien suscipit eget. Cras sollicitudin ligula at volutpat ultrices. Nunc arcu enim, rhoncus eu maximus id, malesuada eu neque. Nunc aliquet cursus tortor id pellentesque. Quisque tempus arcu sed felis tempus, vel rutrum diam egestas. Suspendisse non magna nisi. Duis quis risus mi. Morbi velit leo, pellentesque nec odio sit amet, fringilla sollicitudin nulla. Sed consectetur eu leo sed sodales. Quisque porta, ante vitae auctor pellentesque, dolor neque vestibulum urna, sit amet consectetur ex lectus vel enim. Maecenas tellus erat, interdum vel tristique ac, rhoncus id ante.
      </p>
      <button className="apply-button">Apply Now!</button>
    </div>
  );
};

export default SponsorSection;
