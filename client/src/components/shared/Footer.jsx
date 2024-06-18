import React from "react";

const Footer = () => {
  return (
    <section className="text-white primaryBg">
      <div className="pl-5 py-9">
        <ul className="flxColStart gap-2">
          <li>Our services</li>
          <li>Advertise a room</li>
          <li>Post a room wanted ad</li>
          <li>Advertise a whole property</li>
        </ul>
      </div>
      <hr />
      <div className="pl-5 py-5">
        <ul className="flxRowCenter flex-wrap gap-2">
          <li>Contact us</li>
          <li>About us</li>
          <li>Terms and conditions</li>
        </ul>
      </div>
      <hr />
      <div className="pl-5 py-3">©2003–2024 Studroom Ltd.</div>
    </section>
  );
};

export default Footer;
