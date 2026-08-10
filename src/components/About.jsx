import React from 'react'

const GALLERY_ITEMS = [
  {
    id: 'camera-1',
    src: '/about/my_first_camera.png',
    alt: 'My first camera',
    caption: 'My first camera',
  },
  {
    id: 'motorola-phone',
    src: '/about/my_first_motorola_phone.png',
    alt: 'My first Motorola phone',
    caption: 'My first Motorola phone',
  },
  {
    id: 'camera-flash',
    src: '/about/my_first_camera_flash.png',
    alt: 'My first camera with working flash',
    caption: 'My first camera with working flash',
  },
  {
    id: 'camera-broke',
    src: '/about/first_camera_broke.png',
    alt: 'First camera I broke to see what inside',
    caption: "First camera I broke to see what's inside",
  },
]

export default function About() {
  return (
    <section className="about-section animate-fade-in-up" id="about-content">
      <div className="about-header">
        <h1 className="about-title">About Yashwanth Prabhu</h1>
      </div>

      <div className="about-content-body">
        <p className="about-paragraph">
          As a kid I was drawn to technology, not the gadgets themselves, but the parts inside
          them. My parents thought I was into cameras, but I was really turning over film
          cameras, watches with FM radio, digital contact books, the first Nokia flip phones, a
          Motorola with that enormous battery, and pocket FMs, wondering what I could make
          from them. I remember most of them from old photographs, but they made me genuinely
          happy back then.
        </p>

        <div className="about-gallery">
          <div className="about-gallery-grid">
            {GALLERY_ITEMS.map((item) => (
              <figure key={item.id} className="about-gallery-item">
                <div className="about-gallery-img-wrapper">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="about-gallery-img"
                    loading="eager"
                  />
                  <div className="about-gallery-overlay" />
                </div>
                <figcaption className="about-gallery-caption">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <p className="about-paragraph">
          That fascination turned into building. I loved toys with DC motors and LEDs, and in
          school I practically lived in the science center: free internet, tools to tinker with, a
          science fair every year (a few of which won grants and scholarships). Watching Nanban,
          the Tamil remake of 3 Idiots, in 9th grade sealed it: I wanted to be an engineer. Physics...
        </p>
      </div>
    </section>
  )
}
