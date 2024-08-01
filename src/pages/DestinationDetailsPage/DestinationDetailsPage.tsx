export default function DestinationDetailsPage() {
  return (
    <section className="tour-two tour-list">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="tour-details__content">
              <div className="tour-two__top">
                <div className="tour-two__top-left">
                  <h3>Magic of Italy Tours</h3>
                  <div className="tour-one__stars">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star inactive"></i> 2 Reviews
                  </div>
                </div>
                <div className="tour-two__right">
                  <p>
                    <span>$1478</span> <br /> Per Person
                  </p>
                </div>
              </div>
              <ul className="tour-one__meta list-unstyled">
                <li>
                  <a href="tour-details.html">
                    <i className="far fa-clock"></i> 3 Days
                  </a>
                </li>
                <li>
                  <a href="tour-details.html">
                    <i className="far fa-user-circle"></i> 12+
                  </a>
                </li>
                <li>
                  <a href="tour-details.html">
                    <i className="far fa-bookmark"></i> Adventure
                  </a>
                </li>
                <li>
                  <a href="tour-details.html">
                    <i className="far fa-map"></i> Los Angeles
                  </a>
                </li>
              </ul>

              <div className="tour-details__gallery-carousel">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="tour-details__gallery-image">
                      <img src="assets/images/tour/tour-d-1-1.jpg" alt="" />
                      <div className="tour-details__gallery-links">
                        <a href="#">
                          <i className="fab fa-youtube"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-heart"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Additional slides */}
                </div>
              </div>

              <div className="tour-details__gallery-thumb-carousel">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="tour-details__gallery-thumb-image">
                      <img src="assets/images/tour/tour-thumb-1-1.jpg" alt="" />
                    </div>
                  </div>
                  {/* Additional thumb images */}
                </div>
              </div>

              <h3 className="tour-details__title">Overview</h3>
              <p>
                Lorem ipsum available isn but the majority have suffered
                alteratin in some or form injected. Lorem ipsum is simply free
                text used by copytyping refreshing. Neque porro est qui dolorem
                ipsum quia quaed inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Lorem ipsum is simply free text used
                by copytyping refreshing. Neque porro est qui dolorem ipsum quia
                quaed inventore veritatis et quasi architecto beatae vitae dicta
                sunt explicabo. Aelltes port lacus quis enim var sed efficitur
                turpis gilla sed sit amet finibus eros.
              </p>
              <h3 className="tour-details__subtitle">Included/Exclude</h3>
              <div className="row">
                <div className="col-md-6">
                  <ul className="tour-details__list list-unstyled">
                    <li>
                      <i className="fa fa-check"></i>
                      Pick and Drop Services
                    </li>
                    <li>
                      <i className="fa fa-check"></i>1 Meal Per Day
                    </li>
                    <li>
                      <i className="fa fa-check"></i>
                      Cruise Dinner & Music Event
                    </li>
                    <li>
                      <i className="fa fa-check"></i>
                      Visit 7 Best Places in the City With Group
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="tour-details__list unavailable list-unstyled">
                    <li>
                      <i className="fa fa-times"></i>
                      Additional Services
                    </li>
                    <li>
                      <i className="fa fa-times"></i>1 Meal Per Day
                    </li>
                    <li>
                      <i className="fa fa-times"></i>
                      Insurance
                    </li>
                    <li>
                      <i className="fa fa-times"></i>
                      Food & Drinks
                    </li>
                  </ul>
                </div>
              </div>

              <div className="tour-details__spacer"></div>
              <h3 className="tour-details__title">Tour Plan</h3>

              <div className="tour-details__plan">
                <div className="tour-details__plan-single">
                  <div className="tour-details__plan-count">01</div>
                  <div className="tour-details__plan-content">
                    <h3>Day 1: Arrive South Africa Forest</h3>
                    <span>8:00 am to 10:00 am</span>
                    <p>
                      Lorem ipsum available isn but the majority have suffered
                      alteratin in some or form injected. Lorem ipsum is simply
                      free text used by copytyping refreshing. Neque porro est
                      qui dolorem ipsum quia quaed inventore veritatis et quasi
                      dicta sunt explicabo.
                    </p>
                    <ul className="list-unstyled">
                      <li>Free Drinks</li>
                      <li>Awesome Breakfast</li>
                      <li>5 Star Accommodation</li>
                    </ul>
                  </div>
                </div>
                {/* Additional days */}
              </div>

              <div className="tour-details__spacer"></div>
              <h3 className="tour-details__title">Tour Location</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4562.753041141002!2d-118.80123790098536!3d34.152323469614075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e82469c2162619%3A0xba03efb7998eef6d!2sCostco+Wholesale!5e0!3m2!1sbn!2sbd!4v1562518641290!5m2!1sbn!2sbd"
                className="google-map__contact google-map__tour-details"
                allowFullScreen
              ></iframe>
              <div className="tour-details__spacer"></div>
              <h3 className="tour-details__title">Reviews Scores</h3>
              <div className="tour-details__review-score">
                <div className="tour-details__review-score-ave">
                  <div className="my-auto">
                    <h3>7.0</h3>
                    <p>
                      <i className="fa fa-star"></i> Super
                    </p>
                  </div>
                </div>
                <div className="tour-details__review-score__content">
                  <div className="tour-details__review-score__bar">
                    <div className="tour-details__review-score__bar-top">
                      <h3>Services</h3>
                      <p>50%</p>
                    </div>
                    <div className="tour-details__review-score__bar-line">
                      <span
                        className="wow slideInLeft"
                        data-wow-duration="1500ms"
                        style={{ width: "50%" }}
                      ></span>
                    </div>
                  </div>
                  {/* Additional review bars */}
                </div>
              </div>

              <div className="tour-details__review-comment">
                <div className="tour-details__review-comment-single">
                  <div className="tour-details__review-comment-top">
                    <img src="assets/images/tour/tour-review-1-1.jpg" alt="" />
                    <h3>Mike Hardson</h3>
                    <p>06 Dec, 2019</p>
                  </div>
                  <div className="tour-details__review-comment-content">
                    <h3>Fun Was To Discover This</h3>
                    <p>
                      Lorem ipsum is simply free text used by copytyping
                      refreshing. Neque porro est qui dolorem ipsum quia quaed
                      inventore veritatis et quasi architecto beatae vitae dicta
                      sunt explicabo var lla sed sit amet finibus eros.
                    </p>
                  </div>
                  <div className="tour-details__review-form-stars">
                    <div className="row">
                      <div className="col-md-4">
                        <p>
                          <span>Services</span>{" "}
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </p>
                        <p>
                          <span>Comfort</span>{" "}
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span>Services</span>{" "}
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </p>
                        <p>
                          <span>Comfort</span>{" "}
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <span>Services</span>{" "}
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </p>
                        <p>
                          <span>Comfort</span>{" "}
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star active"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Additional review comments */}
              </div>

              <h3 className="tour-details__title">Write a Review</h3>
              <div className="tour-details__review-form">
                <div className="tour-details__review-form-stars">
                  <div className="row">
                    <div className="col-md-4">
                      <p>
                        <span>Services</span>{" "}
                        <i className="fa fa-star active"></i>
                        <i className="fa fa-star active"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </p>
                      <p>
                        <span>Comfort</span>{" "}
                        <i className="fa fa-star active"></i>
                        <i className="fa fa-star active"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <span>Services</span>{" "}
                        <i className="fa fa-star active"></i>
                        <i className="fa fa-star active"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </p>
                      <p>
                        <span>Comfort</span>{" "}
                        <i className="fa fa-star active"></i>
                        <i className="fa fa-star active"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <span>Services</span>{" "}
                        <i className="fa fa-star active"></i>
                        <i className="fa fa-star active"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </p>
                      <p>
                        <span>Comfort</span>{" "}
                        <i className="fa fa-star active"></i>
                        <i className="fa fa-star active"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </p>
                    </div>
                  </div>
                </div>
                <form
                  action="https://pixydrops.com/tripo/inc/sendemail.php"
                  className="contact-one__form"
                >
                  <div className="row low-gutters">
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          type="text"
                          name="email"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-group">
                        <input
                          type="text"
                          name="subject"
                          placeholder="Review Title"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-group">
                        <textarea
                          name="message"
                          placeholder="Write Message"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="input-group">
                        <button
                          type="submit"
                          className="thm-btn contact-one__btn"
                        >
                          Submit a review
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tour-sidebar">
              <div className="tour-sidebar__search tour-sidebar__single">
                <h3>Book This Tour</h3>
                <form action="#" className="tour-sidebar__search-form">
                  <div className="input-group">
                    <input type="text" placeholder="Your Name" />
                  </div>
                  <div className="input-group">
                    <input type="text" placeholder="Email Address" />
                  </div>
                  <div className="input-group">
                    <input type="text" placeholder="Phone" />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      data-provide="datepicker"
                      placeholder="dd/mm/yy"
                    />
                  </div>
                  <div className="input-group">
                    <select className="selectpicker">
                      <option value="Tickets">Tickets</option>
                      <option value="Children">Children</option>
                      <option value="Adult">Adult</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <textarea placeholder="Message"></textarea>
                  </div>
                  <div className="input-group">
                    <button type="submit" className="thm-btn">
                      Book Now
                    </button>
                  </div>
                </form>
              </div>
              <div className="tour-sidebar__organizer">
                <h3>Organized by</h3>
                <div className="tour-sidebar__organizer-content">
                  <img src="assets/images/tour/tour-organizer-1-1.jpg" alt="" />
                  <p>
                    <i className="fa fa-star"></i>8.0 Superb
                  </p>
                  <h3>Mike Hardson</h3>
                  <span>Member Since 2019</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
